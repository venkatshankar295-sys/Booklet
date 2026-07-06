//selecting popup box overlay button
var overlay = document.querySelector(".overlay")
var popupbox = document.querySelector(".popup-box")
var addbtn = document.querySelector(".add-btn")
function addbutton(event) {
    overlay.style.display = "block"
    popupbox.style.display = "block"
}

//selecting cancel book
var cancelbook = document.getElementById("cancel-book")
cancelbook.addEventListener("click", function (event) {
    event.preventDefault()
    overlay.style.display = "none"
    popupbox.style.display = "none"
})

//select container addbook booktitleinput bookauthorinput bookdescriptioninput
var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitleinput = document.getElementById("book-title-input")
var bookauthorinput = document.getElementById("book-author-input")
var bookdescriptioninput = document.getElementById("book-description-input")


addbook.addEventListener("click", function () {
    event.preventDefault()
    var div = document.createElement("div")
    div.setAttribute("class", "book-container")
    div.innerHTML = `<h1>${booktitleinput.value}<h1>
    <h4>${bookauthorinput.value}</h4>
    <br>
    <p>${bookdescriptioninput.value}</p>
    <br>
     <button class="one" onclick="deletebook(event)">delete</button>`
    container.append(div)
    overlay.style.display = "none"
    popupbox.style.display = "none"
})

function deletebook(event) {
    event.target.parentElement.remove()
}