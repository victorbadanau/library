let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayStats();
}

function displayBooks() {
    const bookList = document.querySelector(".table-body");
    bookList.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("book-info");
        bookList.appendChild(bookRow);
        // title
        const bookTitle = document.createElement("td");
        bookTitle.textContent = myLibrary[i].title;
        bookRow.appendChild(bookTitle);
        // author
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = myLibrary[i].author;
        bookRow.appendChild(bookAuthor);
        // pages
        const bookPages = document.createElement('td');
        bookPages.textContent = myLibrary[i].pages;
        bookRow.appendChild(bookPages);
        // status
        const bookStatus = document.createElement("td");
        const statusSymbol = document.createElement("i");
        if (myLibrary[i].read === false) {
            statusSymbol.classList.add("fa-regular", "fa-circle-xmark");
        }
        else {
            statusSymbol.classList.add("fa-regular", "fa-circle-check");
        }
        bookStatus.appendChild(statusSymbol);
        bookRow.appendChild(bookStatus);
        // delete all button
        const bookDelete = document.createElement("td");
        const deleteSymbol = document.createElement("i");
        deleteSymbol.classList.add("fa-regular", "fa-trash-can");
        bookDelete.appendChild(deleteSymbol);
        bookRow.appendChild(bookDelete);
    }
}

function displayStats() {
    const readBooks = document.querySelector(".books-read");
    const notReadBooks = document.querySelector(".books-not-read");
    const totalBooks = document.querySelector(".books-total");
    let readCount = 0;
    let notReadCount = 0;
    readBooks.textContent = 0;
    notReadBooks.textContent = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === true) {
            readCount += 1;
            readBooks.textContent = readCount;
        }
        else if (myLibrary[i].read === false) {
            notReadCount += 1;
            notReadBooks.textContent = notReadCount;
        }
    }
    totalBooks.textContent = myLibrary.length;
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#checkbox");

function validateForm(event) {
    event.preventDefault();
    if (title.checkValidity && author.value !== "" && pages.value !== "" && pages.value > 0) {
        if (read.checked) {
            addBookToLibrary(title.value, author.value, pages.value, true);
        }
        else {
            addBookToLibrary(title.value, author.value, pages.value, false);
        }
    }
    clearForm();
}

const addBookModal = document.querySelector(".modal");
const addBookForm = document.querySelector("#addBookForm");
const allInputs = document.querySelectorAll("input");
const submitButton = document.querySelector("#submit-button");
const addCloseModal = document.querySelector(".close-modal");

function clearForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

const openAddBookModal = () => {
    addBookModal.classList.add('active');
    overlay.classList.add('active');
  }
  
const closeAddBookModal = () => {
    addBookModal.classList.remove('active');
    overlay.classList.remove('active');
}

const openCloseModal = () => {
    addCloseModal.classList.add('active');
    overlay.classList.add('active');
}

const closeCloseModal = () => {
    addCloseModal.classList.remove('active');
    overlay.classList.remove('active');
}

function userControl() {
   document.addEventListener("pointerdown", (event) => {
    const {target} = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "add-book") {
        openAddBookModal();
    }
    else if (target.id === "overlay") {
        closeAddBookModal();
        closeCloseModal();
    }
    else if (target.id === "cancel") {
        closeCloseModal();
    }
    else if (target.id === "delete") {
        myLibrary = [];
        displayStats();
        displayBooks();
        closeCloseModal();
    }
    else if (target.id === "submit-book" && document.forms.addBook.checkValidity()) {
        validateForm(event);
        displayBooks();
        closeAddBookModal();
    }
    else if (target.id === "delete-all") {
        openCloseModal();
    }
    else if (target.classList.contains("fa-trash-can")) {
        myLibrary.splice(tr, 1);
        displayStats();
        displayBooks();
    }
    else if (target.classList.contains("fa-circle-check")) {
        target.classList.remove("fa-circle-check");
        target.classList.add("fa-circle-xmark");
        myLibrary[tr].read = false;
        displayStats();
    }
    else if (target.classList.contains("fa-circle-xmark")) {
        target.classList.remove("fa-circle-xmark");
        target.classList.add("fa-circle-check");
        myLibrary[tr].read = true;
        displayStats();
    }
   });
  
}

displayStats();
userControl();