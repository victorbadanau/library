let myLibrary = [{title:"The Hobbit", author:"J.R.R. Tolkien", pages:295, read:true},
                {title:"God is not great", author:"Christopher Hitchens", pages:307, read:true},
                {title:"The madness of crowds", author:"Douglas Murray", pages:288, read:false},
                {title:"The madness of crowds", author:"Douglas Murray", pages:288, read:true}];

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
    showLibraryStats();
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function displayBooks() {
    const bookList = document.querySelector(".book-table")
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("book-info");
        insertAfter(bookRow,  bookList.lastElementChild);
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
            statusSymbol.textContent = " Not Read";
        }
        else {
            statusSymbol.classList.add("fa-regular", "fa-circle-check");
            statusSymbol.textContent = " Read";
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

function showLibraryStats() {
    const readBooks = document.querySelector(".books-read");
    const notReadBooks = document.querySelector(".books-not-read");
    const totalBooks = document.querySelector(".books-total");
    let readCount = 0;
    let notReadCount = 0;
    readBooks.textContent = 0;
    notReadBooks.textContent = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === false) {
            notReadCount += 1;
            notReadBooks.textContent = notReadCount;
            readCount -= 1;
            readBooks.textContent = readCount;
        }
        readCount += 1;
        readBooks.textContent = readCount;
    }
    totalBooks.textContent = myLibrary.length;
}

showLibraryStats();
displayBooks()