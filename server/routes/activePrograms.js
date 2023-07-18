const Router = require('express-promise-router');
const multer = require('multer');
const db = require('../db/index');
const path = require('path');
const fs = require('fs');

const router = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/documents/active_programs'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const programsData = await db.query('SELECT * FROM programs');
  res.status(200).send(programsData.rows);
});

router.post('/', upload.single('pdf'), async function (req, res, next) {
  try {
    const { title, tags, details } = req.body;

    const tagsArray = JSON.parse(tags);
    const uniqueSuffix = req.file.filename.split('.')[0];
    const dateObject = new Date(Number(uniqueSuffix));
    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;

    const newObject = {
      title: title,
      tags: tagsArray,
      details: details,
      document: `/documents/active_programs/${req.file.filename}`,
      posted: formattedDate,
    };

    const query = {
      text: 'INSERT INTO programs (title, tags, details, document, posted) VALUES ($1, $2, $3, $4, $5)',
      values: [newObject.title, newObject.tags, newObject.details, newObject.document, newObject.posted],
    };

    await db.query(query);

    console.log(newObject);

    res.status(200).send('Post request received');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

router.delete('/:title', async function (req, res, next) {
  try {
    const { title } = req.params;
    const result = await db.query('SELECT * FROM programs WHERE title = $1', [title]);

    if (result.rows.length === 0) {
      res.status(404).send('Program not found');
      return;
    }

    const { document } = result.rows[0]; // Get the document path from the database

    // Delete the document file
    fs.unlink(path.join(__dirname, '../../public', document), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error: Failed to delete document file');
        return;
      }

      // Delete the row from the database
      db.query('DELETE FROM programs WHERE title = $1', [title])
        .then(() => {
          res.status(200).send('Delete request received');
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Internal Server Error: Failed to delete program');
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

module.exports = router;
