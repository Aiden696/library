import getAllBooks from "./db.js";

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
    let books = getAllBooks();
    let sectionOfBooks = document.getElementById('cards');

    books.forEach(book => {
        let card = document.createElement('div');
        card.className = 'cardOfBook';

        card.innerHTML = `
            <div class="bookPicture">
                <img src="${book.cover}" alt="${book.title}" class="bookCover">
            </div>

            <div class="bookContent">
                <h3 class="bookTitle">${book.title}</h3>
                ${`<p class="bookAuthor">Автор: ${book.author}</p>`}
                ${`<p class="bookGenre">Жанр: ${book.genre_id}</p>`}
                ${`<p class="bookDescription">Описание: ${book.description}</p>`}
            </div>
        `;
        sectionOfBooks.appendChild(card);
    });
}

displayBooks();