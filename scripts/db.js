async function addAllBooks() { //добавить книги из json в localStorage
    if (localStorage.length === 0) {
        try {
            let response = await fetch ('books.json');
            let data = await response.json()
            localStorage.setItem('allBooks', JSON.stringify(data));
        } catch {
            console.log('error')
        }
    }
}
addAllBooks()

function getAllBooks() { //взять книги из localStorage 
    try {
        let localStorageBooks = localStorage.getItem('allBooks')
        return JSON.parse(localStorageBooks)
    } catch {
        console.log('error')
    }
}

function displayBooks() {
    let sectionOfBooks = document.getElementById('cards')
    let books = getAllBooks();

    let showBooks = books.map(book => 
        book.title
    )
    sectionOfBooks.innerHTML = showBooks;
}

displayBooks()

//localStorage.clear()

