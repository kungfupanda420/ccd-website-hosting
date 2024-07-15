var express = require('express');
var router = express.Router();
// var nodemailer = require('nodemailer');
const db=require('../db/index');

router.post('/',async function(req, res) {
 try{
  let { name,phone,email,queriesComments } = req.body;
  console.log(name,phone,email,queriesComments);
  phone=phone.toString();

  const newObject = {
    name: name,
    phone: phone,
    email: email,
    queriesComments: queriesComments,
  };
  const query = {
    text: 'INSERT INTO queries (name, phone, email, queriescomments) VALUES ($1, $2, $3, $4)',
    values: [newObject.name, newObject.phone, newObject.email, newObject.queriesComments],
  };

  await db.query(query);
  console.log(newObject);
  const errmessage = `Dear ${name},\n\nThank you for considering our college for recruiting opportunities. We have received your submission and are thrilled to have the opportunity to collaborate with you. Our team will review your details and reach out to you soon to discuss further steps. We appreciate your interest and look forward to the possibility of building a fruitful partnership.\n\nBest regards,\nCentre For Career Development\nNIT Calicut`;
  res.send(errmessage);
}
catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error: ' + error.message);
}

});

router.patch('/status/:id', async function(req, res) {
  try {
    let id = req.params.id;
    id.toString();
    console.log('got id in router', id);
    const query = {
      text: 'UPDATE queries SET status = $1 WHERE id = $2',
      values: ['done', id],
    };
    await db.query(query);
    console.log('Query status updated ',id);
    res.status(200).send('Query status updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

module.exports = router;