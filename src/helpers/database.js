const mysql = require('mysql');

const connectionConfig = {
  host: process.env.NODE_ENV === 'production' ? '' : '127.0.0.1',
  user: process.env.NODE_ENV === 'production' ? '' : 'root',
  password: process.env.NODE_ENV === 'production' ? '' : 'root',
  database: process.env.NODE_ENV === 'production' ? '' : 'toolbot'
};

/**
 * @type {Connection}
 */
const db = mysql.createConnection(connectionConfig);

db.connect((err) => {
  if (err) throw err;

  console.log(`Connexion à l'ID MySQL ${db.threadId}.`);
});

module.exports = db;