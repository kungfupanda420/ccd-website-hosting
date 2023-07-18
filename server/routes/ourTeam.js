const Router = require('express-promise-router')
const db = require('../db/index')

const router = new Router()

router.get('/',async function(req, res, next) {
    
    const teacherData = await db.query('SELECT * FROM teachers')

    const studentData = await db.query('SELECT * FROM students')

    const responseData = {
        teacherData: teacherData.rows,
        studentData: studentData.rows
    };

    res.send(responseData);
});

module.exports = router;

