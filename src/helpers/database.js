const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(`${__dirname}/../toolbot.db`, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  console.log('Connexion à la base de données effectuée avec succès !');
});

// close the database connection
// db.close((err) => {
//   if (err) return console.error(err.message);
//
//   console.log('Successfully closed the database connection.');
// });

module.exports = db;