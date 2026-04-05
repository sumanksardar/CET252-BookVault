## Final Submission

# BookVault – Digital Library Management System

## Overview

BookVault is a full-stack web application that allows users to manage a digital collection of books. The system supports full CRUD (Create, Read, Update, Delete) operations and demonstrates integration between a RESTful API backend and a dynamic frontend interface.

This project was developed as part of the **CET252 module**.

---

##  Features

- View all books in inventory  
- Search books by title, author, or genre  
- Filter books by reading status  
- Add new books  
- Edit existing books  
- Delete books with confirmation modal  
- Pagination system  
- Book details page  
- Automated UI testing using TestCafe  
- API documentation using APIDOC  

---

##  Project Structure

```
CET252/
│
├── API/        → Backend (Node.js + Express)
├── CLIENT/     → Frontend (HTML, CSS, JavaScript)
├── APIDOC/     → Generated API documentation
└── README.md   → Project documentation
```

---

## Technologies Used

### Backend
- Node.js
- Express.js
- REST API

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Testing
- TestCafe

### Documentation
- APIDOC

---

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get single book |
| POST | `/api/books` | Add new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

---

##  How to Run the Project

###  Run Backend API

```bash
cd API
npm install
npm start
```

API runs at:
```
http://localhost:3000
```

---

## Client Application Setup

To run the client application locally, follow these steps:

1. Navigate to the CLIENT folder:
   cd CLIENT

2. Install dependencies:
   npm install

3. Start the client using live-server:
   npx live-server

4. Ensure the backend server is running on:
   http://localhost:3000

The client will open automatically in your browser.

## Features

- View all books (GET)
- Add a new book (POST)
- Edit existing book (PUT)
- Delete a book (DELETE)

The client interacts with the REST API and displays data dynamically.

### Open Application

Open in browser:
```
http://localhost:5500
```

---

## Running Tests (TestCafe)

```bash
cd CLIENT
npm test
```

✔ This runs automated UI tests to verify:
- Page loads
- Books are displayed
- Add/Edit/Delete functionality
- Navigation between pages

---

##  API Documentation

APIDOC is generated inside:
```
APIDOC/index.html
```

Open it in browser to view all endpoints.

---

## System Workflow

1. Frontend sends requests using Fetch API  
2. Backend processes requests via Express routes  
3. Data is returned as JSON  
4. Frontend dynamically updates UI  

---

##  Key Concepts Demonstrated

- RESTful API design  
- Client-server architecture  
- Asynchronous JavaScript (fetch)  
- DOM manipulation  
- UI state management  
- Automated testing  
- API documentation   

---

## Author

**Suman Kumar Sardar**  
GitHub: https://github.com/sumanksardar  

---
 