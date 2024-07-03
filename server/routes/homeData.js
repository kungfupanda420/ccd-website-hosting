const Router = require('express-promise-router')
const db = require('../db/index')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

//--------------------Why Recruit-----------------------------

router.get('/why-recruit',async function(req, res, next) {
    const rawResonData = await db.query('SELECT * FROM why_recruit')
    res.status(200).send(rawResonData.rows);
});

//--------------------Placement Stats-----------------------------

router.get('/placement-stats',async function(req, res, next) {

    const rawStatData = await db.query('SELECT * FROM placement_stats')
    const statsData = rawStatData.rows.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
    res.status(200).send(statsData);

});

module.exports = router;

