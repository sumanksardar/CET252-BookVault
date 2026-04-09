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
├── API/         → Backend (Node.js + Express)
├── CLIENT/      → Frontend (HTML, CSS, JavaScript)
├── APIDOC/      → Generated API documentation
├── FIGMA/       → Wireframe and high-fidelity design PDFs
├── KANBAN/      → Trello board screenshots/evidence
├── .gitignore   → Ignores node_modules and unnecessary files
└── README.md    → Project documentation
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
npm run dev
```

API runs at:
```
http://localhost:3001
```

---

## Client Application Setup

To run the client application locally, follow these steps:

1. Navigate to the CLIENT folder:
   cd CLIENT
npm install
npx live-server --port=5500

2. Install dependencies:
   npm install

3. Start the client using live-server:
   npx live-server

4. Ensure the backend server is running on:
   http://localhost:3000

The client will open automatically in your browser.


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
cd APIDOC
python3 -m http.server 8080
```

Open it in browser to view all endpoints.

---

## System Workflow

1. Frontend sends requests using Fetch API  
2. Backend processes requests via Express routes  
3. Data is returned as JSON  
4. Frontend dynamically updates UI  

---
# Figma Design Documentation

This folder contains the design artefacts produced for the BookVault prototype as part of the CET252 portfolio task.

## Files Included

- `WIREFRAME.pdf` – low-fidelity wireframe used for the initial planning of layout and navigation
- `Design1-Standard.pdf` – standard user interface design
- `Design2-Dark.pdf` – dark theme interface design
- `Design3-Vibrant.pdf` – vibrant colour-based interface design

## Overview

These files document the design stage of the project before final development. The wireframe was used to define the core structure of the application, including page layout, content areas, and user interaction points. The design concepts were then created to explore multiple possible visual styles for the final prototype.

## Design Purpose

The design work was used to:

- plan the overall structure of the application
- visualise alternative interface styles
- support consistency in layout and presentation
- guide implementation of the final client application

## Project Relevance

These documents provide evidence of the design and planning process undertaken before and during development. They are included to support the final submission and demonstrate the transition from concept design to functional prototype.
---
## Kanban Board

This project was planned and managed using a Trello Kanban board.

🔗 Trello Board:
https://trello.com/b/t96PrwhJ/cet252-bookvault-b2

Screenshots of the Trello board are also included in the KANBAN folder as submission evidence.

The board includes:
- To Do tasks
- Work in progress
- Completed tasks
- User stories and planning details
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
 