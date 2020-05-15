
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
    clearForm();
    closeForm();
    render();
});

close_button.addEventListener("click", closeForm);

function parseFormInfo() {
    let newBook = new Book(title_input.value, author_input.value, pages_input.value, status_input.checked);
    addBookToLibrary(newBook);
}

function clearForm() {
    let inputs = Array.from(document.querySelectorAll(".form-container div input"));
    inputs.forEach(input => {
        input.checked = false;
        if (input.value !== "") {
            input.value = "";
        }
    });
}

function closeForm() {
    add_book_form.classList.remove("active");
    library_container.classList.remove("blur");
    library_name.classList.remove("blur");
    document.body.style.backgroundColor = "white";
}

add_book_button.addEventListener("click", () => {
    add_book_form.classList.add("active");
    library_container.classList.add("blur");
    library_name.classList.add("blur");
    document.body.style.backgroundColor = "#c9c9c9";
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

            let remove_btn = document.createElement("div");
            remove_btn.classList.add("remove-button");
            remove_btn.innerHTML = "X";

            remove_btn.addEventListener("click", () => {
                for (let i = 0; i < library.length; i++) {
                    if (library[i].title === event.target.parentElement.children[2].innerHTML) {
                        event.target.parentElement.parentElement.removeChild(event.target.parentElement);
                        library.splice(i, 1);
                    }
                }
                render();
            });

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
            more_info.innerHTML = book.pages + "&nbsp;pages&nbsp;&nbsp;&nbsp;";

            let status_indicator = document.createElement("div");
            status_indicator.classList.add("status-indicator");
            if (book.isRead) {
                status_indicator.innerHTML = "finished";
                status_indicator.style.backgroundColor = "#4BCA81";
            } else {
                status_indicator.innerHTML = "in&nbsp;progress";
                status_indicator.style.backgroundColor = "rgb(255, 169, 169)";
            }

            status_indicator.addEventListener("click", () => {
                if (event.target.innerHTML === "finished") {
                    event.target.innerHTML = "in&nbsp;progress";
                    event.target.style.backgroundColor = "rgb(255, 169, 169)";
                } else {
                    event.target.innerHTML = "finished";
                    event.target.style.backgroundColor = "#4BCA81";
                }
            });

            more_info.appendChild(status_indicator);

            new_book.appendChild(remove_btn);
            new_book.appendChild(binding);
            new_book.appendChild(title);
            new_book.appendChild(author);
            new_book.appendChild(more_info);

            library_container.insertBefore(new_book, add_book_button);
            book.rendered = true;
        }
    }
}