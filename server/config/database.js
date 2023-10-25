require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // port: 5522,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = db;
