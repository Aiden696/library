import { getAllBooks, getAllGenres } from "./db.js";

let genres = await getAllGenres()

//кастомизация select
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('selectHeader')) {
        let list = e.target.nextElementSibling;
        document.querySelectorAll('.listOfGenres, .listOfAuthors').forEach(otherList => {
            if (otherList !== list) otherList.classList.remove('show');
        });

        list.classList.toggle('show');
    } else if (e.target.classList.contains('selectGenre') || e.target.classList.contains('selectAuthor') || e.target.classList.contains('showAllBooks')) {
        let choiceItem = e.target.closest('.choiceItem');
        let header = choiceItem.querySelector('.selectHeader');
        let list = choiceItem.querySelector('.listOfGenres, .listOfAuthors');
        
        header.textContent = e.target.textContent;
        list.classList.remove('show');
    } else {
        document.querySelectorAll('.listOfGenres, .listOfAuthors').forEach(list => {
            list.classList.remove('show');
        });
    }
});

let listOfGenres = document.getElementById('listOfGenres');
let listOfAuthors = document.getElementById('listOfAuthors');

listOfGenres.innerHTML = `<div class="showAllBooks">Показать все жанры</div>` + Object.values(genres).map(name => //список жанров в select
    `<div class="selectGenre">${name}</div>`
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
    let arrOfAuthors = [];
    let sectionOfBooks = document.getElementById('cards');

    books.forEach(book => {
        let card = document.createElement('div');
        card.className = 'cardOfBook';
        card.dataset.author = book.author; //с помощью dataset каждой карточке приписывает автора
        card.dataset.genre = book.genre_id;
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

        if (!arrOfAuthors.includes(book.author)) { //проверка на дублирование автора в массиве
            arrOfAuthors.push(book.author);
        }
    });

    listOfAuthors.innerHTML = `<div class="showAllBooks">Показать всех авторов</div>` + arrOfAuthors.map(author => //добавление автора в select
        `<div class="selectAuthor">${author}</div>`
    ).join('')

    let buttonsShowAllBooks = document.querySelectorAll('.showAllBooks');
    buttonsShowAllBooks.forEach(buttonShowAllBooks => {
        buttonShowAllBooks.addEventListener('click', function() {
            allCards.forEach(card => {
                showCard(card);
            })
        })
    })

    let allCards = document.querySelectorAll('.cardOfBook'); //находит все карточки

    let selectGenres = document.querySelectorAll('.selectGenre') // сравнение жанра из списка и жанра из карточки
    selectGenres.forEach(selectGenre => {
        selectGenre.addEventListener('click', function() {
            let selectGenres = this.textContent;
            allCards.forEach(card => {
                if (genres[card.dataset.genre] === selectGenres) {
                    showCard(card)
                } else {
                    hideCard(card)
                }
            })
        })
    })

    let selectAuthors = document.querySelectorAll('.selectAuthor');
    selectAuthors.forEach(selectAuthor => {
        selectAuthor.addEventListener('click', function() {
            let selectedAuthor = this.textContent; //записывает автора на которого кликнули в переменную
            allCards.forEach(card => {
                if (card.dataset.author === selectedAuthor) {
                    showCard(card);
                } else {
                    hideCard(card);
                }
            });
        });
    });    
}

displayBooks();