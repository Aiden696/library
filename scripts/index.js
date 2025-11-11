import getAllBooks from "./db.js";
let books = getAllBooks();

//кастомизация select
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-header')) {
        const list = e.target.nextElementSibling;
        
        document.querySelectorAll('.select-list').forEach(otherList => {
            if (otherList !== list) otherList.classList.remove('show');
        });

        list.classList.toggle('show');
    } else if (e.target.classList.contains('select-option')) {
        const header = e.target.closest('.choiceItem').querySelector('.select-header');
        const list = e.target.closest('.select-list');
        
        header.textContent = e.target.textContent;
        list.classList.remove('show');
    } else {
        document.querySelectorAll('.select-list').forEach(list => {
            list.classList.remove('show');
        });
    }
});

function displayBooks() {
    let sectionOfBooks = document.getElementById('cards');
    books.map(book => {
        let card = document.createElement('div');
        card.className = 'cardOfBook';
        
        card.innerHTML = `
            <h3 class="bookTitle">${book.title}</h3>
            ${`<p class="bookAuthor">Автор: ${book.author}</p>`}
            ${`<p class="bookGenre">Жанр: ${book.genre_id}</p>`}
            ${`<p class="bookDescription">Описание: ${book.description}</p>`}
        `;
        sectionOfBooks.appendChild(card);
    });
}

displayBooks();