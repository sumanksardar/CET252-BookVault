const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'books.db');
const db = new sqlite3.Database(dbPath);

const books = [
  ['The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 1937, 4.8, 'Read', 'A fantasy adventure following Bilbo Baggins on an unexpected journey.'],
  ['1984', 'George Orwell', 'Dystopian', 1949, 4.7, 'Read', 'A dystopian novel about surveillance, control, and totalitarianism.'],
  ['Pride and Prejudice', 'Jane Austen', 'Romance', 1813, 4.6, 'Read', 'A classic novel exploring manners, family, and marriage.'],
  ['The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 1925, 4.4, 'Read', 'A story of wealth, illusion, and the American Dream.'],
  ['To Kill a Mockingbird', 'Harper Lee', 'Classic', 1960, 4.9, 'Read', 'A novel about justice, prejudice, and moral courage.'],
  ['Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 'Fantasy', 1997, 4.9, 'Read', 'The beginning of Harry Potter’s magical journey.'],
  ['The Catcher in the Rye', 'J.D. Salinger', 'Classic', 1951, 4.2, 'Unread', 'A coming-of-age story about teenage alienation.'],
  ['The Alchemist', 'Paulo Coelho', 'Fiction', 1988, 4.5, 'Reading', 'A philosophical novel about following your dreams.'],
  ['Atomic Habits', 'James Clear', 'Self-help', 2018, 4.8, 'Read', 'A practical guide to building good habits and breaking bad ones.'],
  ['Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance', 1997, 4.3, 'Unread', 'A personal finance book contrasting two mindsets about money.'],
  ['Dune', 'Frank Herbert', 'Sci-Fi', 1965, 4.7, 'Reading', 'A science fiction epic set on the desert planet Arrakis.'],
  ['The Hunger Games', 'Suzanne Collins', 'Dystopian', 2008, 4.6, 'Read', 'A survival story set in a brutal televised competition.'],
  ['The Book Thief', 'Markus Zusak', 'Historical Fiction', 2005, 4.8, 'Read', 'A moving story set in Nazi Germany narrated by Death.'],
  ['The Da Vinci Code', 'Dan Brown', 'Thriller', 2003, 4.1, 'Unread', 'A mystery thriller involving secret societies and hidden clues.'],
  ['The Silent Patient', 'Alex Michaelides', 'Thriller', 2019, 4.4, 'Reading', 'A psychological thriller about a woman who stops speaking after a crime.'],
  ['Sapiens', 'Yuval Noah Harari', 'History', 2011, 4.8, 'Read', 'A brief history of humankind and its development.'],
  ['Educated', 'Tara Westover', 'Memoir', 2018, 4.7, 'Unread', 'A memoir about education, survival, and family.'],
  ['The Fault in Our Stars', 'John Green', 'Young Adult', 2012, 4.5, 'Read', 'A love story between two teenagers facing illness.'],
  ['The Midnight Library', 'Matt Haig', 'Fiction', 2020, 4.3, 'Reading', 'A novel about regret, possibility, and alternate lives.'],
  ['The Power of Habit', 'Charles Duhigg', 'Self-help', 2012, 4.4, 'Unread', 'An exploration of how habits work in daily life and business.']
];

db.serialize(() => {
  db.run('DELETE FROM books', (err) => {
    if (err) {
      console.error('Error clearing books table:', err.message);
      return;
    }
    console.log('Old book data cleared.');
  });

  const stmt = db.prepare(`
    INSERT INTO books (title, author, genre, published_year, rating, status, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  books.forEach((book) => {
    stmt.run(book, (err) => {
      if (err) {
        console.error('Error inserting book:', err.message);
      }
    });
  });

  stmt.finalize((err) => {
    if (err) {
      console.error('Error finalizing statement:', err.message);
    } else {
      console.log('20 sample books inserted successfully.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});