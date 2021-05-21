const sqlite3 = require('sqlite3').verbose();

/**
 * @type {*|IDBDatabase}
 */
let db = new sqlite3.Database(`${__dirname}/../toolbot.db`, sqlite3.OPEN_READWRITE, (error) => {
  if (error) throw error;

  console.log('Connexion à la base de données effectuée avec succès !');
});

// db.close((error) => {
//   if (error) throw error;
//
//   console.log('Fermeture de la connexion à la base de données effectuée avec succès !');
// });

module.exports = db;