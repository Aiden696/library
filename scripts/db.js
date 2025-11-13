async function addAllBooks() { //добавить книги из json в localStorage
    if (!localStorage.getItem('allBooks')) {
        try {
            let response = await fetch ('books.json');
            let data = await response.json()
            localStorage.setItem('allBooks', JSON.stringify(data));
        } catch {
            console.log('error')
        }
    }
}

export default function getAllBooks() { //взять книги из localStorage 
    try {
        let localStorageBooks = localStorage.getItem('allBooks')
        if (localStorageBooks) {
            return JSON.parse(localStorageBooks)
        } else {
            return []; //что бы не ломался forEach
        }
    } catch {
        console.log('error')
    }
}

addAllBooks()

//localStorage.clear()
