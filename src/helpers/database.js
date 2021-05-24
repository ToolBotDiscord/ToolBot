const mysql = require('mysql');

/**
 * @type {Connection}
 */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'toolbot'
});

db.connect((err) => {
  if (err) throw err;

  console.log(`Connexion à l'ID MySQL ${db.threadId}.`);
});

module.exports = db;