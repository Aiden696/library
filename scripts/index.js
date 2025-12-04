import { getAllBooks, getAllGenres } from "./db.js";

//let genres = await getAllGenres()

let jsonGenres = await getAllGenres();
let localStorageGenres = JSON.parse(localStorage.getItem('allGenres')) || {};
let genres = { ...jsonGenres, ...localStorageGenres };
let books = await getAllBooks();

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
let btnAddBook = document.getElementById('addBook');
let dialog = document.getElementById('modalDialog')
let buttonSend = document.getElementById('buttonSend');

console.log(listOfGenres)

listOfGenres.innerHTML = `<div class="showAllBooks">Показать все жанры</div>` + Object.values(genres).map(name => //список жанров в select
    `<div class="selectGenre">${name}</div>`
).join('');
console.log(listOfGenres.innerHTML)

function showCard(card) {
    card.classList.remove('hidden');
    card.classList.add('visible')
}

function hideCard(card) {
    card.classList.remove('visible');
    card.classList.add('hidden')
}

// ФОРМА
btnAddBook.addEventListener('click', function() { // ф-ция добавления книги через форму
    dialog.showModal()
    showImageForBook()
})

function showImageForBook() { //ф-ция для показа изображения в форме
    let coverInput = document.getElementById('cover');
    let imageForCover = document.getElementById('imageForCover');

    coverInput.addEventListener('change', function(e) {
        let file = e.target.files[0]; //первый выбранный файл из массива файлов
        if (file) {
            let reader = new FileReader(); //встроенный js объект для чтения файлов из браузера
            
            reader.onload = function(e) { //когда файл загружен
                imageForCover.innerHTML = `<img src="${e.target.result}" class="coverImage"> `;
            };
            
            reader.readAsDataURL(file); //метод, который читает файл и преобразует его в Data URL строку (специальный формат, который позволяет встраивать файлы прямо в HTML/CSS/JS код)
        }
    });

    coverInput.addEventListener('change', function(e) { // для отображения выбранной обложки
        let fileName = document.getElementById('fileName');
        if (this.files[0]) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'Файл не выбран';
        }
    });
}

