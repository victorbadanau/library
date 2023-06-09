let myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
    showLibraryStats();
}

function showLibraryStats() {
    const readBooks = document.querySelector(".books-read");
    const notReadBooks = document.querySelector(".books-not-read");
    const totalBooks = document.querySelector(".books-total");
    let readCount = 0;
    let notReadCount = 0;
    readBooks.textContent = 0;
    notReadBooks.textContent = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (!myLibrary[i].status) {
            notReadCount += 1;
            notReadBooks.textContent = notReadCount;
        }
        readCount += 1;
        readBooks.textContent = readCount;
    }
    totalBooks.textContent = myLibrary.length;
}

showLibraryStats();