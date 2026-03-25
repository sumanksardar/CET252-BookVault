const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'books.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      published_year INTEGER NOT NULL,
      rating REAL,
      status TEXT NOT NULL,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Books table created");
    }
  });
});

db.close();