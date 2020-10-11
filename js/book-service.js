'use strict';

const STORAGE_KEY = 'bookDB';
const gPageSize = 2;

var gBooks;
var gSortBy = 'All';
var gCurrPage = 1;

function sortBy(sortByVal) {
    gBooks.sort(function (book1, book2) {
        var value1 = typeof (book1[sortByVal]) === "string" ? book1[sortByVal].toLowerCase() : book1[sortByVal];
        var value2 = typeof (book2[sortByVal]) === "string" ? book2[sortByVal].toLowerCase() : book2[sortByVal];
        if (value1 > value2) return 1;
        if (value1 < value2) return -1;

        return 0;
    });
    gSortBy = sortByVal;
}


function getBooks(sortByVal, page = 1) {
    gCurrPage = page;
    if (!sortByVal) sortByVal = gSortBy;
    sortBy(sortByVal);

    return getPage(gBooks, page, gPageSize);
}

function createBook(name, price) {
    var book = {
        id: makeId(4),
        name: name,
        price: price,
        rate: 0
    }
    return book;
}

function createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [];
        var randBook = createBook('Frozen', 20);
        books.push(randBook);
    }
    gBooks = books;
    saveBookToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    return book;
}

function addBook(name, price) {
    var book = createBook(name, price);
    gBooks.unshift(book);
    console.log(name, 'is added');
    saveBookToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1);
    saveBookToStorage();
}

function updateBook(bookId, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks[bookIdx].price = price;
    saveBookToStorage();
}

function increaseRate(bookId) {
    var book = getBookById(bookId);
    book.rate += 1;
    saveBookToStorage();
}

function decreaseRate(bookId) {
    var book = getBookById(bookId);
    book.rate -= 1;
    saveBookToStorage();
}


function saveBookToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}