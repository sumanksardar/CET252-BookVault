const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database/books.db');

/**
 * @api {get} /api/books Get all books
 * @apiName GetAllBooks
 * @apiGroup Books
 * @apiDescription Returns all books stored in the SQLite database.
 *
 * @apiSuccess {Object[]} books List of book objects.
 * @apiSuccess {Number} books.id Unique book ID.
 * @apiSuccess {String} books.title Book title.
 * @apiSuccess {String} books.author Book author.
 * @apiSuccess {String} books.genre Book genre.
 * @apiSuccess {Number} books.published_year Year published.
 * @apiSuccess {Number} books.rating Rating out of 5.
 * @apiSuccess {String} books.status Reading status.
 * @apiSuccess {String} books.description Short description.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "title": "The Hobbit",
 *     "author": "J.R.R. Tolkien",
 *     "genre": "Fantasy",
 *     "published_year": 1937,
 *     "rating": 4.8,
 *     "status": "Read",
 *     "description": "A fantasy adventure following Bilbo Baggins."
 *   }
 * ]
 *
 * @apiError InternalServerError Failed to retrieve books.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Failed to retrieve books"
 * }
 */
router.get('/', (req, res) => {
  const db = new sqlite3.Database(dbPath);

  db.all('SELECT * FROM books', [], (err, rows) => {
    db.close();

    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve books' });
    }

    res.status(200).json(rows);
  });
});

/**
 * @api {get} /api/books/:id Get a single book
 * @apiName GetSingleBook
 * @apiGroup Books
 * @apiDescription Returns one book by its unique ID.
 *
 * @apiParam {Number} id Book unique ID.
 *
 * @apiSuccess {Number} id Unique book ID.
 * @apiSuccess {String} title Book title.
 * @apiSuccess {String} author Book author.
 * @apiSuccess {String} genre Book genre.
 * @apiSuccess {Number} published_year Year published.
 * @apiSuccess {Number} rating Rating out of 5.
 * @apiSuccess {String} status Reading status.
 * @apiSuccess {String} description Short description.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "title": "The Hobbit",
 *   "author": "J.R.R. Tolkien",
 *   "genre": "Fantasy",
 *   "published_year": 1937,
 *   "rating": 4.8,
 *   "status": "Read",
 *   "description": "A fantasy adventure following Bilbo Baggins."
 * }
 *
 * @apiError NotFound Book not found.
 * @apiError InternalServerError Failed to retrieve book.
 *
 * @apiErrorExample {json} NotFound-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Book not found"
 * }
 *
 * @apiErrorExample {json} InternalServerError-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Failed to retrieve book"
 * }
 */
router.get('/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;

  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    db.close();

    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve book' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(row);
  });
});

/**
 * @api {post} /api/books Add a new book
 * @apiName PostBook
 * @apiGroup Books
 * @apiDescription Adds a new book record to the SQLite database.
 *
 * @apiBody {String} title Book title (required).
 * @apiBody {String} author Book author (required).
 * @apiBody {String} genre Book genre (required).
 * @apiBody {Number} published_year Year published (required).
 * @apiBody {Number} [rating] Rating out of 5.
 * @apiBody {String} status Read / Reading / Unread (required).
 * @apiBody {String} [description] Short description.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} id Newly created book ID.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "message": "Book added successfully",
 *   "id": 21
 * }
 *
 * @apiError InternalServerError Failed to add book.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Failed to add book"
 * }
 */
router.post('/', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { title, author, genre, published_year, rating, status, description } = req.body;

  const query = `
    INSERT INTO books (title, author, genre, published_year, rating, status, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [title, author, genre, published_year, rating, status, description],
    function (err) {
      db.close();

      if (err) {
        return res.status(500).json({ error: 'Failed to add book' });
      }

      res.status(201).json({
        message: 'Book added successfully',
        id: this.lastID
      });
    }
  );
});

/**
 * @api {put} /api/books/:id Update a book
 * @apiName UpdateBook
 * @apiGroup Books
 * @apiDescription Updates an existing book by its ID.
 *
 * @apiParam {Number} id Book unique ID.
 *
 * @apiBody {String} title Book title.
 * @apiBody {String} author Book author.
 * @apiBody {String} genre Book genre.
 * @apiBody {Number} published_year Year published.
 * @apiBody {Number} [rating] Rating out of 5.
 * @apiBody {String} status Read / Reading / Unread.
 * @apiBody {String} [description] Short description.
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Book updated successfully"
 * }
 *
 * @apiError NotFound Book not found.
 * @apiError InternalServerError Failed to update book.
 *
 * @apiErrorExample {json} NotFound-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Book not found"
 * }
 *
 * @apiErrorExample {json} InternalServerError-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Failed to update book"
 * }
 */
router.put('/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;
  const { title, author, genre, published_year, rating, status, description } = req.body;

  const query = `
    UPDATE books
    SET title = ?, author = ?, genre = ?, published_year = ?, rating = ?, status = ?, description = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [title, author, genre, published_year, rating, status, description, id],
    function (err) {
      db.close();

      if (err) {
        return res.status(500).json({ error: 'Failed to update book' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.status(200).json({ message: 'Book updated successfully' });
    }
  );
});

/**
 * @api {delete} /api/books/:id Delete a book
 * @apiName DeleteBook
 * @apiGroup Books
 * @apiDescription Deletes a book by its ID.
 *
 * @apiParam {Number} id Book unique ID.
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Book deleted successfully"
 * }
 *
 * @apiError NotFound Book not found.
 * @apiError InternalServerError Failed to delete book.
 *
 * @apiErrorExample {json} NotFound-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Book not found"
 * }
 *
 * @apiErrorExample {json} InternalServerError-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Failed to delete book"
 * }
 */
router.delete('/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;

  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    db.close();

    if (err) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  });
});

module.exports = router;