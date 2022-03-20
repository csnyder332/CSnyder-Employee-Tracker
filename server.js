const mysql = require('mysql2');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { setDefaultResultOrder } = require('dns');

require('.env').config();

const seedQuery = fs.readFileSync("db/seeds.sql", {
    encoding: "utf-8",
  })

  // Connect to database
const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  })