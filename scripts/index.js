import { getAllBooks, getAllGenres } from "./db.js";

let genres = await getAllGenres()

//кастомизация select
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('selectHeader')) {
        const list = e.target.nextElementSibling;
        
        document.querySelectorAll('.listOfGenres').forEach(otherList => {
            if (otherList !== list) otherList.classList.remove('show');
        });

        list.classList.toggle('show');
    } else if (e.target.classList.contains('selectOption')) {
        const header = e.target.closest('.choiceItem').querySelector('.selectHeader');
        const list = e.target.closest('.listOfGenres');
        
        header.textContent = e.target.textContent;
        list.classList.remove('show');
    } else {
        document.querySelectorAll('.listOfGenres').forEach(list => {
            list.classList.remove('show');
        });
    }
});

let listOfGenres = document.getElementById('listOfGenres');

listOfGenres.innerHTML = Object.entries(genres).map(([id, name]) => //список жанров в select
    `<div class="selectOption" id="selectOption" value="${id}">${name}</div>`
).join('');

function showCard(card) {
    card.classList.remove('hidden');
    card.classList.add('visible')
}

function hideCard(card) {
    card.classList.remove('visible');
    card.classList.add('hidden')
}


async function displayBooks() {
    let books = await getAllBooks();
    
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
                <p class="bookAuthor">Автор: ${book.author}</p>
                <p class="bookGenre">Жанр: ${genres[book.genre_id]}</p>
                <p class="bookDescription">Описание: ${book.description}</p>
            </div>
        `;
        sectionOfBooks.appendChild(card);

        
        let selectsOption = document.querySelectorAll('#selectOption') // сравнение жанра из списка и жанра из карточки
        selectsOption.forEach(selectOption => {
            //console.log(selectOption.textContent)
            selectOption.addEventListener('click', function() {
                if (selectOption.textContent === genres[book.genre_id]) {
                    showCard(card)
                } else if (selectOption.textContent != genres[book.genre_id]) {
                    hideCard(card)
                }
            })
        })
    });
}

displayBooks();