// Frontend Fianlised Version
const API_BASE_URL = "http://127.0.0.1:3000/api/books";

let books = [];
let filteredBooks = [];
let currentPage = 1;
const booksPerPage = 4;

let currentBookId = null;
let deleteBookId = null;

function el(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  loadBooks();
});

function bindEvents() {
  el("openAddBtn")?.addEventListener("click", openAddPage);
  el("backToLibraryBtn")?.addEventListener("click", () => showPage("list"));
  el("cancelFormBtn")?.addEventListener("click", () => showPage("list"));

  el("detailsBackBtnTop")?.addEventListener("click", () => showPage("list"));

  el("detailsEditBtnTop")?.addEventListener("click", () => {
    if (currentBookId !== null) openEditPage(currentBookId);
  });

  el("detailsDeleteBtnTop")?.addEventListener("click", () => {
    if (currentBookId !== null) openDeleteModal(currentBookId);
  });

  el("formDeleteBtnTop")?.addEventListener("click", () => {
    const id = Number(el("bookId")?.value || 0);
    if (id) openDeleteModal(id);
  });

  el("bookForm")?.addEventListener("submit", handleFormSubmit);

  el("searchInput")?.addEventListener("input", () => {
    currentPage = 1;
    applyFilters();
  });

  el("statusFilter")?.addEventListener("change", () => {
    currentPage = 1;
    applyFilters();
  });

  el("prevPageBtn")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderBooks();
    }
  });

  el("nextPageBtn")?.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks();
    }
  });

  el("confirmDeleteBtn")?.addEventListener("click", confirmDelete);
  el("cancelDeleteBtn")?.addEventListener("click", closeDeleteModal);
}

