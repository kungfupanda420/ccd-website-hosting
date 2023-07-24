var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
 
  const { name } = req.body;
  
  //const message = `Dear ${name},\n\nThank you for expressing interest in recruiting from our college. We have received your submission and are thrilled to have the opportunity to collaborate with you. Our team will review your details and reach out to you soon to discuss further steps. We appreciate your interest and look forward to the possibility of building a fruitful partnership.\n\nBest regards,\nCentre For Career Development\nNIT Calicut`;
  
  const errmessage = `Dear ${name},\n\nThank you for considering our college for recruiting opportunities. We apologize for any inconvenience caused by the ongoing website maintenance. In the meantime, please feel free to reach out to us via email at \n\nccd@nitc.ac.in\n\nfor any inquiries or further information regarding the recruitment process `;
  res.send(errmessage);
});

module.exports = router;