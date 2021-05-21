const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

module.exports.init = () => {
  const fileName = `${__dirname}/../toolbot.db`;

  fs.writeFile(fileName, '', (error) => {
    if (error) throw error;
  });

  db.run('create table config\n' +
    '(\n' +
    '  id INTEGER not null\n' +
    '    constraint config_pk\n' +
    '      primary key autoincrement,\n' +
    '  server_id INTEGER not null,\n' +
    '  setting TEXT not null,\n' +
    '  value text not null\n' +
    ');');
};

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