async function loadBooks() {
  const tableBody = el("bookTableBody");

  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("API did not return an array of books");
    }

    books = data;
    filteredBooks = [...books];
    currentPage = 1;
    renderBooks();
  } catch (error) {
    console.error("Load books error:", error);

    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-row">
            Failed to load books. Check API server and browser console.
          </td>
        </tr>
      `;
    }

    const countText = el("bookCountText");
    if (countText) countText.textContent = "Showing 0 of 0 books";
  }
}

function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (value === "currently reading") return "Currently Reading";
  if (value === "reading") return "Reading";
  if (value === "want to read") return "Want to Read";
  if (value === "read") return "Read";
  if (value === "borrowed") return "Borrowed";
  if (value === "available") return "Available";
  if (value === "reserved") return "Reserved";

  return "Read";
}

function applyFilters() {
  const searchTerm = String(el("searchInput")?.value || "").trim().toLowerCase();
  const selectedStatus = String(el("statusFilter")?.value || "all");

  filteredBooks = books.filter((book) => {
    const title = String(book.title || "").toLowerCase();
    const author = String(book.author || "").toLowerCase();
    const genre = String(book.genre || "").toLowerCase();
    const status = normalizeStatus(book.status);

    const matchesSearch =
      title.includes(searchTerm) ||
      author.includes(searchTerm) ||
      genre.includes(searchTerm);

    const matchesStatus = selectedStatus === "all" || status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  currentPage = 1;
  renderBooks();
}

function renderBooks() {
  const tableBody = el("bookTableBody");
  const countText = el("bookCountText");
  const prevBtn = el("prevPageBtn");
  const nextBtn = el("nextPageBtn");

  if (!tableBody) return;

  if (!Array.isArray(filteredBooks) || filteredBooks.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-row">No books found.</td>
      </tr>
    `;
    if (countText) countText.textContent = "Showing 0 of 0 books";
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * booksPerPage;
  const pageItems = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  tableBody.innerHTML = pageItems
    .map((book) => {
      const safeId = Number(book.id || 0);
      const safeTitle = escapeHtml(book.title || "Untitled");
      const safeAuthor = escapeHtml(book.author || "Unknown Author");
      const safeGenre = escapeHtml(book.genre || "General");
      const status = normalizeStatus(book.status);
      const statusClass = "status-" + status.toLowerCase().replace(/\s+/g, "-");

      return `
        <tr>
          <td><strong>${safeTitle}</strong></td>
          <td>${safeAuthor}</td>
          <td><span class="genre-pill">${safeGenre}</span></td>
          <td><span class="status-pill ${statusClass}">${escapeHtml(status)}</span></td>
          <td>
            <div class="action-cell">
              <button class="icon-action" onclick="openDetailsPage(${safeId})" title="View">👁</button>
              <button class="icon-action" onclick="openEditPage(${safeId})" title="Edit">✎</button>
              <button class="icon-action" onclick="openDeleteModal(${safeId})" title="Delete">🗑</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  const shownStart = startIndex + 1;
  const shownEnd = Math.min(startIndex + pageItems.length, filteredBooks.length);

  if (countText) {
    countText.textContent = `Showing ${shownStart}-${shownEnd} of ${filteredBooks.length} books`;
  }

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function showPage(pageName) {
  el("listPage")?.classList.remove("active");
  el("detailsPage")?.classList.remove("active");
  el("formPage")?.classList.remove("active");

  if (pageName === "list") el("listPage")?.classList.add("active");
  if (pageName === "details") el("detailsPage")?.classList.add("active");
  if (pageName === "form") el("formPage")?.classList.add("active");
}

function openDetailsPage(id) {
  const book = books.find((b) => Number(b.id) === Number(id));
  if (!book) return;

  currentBookId = Number(id);

  const genre = book.genre || "Fiction";
  const rating = Number(book.rating || 4);
  const status = normalizeStatus(book.status);

  if (el("detailsTitle")) el("detailsTitle").textContent = book.title || "Untitled Book";
  if (el("detailsAuthor")) el("detailsAuthor").textContent = book.author || "Unknown Author";
  if (el("detailsGenre")) el("detailsGenre").textContent = genre;
  if (el("detailsGenreSecondary1")) el("detailsGenreSecondary1").textContent = getSecondaryGenre1(genre);
  if (el("detailsGenreSecondary2")) el("detailsGenreSecondary2").textContent = getSecondaryGenre2(genre);
  if (el("detailsRatingNumber")) {
    el("detailsRatingNumber").textContent = Number.isInteger(rating) ? `${rating}.0` : String(rating);
  }
  if (el("detailsStars")) el("detailsStars").textContent = renderStars(rating);
  if (el("detailsYear")) el("detailsYear").textContent = String(book.published_year || "-");
  if (el("detailsDescription")) {
    el("detailsDescription").textContent = book.description || "No description available.";
  }
  if (el("detailsReadingStateText")) {
    el("detailsReadingStateText").textContent = status.toUpperCase();
  }
  if (el("detailsPages")) {
    el("detailsPages").textContent = `${generatePages(book.title)} pages`;
  }

  const progress = getProgressFromStatus(status);
  if (el("detailsProgressBar")) el("detailsProgressBar").style.width = `${progress}%`;
  if (el("detailsProgressText")) el("detailsProgressText").textContent = `${progress}% Completed`;

  showPage("details");
}

function openAddPage() {
  resetForm();
  currentBookId = null;

  if (el("formPageTitle")) el("formPageTitle").textContent = "Add New Book";
  if (el("formPageSubtitle")) {
    el("formPageSubtitle").textContent =
      "Fill in the details below to catalog a new title in your digital vault.";
  }
  if (el("saveBookBtn")) el("saveBookBtn").textContent = "Save to Vault";
  el("formDeleteBtnTop")?.classList.add("hidden");

  showPage("form");
}

function openEditPage(id) {
  const book = books.find((b) => Number(b.id) === Number(id));
  if (!book) return;

  currentBookId = Number(id);

  if (el("bookId")) el("bookId").value = String(book.id);
  if (el("title")) el("title").value = book.title || "";
  if (el("author")) el("author").value = book.author || "";
  if (el("genre")) el("genre").value = book.genre || "";
  if (el("published_year")) el("published_year").value = String(book.published_year || "");
  if (el("rating")) el("rating").value = String(book.rating || 4);
  if (el("description")) el("description").value = book.description || "";

  const status = normalizeStatus(book.status);
  const radio = document.querySelector(`input[name="statusRadio"][value="${status}"]`);
  if (radio) radio.checked = true;

  if (el("formPageTitle")) el("formPageTitle").textContent = "Edit Book";
  if (el("formPageSubtitle")) {
    el("formPageSubtitle").textContent = "Modify the details for this entry in your collection.";
  }
  if (el("saveBookBtn")) el("saveBookBtn").textContent = "Update Book";
  el("formDeleteBtnTop")?.classList.remove("hidden");

  showPage("form");
}

function resetForm() {
  el("bookForm")?.reset();
  if (el("bookId")) el("bookId").value = "";
  if (el("rating")) el("rating").value = "5";

  const defaultStatus = document.querySelector(
    'input[name="statusRadio"][value="Want to Read"]'
  );
  if (defaultStatus) defaultStatus.checked = true;
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const selectedStatus =
    document.querySelector('input[name="statusRadio"]:checked')?.value || "Read";

  const payload = {
    title: String(el("title")?.value || "").trim(),
    author: String(el("author")?.value || "").trim(),
    genre: String(el("genre")?.value || "").trim(),
    published_year: Number(el("published_year")?.value || 0),
    rating: Number(el("rating")?.value || 0),
    status: selectedStatus,
    description: String(el("description")?.value || "").trim()
  };

  try {
    const id = el("bookId")?.value;
    let response;

    if (id) {
      response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) {
      throw new Error(`Failed to save book: ${response.status}`);
    }

    await loadBooks();
    showPage("list");
  } catch (error) {
    console.error("Save error:", error);
    alert("Failed to save book.");
  }
}

function openDeleteModal(id) {
  const book = books.find((b) => Number(b.id) === Number(id));
  if (!book) return;

  deleteBookId = Number(id);

  if (el("deleteMessage")) {
    el("deleteMessage").innerHTML =
      `Are you sure you want to remove "<strong>${escapeHtml(book.title || "Untitled")}</strong>" from your vault? This action cannot be undone.`;
  }

  if (el("deleteBookTitle")) {
    el("deleteBookTitle").textContent = book.title || "Untitled";
  }

  if (el("deleteBookAuthor")) {
    el("deleteBookAuthor").textContent = book.author || "Unknown Author";
  }

  el("deleteModal")?.classList.remove("hidden");
}

function closeDeleteModal() {
  deleteBookId = null;
  el("deleteModal")?.classList.add("hidden");
}

async function confirmDelete() {
  if (!deleteBookId) return;

  try {
    const response = await fetch(`${API_BASE_URL}/${deleteBookId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.status}`);
    }

    closeDeleteModal();
    await loadBooks();
    showPage("list");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete book.");
  }
}

function renderStars(rating) {
  const rounded = Math.round(Number(rating) || 0);
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded ? "★" : "☆";
  }

  return stars;
}

function getSecondaryGenre1(genre) {
  const map = {
    Fiction: "Fantasy",
    Fantasy: "Adventure",
    Classic: "Literary",
    Thriller: "Mystery",
    "Non-Fiction": "Knowledge",
    Finance: "Business",
    "Self-Help": "Growth",
    "Sci-Fi": "Future",
    Dystopian: "Political"
  };

  return map[genre] || "Contemporary";
}

function getSecondaryGenre2(genre) {
  const map = {
    Fiction: "Contemporary",
    Fantasy: "Epic",
    Classic: "Drama",
    Thriller: "Suspense",
    "Non-Fiction": "Insight",
    Finance: "Strategy",
    "Self-Help": "Mindset",
    "Sci-Fi": "Technology",
    Dystopian: "Society"
  };

  return map[genre] || "Modern";
}

function getProgressFromStatus(status) {
  if (status === "Currently Reading") return 65;
  if (status === "Reading") return 48;
  if (status === "Read") return 100;
  if (status === "Want to Read") return 8;
  if (status === "Borrowed") return 30;
  if (status === "Reserved") return 12;
  if (status === "Available") return 20;

  return 20;
}

function generatePages(seed) {
  const base = String(seed || "book").length * 17;
  return 180 + (base % 260);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}