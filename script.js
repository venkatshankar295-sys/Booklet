// --- Selectors ---
var overlay = document.querySelector(".overlay")
var popupbox = document.querySelector(".popup-box")
var addbtn = document.querySelector(".add-btn")
var cancelbook = document.getElementById("cancel-book")
var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitleinput = document.getElementById("book-title-input")
var bookauthorinput = document.getElementById("book-author-input")
var bookdescriptioninput = document.getElementById("book-description-input")

// --- Feature 1: Dynamic Search Bar Selector ---
// Make sure to add <input type="text" id="search-bar" placeholder="Search..."> in your HTML!
var searchBar = document.getElementById("search-bar");

// --- Popup Event Listeners ---
function addbutton(event) {
    overlay.style.display = "block"
    popupbox.style.display = "block"
}

cancelbook.addEventListener("click", function (event) {
    event.preventDefault()
    overlay.style.display = "none"
    popupbox.style.display = "none"
})

// --- Feature 2: LocalStorage Database Logic ---
// Load existing books from browser memory when page opens, or start with empty array []
let savedBooks = JSON.parse(localStorage.getItem("myBooklet")) || [];
savedBooks.forEach(book => displayBook(book.title, book.author, book.desc, book.id));

// Helper function to build and render a book to the screen
function displayBook(title, author, desc, id) {
    var div = document.createElement("div")
    div.setAttribute("class", "book-container")
    div.setAttribute("data-id", id); // Unique identifier for deletion
    div.innerHTML = `<h1>${title}</h1>
    <h4>${author}</h4>
    <br>
    <p>${desc}</p>
    <br>
    <button class="one" onclick="deletebook(event)">delete</button>`
    container.append(div)
}

// --- Add Book Event Listener ---
addbook.addEventListener("click", function (event) {
    event.preventDefault()
    
    // Check if inputs are empty before adding
    if(booktitleinput.value === "" || bookauthorinput.value === "") {
        alert("Please enter a title and author!");
        return;
    }

    // 1. Render visually onto screen
    displayBook(booktitleinput.value, bookauthorinput.value, bookdescriptioninput.value, bookId);
    
    // 2. Save book details object into localStorage array
    savedBooks.push({
        id: bookId,
        title: booktitleinput.value,
        author: bookauthorinput.value,
        desc: bookdescriptioninput.value
    });
    localStorage.setItem("myBooklet", JSON.stringify(savedBooks));

    // 3. Clear inputs for next time and hide popup
    booktitleinput.value = "";
    bookauthorinput.value = "";
    bookdescriptioninput.value = "";
    overlay.style.display = "none"
    popupbox.style.display = "none"
})

// --- Delete Book Logic ---
function deletebook(event) {
    var bookDiv = event.target.parentElement;
    var bookId = bookDiv.getAttribute("data-id");

    // Remove from array and update local database
    savedBooks = savedBooks.filter(book => book.id !== bookId);
    localStorage.setItem("myBooklet", JSON.stringify(savedBooks));
    
    // Remove visually from screen
    bookDiv.remove()
}

// --- Live Filtering Logic ---
if (searchBar) {
    searchBar.addEventListener("keyup", function (event) {
        var filterValue = event.target.value.toLowerCase();
        var books = document.querySelectorAll(".book-container");

        books.forEach(function (book) {
            var title = book.querySelector("h1").textContent.toLowerCase();
            var author = book.querySelector("h4").textContent.toLowerCase();

            // If match is found in title OR author, show it. Otherwise, hide it.
            if (title.includes(filterValue) || author.includes(filterValue)) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }
        });
    });
}