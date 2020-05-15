
let add_book_form = document.querySelector(".form-container");
let library_container = document.querySelector("#library-container");
let add_book_button = document.querySelector("#add-book");

let library_name = document.querySelector(".library-name");

let submit_button = document.querySelector("#submit-button");
let close_button = document.querySelector("#close-button");

let title_input = document.querySelector("#title-input");
let author_input = document.querySelector("#author-input");
let pages_input = document.querySelector("#pages-input");
let status_input = document.querySelector("#status-input");

submit_button.addEventListener("click", () => {
    parseFormInfo();
    closeForm();
    render();
});

close_button.addEventListener("click", closeForm);

function parseFormInfo() {
    let newBook = new Book(title_input.value, author_input.value, pages_input.value, status_input.checked);
    addBookToLibrary(newBook);
}

function closeForm() {
    add_book_form.classList.remove("active");
    library_container.classList.remove("blur");
    library_name.classList.remove("blur");
}

add_book_button.addEventListener("click", () => {
    add_book_form.classList.add("active");
    library_container.classList.add("blur");
    library_name.classList.add("blur");
});



let library = [];
let binding_colors = ["#264653", "#6d6875", "#cb997e", "#354f52"];
let cover_colors = ["#fbc4ab", "#b8bedd", "#e9c46a", "#f9dcc4"];


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.rendered = false;
}

Book.prototype.info = function () {
    let read = this.isRead ? "finished" : "not read yet";
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
}

function addBookToLibrary(book) {
    if (!(book instanceof Book)) throw "Must add object of type Book to library";
    library.push(book);
}

function render() {
    console.log(library.toString());
    for (let i = 0; i < library.length; i++) {
        let book = library[i];
        if (!book.rendered) {

            let new_book = document.createElement("div");
            new_book.classList.add("book");
            new_book.style.backgroundColor = cover_colors[Math.floor(Math.random() * cover_colors.length)];

            let binding = document.createElement("div");
            binding.classList.add("binding");
            binding.innerHTML = "&nbsp;";
            binding.style.backgroundColor = binding_colors[Math.floor(Math.random() * binding_colors.length)];

            let title = document.createElement("div");
            title.classList.add("title");
            title.innerHTML = book.title;

            let author = document.createElement("div");
            author.classList.add("author");
            author.innerHTML = "By " + book.author;

            let more_info = document.createElement("div");
            more_info.classList.add("more-info");
            more_info.innerHTML = book.isRead ? book.pages + " pages (finished)" : book.pages + " pages";

            new_book.appendChild(binding);
            new_book.appendChild(title);
            new_book.appendChild(author);
            new_book.appendChild(more_info);

            library_container.insertBefore(new_book, add_book_button);
            book.rendered=true;
        }
    }
}