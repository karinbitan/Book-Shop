'use strict';


function init() {
    createBooks();
    renderBooks();
}

function renderPages() {
    var totalPages = Math.ceil(gBooks.length / gPageSize);
    var pages = '';
    if (gCurrPage > 1) {
        pages = `<span class="last-page" onclick="renderBooks('${gSortBy}', ${gCurrPage - 1})">&laquo;</span>`;
    }
    for (let i = 1; i <= totalPages; i++) {
        var active = (gCurrPage == i) ? 'active' : '';
        pages += `<span class="page ${active}" onClick="renderBooks('${gSortBy}', ${i});">${i}</span>`;
    }
    if (gCurrPage < totalPages) {
        pages += `<span class="next-page" onclick="renderBooks('${gSortBy}', ${gCurrPage + 1})">&raquo;</span>`;
    }
    document.querySelector('.pages').innerHTML = pages;
}

function renderBooks(sortBy, page = 1) {
    var books = getBooks(sortBy, page);
    var strHTML = books.map(function (book) {
        return `<tr> 
<td>${book.id}</td>
<td> ${book.name} </td>
<td> ${book.price}$ </td>
<td><img class="crud read" src="icons/read-icon.jpg" onclick="onReadBook('${book.id}')"></td>
<td><img class="crud update" src="icons/update-icon.jpg" onclick="onUpdateBook('${book.id}')"></td>
<td><img class="crud delete" src="icons/delete-icon.jpg" onclick="onRemoveBook('${book.id}')"></td>
</tr>`;
    })

    document.querySelector('.book-list').innerHTML = strHTML.join('');

    renderPages();
}

function onAddBook() {
    var name = document.querySelector('.new-book-name').value;
    var price = document.querySelector('.new-book-price').value;
    if (!name || !price) return;
    addBook(name, parseInt(price));
    renderBooks();
    var name = document.querySelector('.new-book-name').value = '';
    var price = document.querySelector('.new-book-price').value = '';
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    document.querySelector('.modal h3').innerText = book.name;
    document.querySelector('.modal h5 span').innerText = book.price;
    document.querySelector('.increase').setAttribute(`onclick`, `onIncreaseRate('${bookId}')`);
    document.querySelector('.decrease').setAttribute(`onclick`, `onDecreaseRate('${bookId}')`);
    document.querySelector('.rate').innerText = book.rate;
    document.querySelector('.modal').hidden = false;
}

function onIncreaseRate(bookId) {
    increaseRate(bookId);
    var book = getBookById(bookId);
    document.querySelector('.rate').innerText = book.rate;
}

function onDecreaseRate(bookId) {
    decreaseRate(bookId);
    var book = getBookById(bookId);
    document.querySelector('.rate').innerText = book.rate;
}

function closeModal() {
    document.querySelector('.modal').hidden = true;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var price = +prompt('Update book new price:');
    updateBook(bookId, price);
    renderBooks();
}

function onNextPage() {
    nextPage(gCurrPage);
    renderBooks()
}