require('dotenv').config();
const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.on('connect', () => {
    console.log('connected to the Database');
  })

module.exports = { pool };