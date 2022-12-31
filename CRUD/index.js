const bookContainer = document.querySelector('#book-container')
const bookURL = `http://localhost:3000/books`
const bookForm = document.querySelector('#book-form')
let editForm = null;
let allBooks = [];

function display() {
    document.addEventListener('DOMContentLoaded', function() {
        // everything else we type will go inside this!!
        fetch(`${bookURL}`)
        .then( response => response.json() )
        .then( bookData => bookData.forEach(function(book) {
            allBooks = bookData
            bookContainer.innerHTML += `
            <div id=${book.id}>
                <h2>${book.title}</h2>
                <h4>Author: ${book.author}</h4>
                <img src="${book.coverImage}" width="333" height="500">
                <p>${book.description}</p>
                <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
                <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
            </div>`
        })) // end of book fetch  
    })
}
 
 bookForm.addEventListener('submit', (e) => {
     console.log("here");
    e.preventDefault()
    // additional functionality goes down here!!
    const titleInput = bookForm.querySelector('#title').value
    const authorInput = bookForm.querySelector('#author').value
    const coverImageInput = bookForm.querySelector('#coverImage').value
    const descInput = bookForm.querySelector('#description').value
    fetch(`${bookURL}`, {
        method: 'POST',
        body: JSON.stringify({
          title: titleInput,
          author: authorInput,
          coverImage: coverImageInput,
          description: descInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then( response => response.json())
    .then( book => {
        bookContainer.innerHTML += `
        <div id=${book.id}>
        <h2>${book.title}</h2>
        <h4>Author: ${book.author}</h4>
        <img src="${book.coverImage}" width="333" height="500">
        <p>${book.description}</p>
        <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
        <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
        </div>`
    })    
})

bookContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {
        const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
        editButton.disabled = true
        const bookData = allBooks.find((book) => {
            return book.id == e.target.dataset.id
        })
        e.target.parentElement.innerHTML += `
      <div id='edit-book'>
        <form id="book-form">
          <input required id="edit-title" placeholder="${bookData.title}">
          <input required id="edit-author" placeholder="${bookData.author}">
          <input required id="edit-coverImage" placeholder="${bookData.coverImage}">
          <input required id="edit-description" placeholder="${bookData.description}">
          <input type="submit" value="Edit Book" onclick="checker()">
      </div>`
      editForm = bookContainer.querySelector('#book-form');
	console.log(bookData)
	console.log('you pressed edit')
    } else if (e.target.dataset.action === 'delete') {
      console.log('you pressed delete')
      var id = e.target.dataset.id;
        e.target.parentElement.remove();
        fetch(`${bookURL}/${e.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( response => response.json())
    }
    display();
}) // end of eventListener for editing and deleting a book

function checker() {
    editForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const bookData = allBooks.find((book) => {
            return book.id == e.target.dataset.id
        })

        var values = {
            "title": document.querySelector("#edit-title").value,
            "author": document.querySelector("#edit-author").value,
            "coverImage": document.querySelector("#edit-coverImage").value,
            "description": document.querySelector("#edit-description").value
        }
        console.log("here2 " + values);
        const editedBook = e.target.parentElement;        
        currId = editedBook.parentElement.id;
        fetch(`${bookURL}/${currId}`, {
            method: 'PATCH',
            body: JSON.stringify(values),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then( response => response.json() )
        .then( book => {
            editedBook.innerHTML = `
            <div id=book-${book.id}>
            <h2>${book.title}</h2>
            <h4>Author: ${book.author}</h4>
            <img src="${book.coverImage}" width="333" height="500">
            <p>${book.description}</p>
            <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
            </div>
            <div id=edit-book-${book.id}>
            </div>`
            editForm.innerHTML = ""
        })
        .catch(err => {
            console.log(err);
        })
    }) // end of this event Listener for edit submit
    display();
}

display();
