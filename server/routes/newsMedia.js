const Router = require('express-promise-router');
const multer = require('multer');
const db = require('../db/index');
const path = require('path');
const fs = require('fs');
const router = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/news_media'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}.png`);
  },
});

const upload = multer({ storage });

router.get('/', async function (req, res, next) {
  const cardData = await db.query('SELECT * FROM news_media');
  res.status(200).send(cardData.rows);
});

router.post('/', upload.single('img'), async function (req, res, next) {
    try {
      const { title, subtext } = req.body;
  
      const uniqueSuffix = req.file.filename.split(".")[0];
      const dateObject = new Date(Number(uniqueSuffix));
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth()+1}/${dateObject.getFullYear()}`;
  
      const newObject = {
        img: `/images/news_media/${req.file.filename}`,
        title: title,
        subtext: subtext,
        date: formattedDate
      }

      const query = {
        text: 'INSERT INTO news_media (img, title, subtext, date) VALUES ($1, $2, $3, $4)',
        values: [newObject.img, newObject.title, newObject.subtext, newObject.date],
      };
  
      await db.query(query);
  
      res.status(200).send('Post request received');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error: ' + error.message);
    }
});


router.delete('/:title', async function (req, res, next) {
    try {
      const { title } = req.params;
      const result = await db.query('SELECT * FROM news_media WHERE title = $1', [title]);
  
      if (result.rows.length === 0) {
        res.status(404).send('Card not found');
        return;
      }
  
      const { img } = result.rows[0]; // Get the image path from the database
  
      // Delete the image file
      fs.unlink(path.join(__dirname, '../../public', img), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error: Failed to delete image file');
          return;
        }
  
        // Delete the row from the database
        db.query('DELETE FROM news_media WHERE title = $1', [title])
          .then(() => {
            res.status(200).send('Delete request received');
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error: Failed to delete card');
          });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error: ' + error.message);
    }
  });

module.exports = router;
