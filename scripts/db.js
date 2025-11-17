async function addBooksFromJson() { //добавить книги из json в localStorage
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

//localStorage.clear()