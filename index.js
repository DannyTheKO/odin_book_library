const myLibBookDiv = document.querySelector(`div#myLibBookContainer`)
const dialogForm = document.querySelector(`#dialogForm`)
const openDialogForm = document.querySelector(`#openDialogForm`)
const closeDialogForm = document.querySelector(`#closeDialogForm`)

const titleBook = document.querySelector(`#titleBook`)
const authorBook = document.querySelector(`#authorBook`)
const pageBook = document.querySelector(`#pageBook`)

openDialogForm.addEventListener("click", () => {
    dialogForm.showModal()
})

closeDialogForm.addEventListener("click", () => {
    dialogForm.close();
})

const myLibrary = [];

/**
 * Book Object Constructor
 * @param id
 * @param title
 * @param author
 * @param page
 * @param hasRead
 * @constructor
 */
function Book(id, title, author, page, hasRead) {
    // Prevent stuff... idk
    if(!new.target) {
        return `Must use new to create a new object!`
    }

    this.id = id
    this.title = title;
    this.author = author;
    this.page = page;
    this.hasRead = hasRead;
}

Book.prototype.proto_hasReadToggle = function () {
    this.hasRead = !this.hasRead;
}

function toggleHasRead(id) {
    const index = myLibrary.findIndex(book => book.id === id)
    if (index !== -1) {
        myLibrary[index].proto_hasReadToggle()
    }
    myLibraryDisplay();
}

/**
 * Add Book
 *
 * this is for seeding purpose
 * @param title
 * @param author
 * @param page
 * @param hasRead
 */
function addBook(title, author, page, hasRead = false) {
    const newBook = new Book(
        crypto.randomUUID(), // Unique ID
        title,
        author,
        page,
        hasRead
    )

    myLibrary.push(newBook)
}

/**
 * Add Book Action
 *
 * This is for the selection and reset input tag
 * has addBook() function innit
 */
function addBookAction() {
    const hasReadCheckBox = document.querySelector(`input#hasRead`).checked
    addBook(titleBook.value, authorBook.value, pageBook.value, hasReadCheckBox)
    myLibraryDisplay();
    dialogForm.close();

    titleBook.value = ``;
    authorBook.value = ``;
    pageBook.value = ``;
}

/**
 * Delete Book
 * @param id
 */
function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    myLibraryDisplay();
}

/**
 * Render Library
 *
 * This will render and read properties of the book
 * inside myLibrary[Book] array
 */
function myLibraryDisplay() {
    while(myLibBookDiv.firstChild) {
        myLibBookDiv.firstChild.remove()
    }

    myLibrary.forEach(book => {
        const divBook = document.createElement("div")
        divBook.className = "book";
        divBook.dataset["bookId"] = book.id;

        const bookTitle = document.createElement("h3")
        bookTitle.textContent = book.title.toLocaleUpperCase();
        bookTitle.style.height = "70px";

        const bookPage = document.createElement("h3")
        bookPage.textContent = `${book.page} pages`

        const bookHasRead = document.createElement("h3")
        if (book.hasRead) {
            bookHasRead.textContent = "Has read"
            divBook.style.backgroundColor = "lightgreen"
        } else  {
            bookHasRead.textContent = "Hasn't read"
            divBook.style.backgroundColor = "lightgray"
        }

        const bookAuthor = document.createElement("h4")
        bookAuthor.textContent = `- ${book.author}`;

        const bookOption = document.createElement("div")
        bookOption.style.display = "flex"
        bookOption.style.gap = "16px"
        bookOption.style.justifyContent = "space-between"
        bookOption.style.alignItems = "center"

        const bookDeleteOption = document.createElement("button")
        bookDeleteOption.textContent = "Delete";
        bookDeleteOption.addEventListener('click', () => deleteBook(divBook.dataset["bookId"]));

        const bookHasReadOption = document.createElement("button")
        if (book.hasRead) {
            bookHasReadOption.textContent = "Mark as unread"
        } else {
            bookHasReadOption.textContent = "Mark as read"
        }
        bookHasReadOption.addEventListener('click', () => {
            toggleHasRead(divBook.dataset["bookId"])
        })

        divBook.appendChild(bookTitle)
        divBook.appendChild(bookPage)
        divBook.appendChild(bookHasRead)
        divBook.appendChild(bookAuthor)

        bookOption.appendChild(bookHasReadOption)
        bookOption.appendChild(bookDeleteOption)
        divBook.appendChild(bookOption)

        myLibBookDiv.appendChild(divBook);
    })
}

// Seeding
addBook("Funny Book", "Conan O'Brien", 153);
addBook("Another Funny Book", "Conan O'Brien", 153);
addBook("And Another Funny Book", "Conan O'Brien", 153, true);
addBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 224, true);
addBook("Pride and Prejudice", "Jane Austen", 432);
addBook("1984", "George Orwell", 328, true);
addBook("The Lord of the Rings", "J.R.R. Tolkien", 1178);
addBook("To Kill a Mockingbird", "Harper Lee", 281);
addBook("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBook("One Hundred Years of Solitude", "Gabriel García Márquez", 417);
addBook("Moby Dick", "Herman Melville", 378, true);
addBook("Don Quixote", "Miguel de Cervantes", 1000);
addBook("Hamlet", "William Shakespeare", 400);
addBook("The Odyssey", "Homer", 384);
addBook("Crime and Punishment", "Fyodor Dostoevsky", 551);
addBook("The Catcher in the Rye", "J.D. Salinger", 224);
addBook("Invisible Man", "Ralph Ellison", 581);
addBook("The Handmaid's Tale", "Margaret Atwood", 311);
addBook("Beloved", "Toni Morrison", 275);
addBook("Things Fall Apart", "Chinua Achebe", 209);
addBook("One Flew Over the Cuckoo's Nest", "Ken Kesey", 320);

myLibraryDisplay();
console.table(myLibrary)

// console.table(myLibrary)