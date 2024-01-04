// Interface som definierar strukturen för en bok.
// Det används för att ge en tydlig och strikt struktur till bokobjekten.
interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    pages: number;
    plot: string;
    audience: string;
    color: string; 
}


// Global variabel för att lagra bokdata hämtad från API:et.
let globalBooks: Book[] = [];



// Funktion för att hämta bokdata från API:et.
// Denna asynkrona funktion hämtar böckerna och lagrar dem i den globala variabeln som vi skapade ovan. 
async function fetchBooks() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        const books: Book[] = await response.json();
        globalBooks = books;
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
}



// Funktion för att visa böckerna i webbläsaren.
// Varje bok representeras som ett 'div'-element med klassen 'book-item' och ett unikt färgtema baserat på dess ID.
function displayBooks(books: Book[]) {
    const booksContainer = document.getElementById('bookList');
    if (!booksContainer) return;

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
function showModal(bookId: number) {
    const book = globalBooks.find(b => b.id === bookId);
    if (!book) {
        console.error('Boken hittades inte');
        return;
    }

    const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
    const modalAuthor = document.getElementById('modalAuthor') as HTMLElement;
    const modalPublisher = document.getElementById('modalPublisher') as HTMLElement;
    const modalYear = document.getElementById('modalYear') as HTMLElement;
    const modalPages = document.getElementById('modalPages') as HTMLElement;
    const modalPlot = document.getElementById('modalPlot') as HTMLElement;
    const modalAudience = document.getElementById('modalAudience') as HTMLElement;
    const modalColor = document.getElementById('modalColor') as HTMLElement;

    modalTitle.textContent = book.title;
    modalAuthor.textContent = `Författare: ${book.author}`;
    modalPublisher.textContent = `Förlag: ${book.publisher}`;
    modalYear.textContent = `Utgivningsår: ${book.year}`;
    modalPages.textContent = `Antal sidor: ${book.pages}`;
    modalPlot.textContent = `Handling: ${book.plot}`;
    modalAudience.textContent = `Målgrupp: ${book.audience}`;
    modalColor.style.backgroundColor = book.color;
    modalColor.textContent = `Färg: ${book.color}`;

    const modal = document.getElementById('bookModal') as HTMLDivElement;
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close');
    if (closeButton && !closeButton.getAttribute('listener')) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        closeButton.setAttribute('listener', 'true');
    }
}


// Event listener för att ladda böckerna när sidan har laddats. Detta är vad DOMContentLoaded signifierar 
document.addEventListener('DOMContentLoaded', fetchBooks);
