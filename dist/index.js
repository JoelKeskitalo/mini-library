"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global variabel för att lagra bokdata hämtad från API:et.
let globalBooks = [];
// Funktion för att hämta bokdata från API:et.
// Denna asynkrona funktion hämtar böckerna och lagrar dem i den globala variabeln.
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            const books = yield response.json();
            globalBooks = books;
            displayBooks(books);
        }
        catch (error) {
            console.error('Error fetching books: ', error);
        }
    });
}
// Funktion för att visa böckerna i webbläsaren.
// Varje bok representeras som ett 'div'-element med klassen 'book-item' och ett unikt färgtema baserat på dess ID.
function displayBooks(books) {
    const booksContainer = document.getElementById('bookList');
    if (!booksContainer)
        return;
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = `book-item color-${book.id}`;
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button onclick="showModal(${book.id})">More Info</button>
        `;
        booksContainer.appendChild(bookElement);
    });
}
// Funktion för att visa en modal när en användare klickar på 'More Info'-knappen för en bok.
// Modalen fylls med detaljerad information om den valda boken.
function showModal(bookId) {
    const book = globalBooks.find(b => b.id === bookId);
    if (!book) {
        console.error('Boken hittades inte');
        return;
    }
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalPublisher = document.getElementById('modalPublisher');
    const modalYear = document.getElementById('modalYear');
    const modalPages = document.getElementById('modalPages');
    const modalPlot = document.getElementById('modalPlot');
    const modalAudience = document.getElementById('modalAudience');
    const modalColor = document.getElementById('modalColor');
    modalTitle.textContent = book.title;
    modalAuthor.textContent = `Författare: ${book.author}`;
    modalPublisher.textContent = `Förlag: ${book.publisher}`;
    modalYear.textContent = `Utgivningsår: ${book.year}`;
    modalPages.textContent = `Antal sidor: ${book.pages}`;
    modalPlot.textContent = `Handling: ${book.plot}`;
    modalAudience.textContent = `Målgrupp: ${book.audience}`;
    modalColor.style.backgroundColor = book.color;
    modalColor.textContent = `Färg: ${book.color}`;
    const modal = document.getElementById('bookModal');
    modal.style.display = 'block';
    const closeButton = document.querySelector('.close');
    if (closeButton && !closeButton.getAttribute('listener')) {
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        closeButton.setAttribute('listener', 'true');
    }
}
// Event listener för att ladda böckerna när sidan har laddats.
document.addEventListener('DOMContentLoaded', fetchBooks);
