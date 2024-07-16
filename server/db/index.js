const {Pool} = require('pg')

 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ccd_database',
    password: 'nitc123',
    port: 5432,
  })
   
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to PostgreSQL server', err.stack);
    } else {
      console.log('Successfully connected to PostgreSQL server');
      client.release();
    }
  });
 
  module.exports =  {query : (text, params) => pool.query(text, params)}
