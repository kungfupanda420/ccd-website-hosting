const Router = require('express-promise-router')
const db = require('../db/index')

const router = new Router()

router.get('/', function(req, res) {
  const wofDataRowOne = [
    {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },

        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    }
    ,

        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    }
  ];

  const wofDataRowTwo = [
    {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },
        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    },

        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    }
    ,

        {
        studentImage: '',
        studentName: 'Pranav',
        studentPosition :'SDE @GOOGLE',
        studentBatch:'CS24',
        studentSaid :' They are providing us with their best. They have a very good placements. Almost every one is placed on off-campus and on campus, and all the placements are descent ones. The college is well known among different companies and that is a plus point of NIT Calicut.',
        dateOfSaying:'10th March 2023',
        studentLinkedIn:'https://www.linkedin.com/in/naveen-jangiti-1a1b86235/'
    }
  ];

  const wallOfFameData = {
    wofDataRowOne,
    wofDataRowTwo
  };

  res.status(200).json(wallOfFameData);
});

module.exports = router;
