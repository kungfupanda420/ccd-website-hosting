const {Pool} = require('pg')

 
const pool = new Pool({
    user: 'ccd_admin',
    host: 'localhost',
    database: 'ccd_database',
    password: 'nitcccd',
    port: 5432,
  })
   
 
  module.exports =  {query : (text, params) => pool.query(text, params)}