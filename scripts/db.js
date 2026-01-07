async function addBooksFromJson() { //добавить книги из json в localStorage
    if (!localStorage.getItem('allBooks')) {
        try {
            let response = await fetch('./books.json'); //запрашивает данные
            let books = await response.json(); //парсит
            let verifiedBooks = []; //массив проверенных книг
            
            books.forEach(book => {
                if (addBook(book)) { //каждой книге присваевается функция addBook() для проверки
                    verifiedBooks.push(book) //если книга прошла проверку она доб. в массив verifiedBooks
                } else {
                    console.log("В книге не хватает элемента");
                }
            });
            localStorage.setItem('allBooks', JSON.stringify(verifiedBooks)); //преобразует массив в json и сохранияет его в localStorage
            console.log(verifiedBooks.length)
            return verifiedBooks;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('Книги уже есть в localStorage');
    }
}

export async function getAllBooks() { //взять книги из localStorage 
    try {
        if (!localStorage.getItem('allBooks')) {
            await addBooksFromJson();
        }
        let localStorageBooks = localStorage.getItem('allBooks');
        if (localStorageBooks) {
            return JSON.parse(localStorageBooks)
        }
    } catch {
        console.log('error')
    }
    return []
}

getAllBooks().then(books => { //then ждет пока книги загрузятся из getAllBooks()
    //console.log('Все книги из localStorage:', books);
});

async function addGenresFromJson() { //добавить книги из json в localStorage
    if (!localStorage.getItem('allGenres')) {
        try {
            let response = await fetch ('genres.json');
            let data = await response.json()
            localStorage.setItem('allGenres', JSON.stringify(data));
        } catch {
            console.log('error')
        }
    }
}

export async function getAllGenres() { //взять книги из localStorage 
    try {
        if (!localStorage.getItem('allGenres')) {
            await addGenresFromJson();
        }
        let localStorageGenres = localStorage.getItem('allGenres');
        if (localStorageGenres) {
            return JSON.parse(localStorageGenres)
        }
    } catch {
        console.log('error')
    }
    return []
}

export function addBook(book) {
    let elementsOfBooks = ['title', 'author', 'description', 'genre_id', 'cover'];
    
    for (let element of elementsOfBooks) {
        if (!(element in book)) {
            console.log(`Отсутствует: ${element}`)
            return false;
        }
    };

    //title
    
    if (typeof book.title !== 'string') { //typeof оператор, который возвращает строку указывающую тип операнда
        console.log('title должен быть строкой');
        return false;
    }

    let title = book.title.trim();
        
    if (title.length === 0) {
        console.log('title не может быть пустым');
        return false;
    }

    //author

    if (typeof book.author !== 'string') {
        console.log('author должен быть строкой');
        return false;
    }

    let author = book.author.trim();

    if (author.length === 0) {
        console.log('author не может быть пустым');
        return false;
    }

    //description

    if (typeof book.description !== 'string') {
        console.log('description должен быть строкой');
        return false;
    }

    let description = book.description.trim();

    if (description.length === 0) {
        console.log('description не может быть пустым');
        return false;
    }

    if (description.length < 10) {
        console.log('description не может менее 10 символов');
        return false;
    }

    return true;
}

addBooksFromJson()

//localStorage.clear()