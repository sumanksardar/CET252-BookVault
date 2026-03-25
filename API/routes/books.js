const express = require("express");
const router = express.Router();

// In-memory book data (20 books)
let books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    rating: 5,
    status: "Read",
    description: "A fantasy adventure following Bilbo Baggins."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    rating: 5,
    status: "Read",
    description: "A dystopian novel about surveillance and control."
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    rating: 5,
    status: "Read",
    description: "A story of wealth, love, and the American Dream."
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    published_year: 1960,
    rating: 5,
    status: "Read",
    description: "A novel about justice and racial inequality."
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    rating: 4,
    status: "Reading",
    description: "A philosophical story about following your dreams."
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    published_year: 1813,
    rating: 5,
    status: "Read",
    description: "A classic novel about love, class, and marriage."
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Sci-Fi",
    published_year: 1932,
    rating: 4,
    status: "Read",
    description: "A futuristic society controlled by technology."
  },
  {
    id: 8,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    rating: 4,
    status: "Read",
    description: "A story of teenage rebellion and identity."
  },
  {
    id: 9,
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    published_year: 1851,
    rating: 3,
    status: "Want to Read",
    description: "A sea captain's obsession with a giant whale."
  },
  {
    id: 10,
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical",
    published_year: 1869,
    rating: 5,
    status: "Want to Read",
    description: "A historical novel set during the Napoleonic Wars."
  },
  {
    id: 11,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Classic",
    published_year: 1866,
    rating: 5,
    status: "Read",
    description: "A psychological novel about guilt and redemption."
  },
  {
    id: 12,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    rating: 5,
    status: "Currently Reading",
    description: "An epic journey to destroy the One Ring."
  },
  {
    id: 13,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    rating: 5,
    status: "Read",
    description: "A young wizard begins his magical journey."
  },
  {
    id: 14,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    published_year: 2003,
    rating: 4,
    status: "Read",
    description: "A mystery involving secret societies and symbols."
  },
  {
    id: 15,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    published_year: 2020,
    rating: 4,
    status: "Currently Reading",
    description: "A library that lets you explore alternate lives."
  },
  {
    id: 16,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    published_year: 2011,
    rating: 5,
    status: "Read",
    description: "A brief history of humankind."
  },
  {
    id: 17,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    published_year: 2018,
    rating: 5,
    status: "Read",
    description: "A guide to building good habits."
  },
  {
    id: 18,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    published_year: 1997,
    rating: 4,
    status: "Read",
    description: "Lessons about money and investing."
  },
  {
    id: 19,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    published_year: 2020,
    rating: 5,
    status: "Currently Reading",
    description: "Understanding how people think about money."
  },
  {
    id: 20,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    genre: "Self-Help",
    published_year: 1937,
    rating: 4,
    status: "Want to Read",
    description: "A classic book on success and mindset."
  }
];

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// GET book by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

// POST new book
router.post("/", (req, res) => {
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

// DELETE book
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);

  res.json({ message: "Book deleted successfully" });
});

module.exports = router;