async function getImageAsBase64(file) { //преобразует файл в base64 строку
    if (!file) return ''; // если файл не выбран
    
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function getGenresIdAndName() { // ID и название жанра для выбора жанра в форме и присваивание ID жанра новой карточке
    let genreSelect = document.getElementById('genre');
    let genresFromJSON = Object.entries(genres);
    genresFromJSON.forEach(([id,name]) => {
        let optionForGenre = document.createElement('option');
        optionForGenre.value = id;
        optionForGenre.innerHTML = name;
        genreSelect.append(optionForGenre);
    })
}

getGenresIdAndName()

document.addEventListener('click', function(e) { //закрытие модал окна по крестику
    if (e.target.classList.contains('closeButton')) {
        closeDialog();
    }
});

dialog.addEventListener('click', function(e) { //закрытие модал окна по ESC и клику вне окна
    if (e.target === dialog) {
        closeDialog();
    }
});

function closeDialog() {
    let dialog = document.getElementById('modalDialog');
    dialog.close();
    //modalContent.innerHTML = '';
    document.getElementById('addBookForm').reset();
    document.getElementById('imageForCover').innerHTML = '';
    document.getElementById('fileName').textContent = 'Файл не выбран'
}

buttonSend.addEventListener('click', async function(e) {
    e.preventDefault()
    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');
    let genreOption = document.getElementById('genre');
    let genreInput = document.getElementById('inputForGenreInForm');
    let descriptionInput = document.getElementById('description');
    let coverInput = document.getElementById('cover')

    let cardsInLS = JSON.parse(localStorage.getItem('allBooks')) || [];

    if (genreInput.value.trim() !== '' && !Object.values(genres).some(genre => genre === genreInput.value.trim())) { //добавление нового жанра из формы
        let lastGenreId = 0;
        Object.keys(genres).forEach(key => {
            let id = Number(key);
            if (id > lastGenreId) {
                lastGenreId = id;
            }
        });
    
    let newGenreId = lastGenreId + 1; //новый ID
    
    genres[newGenreId] = genreInput.value.trim();       
    localStorage.setItem('allGenres', JSON.stringify(genres)); 
    
    let newOption = document.createElement('option');
    newOption.value = newGenreId;
    newOption.textContent = genreInput.value.trim();
    genreOption.appendChild(newOption);

    genreOption.value = newGenreId;
    listOfGenres.innerHTML = `<div class="showAllBooks">Показать все жанры</div>` + Object.values(genres).map(name => //список жанров в select
        `<div class="selectGenre">${name}</div>`
    ).join('');
    }

    let lastId = 0; // берем id последней книги из books.json

    let allBooks = [...books, ...cardsInLS];
    allBooks.forEach(book => {
        if (book.id > lastId) {
            lastId = book.id;
        }
    })

    let newBook = {
        id: lastId + 1,
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        description: descriptionInput.value.trim(),
        genre_id: Number(genreOption.value),
        cover: await getImageAsBase64(coverInput.files[0])
    }

    cardsInLS.push(newBook)

    localStorage.setItem('allBooks', JSON.stringify(cardsInLS))
    console.log(newBook)
    closeDialog();

    books = await getAllBooks();
    let cards = document.getElementById('cards');
    cards.innerHTML = '';
    displayBooks()

    allCards = document.querySelectorAll('.cardOfBook'); //находит все карточки

    // ПЕРЕЗАПИСЬ 

    let buttonsShowAllBooks = document.querySelectorAll('.showAllBooks');
    buttonsShowAllBooks.forEach(buttonShowAllBooks => {
        buttonShowAllBooks.addEventListener('click', function() {
            allCards.forEach(card => {
                showCard(card);
            })
        })
    });
    
    let selectGenres = document.querySelectorAll('.selectGenre') // перезаписать жанры для отображения в списке жанров без перезагрузки show
    selectGenres.forEach(selectGenre => {
        selectGenre.addEventListener('click', function() {
            let selectGenres = this.textContent;
            allCards.forEach(card => {
                if (genres[card.genre] === selectGenres) {
                    showCard(card)
                } else {
                    hideCard(card)
                }
            })
        })
    })

    let selectAuthors = document.querySelectorAll('.selectAuthor'); //перезаписать авторов для отображения в списке авторов без перезагрузки
    selectAuthors.forEach(selectAuthor => {
        selectAuthor.addEventListener('click', function() {
            let selectedAuthor = this.textContent; //записывает автора на которого кликнули в переменную
            allCards.forEach(card => {
                if (card.author === selectedAuthor) {
                    showCard(card);
                } else {
                    hideCard(card);
                }
            });
        });
    });
})

// КНИГИ
async function displayBooks() {
    let arrOfAuthors = [];
    let sectionOfBooks = document.getElementById('cards');

    books.forEach(book => {
        let card = document.createElement('div');
        card.className = 'cardOfBook';
        card.author = book.author;
        card.genre = book.genre_id;
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
}

displayBooks();

let allCards = document.querySelectorAll('.cardOfBook'); //находит все карточки


let selectGenres = document.querySelectorAll('.selectGenre') // сравнение жанра из списка и жанра из карточки
selectGenres.forEach(selectGenre => {
    selectGenre.addEventListener('click', function() {
        let selectGenres = this.textContent;
        allCards.forEach(card => {
            if (genres[card.genre] === selectGenres) {
                showCard(card)
            } else {
                hideCard(card)
            }
        })
    })
})

let selectAuthors = document.querySelectorAll('.selectAuthor'); //
selectAuthors.forEach(selectAuthor => {
    selectAuthor.addEventListener('click', function() {
        let selectedAuthor = this.textContent; //записывает автора на которого кликнули в переменную
        allCards.forEach(card => {
            if (card.author === selectedAuthor) {
                showCard(card);
            } else {
                hideCard(card);
            }
        });
    });
});    