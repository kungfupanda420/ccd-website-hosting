var logger = require('morgan');

const homeRouter =  require('./homeData')
const submitRouter = require('./formSubmit');
const activeProgramRouter = require('./activePrograms');
const ourTeamRouter = require('./ourTeam')
const newsMediaRouter = require('./newsMedia')
const wallOfFameRouter = require('./wallOfFame')
const loginRouter = require('./login')

const mountRoutes = (app) => {

    app.use(logger('dev'));
    
    app.use('/api/home', homeRouter);
    app.use('/api/submit', submitRouter);                 //Recruiter Form
    app.use('/api/active-program', activeProgramRouter);  //Active Programs
    app.use('/api/our-team', ourTeamRouter);              //Our Team
    app.use('/api/news-media', newsMediaRouter);          //News Media
    app.use('/api/wall-of-fame', wallOfFameRouter)        // Wall Of Fame
    app.use('/api/login', loginRouter)                    // Wall Of Fame
  }
   
module.exports = mountRoutes;
