const apiKey = 'AIzaSyDD_6VcNqR5GtVCOas7DRooPXOnQkjkVjs';
const searchTerm = 'harry potter'; // Example search term


// Make a GET request to the Google Books API
fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

// Add event listener to the search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSearch);

// Function to handle search form submission
function handleSearch(event) {
  event.preventDefault();

  // Get the user's search query from the input field
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value;

  // Make API request to search for books
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and update the DOM with search results
      displaySearchResults(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the API request
      console.error('Error:', error);
    });

  // Reset the search input field
  searchInput.value = '';
}

// Function to display search results in the DOM
function displaySearchResults(data) {
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = '';

  // Iterate through the API response and generate HTML for each book
  data.items.forEach(book => {
    const bookItem = document.createElement('li');
    bookItem.textContent = book.volumeInfo.title;
    bookItem.setAttribute('data-book-id', book.id); // Set a data attribute for book ID
    bookItem.addEventListener('click', handleBookSelection); // Add event listener for book selection
    resultsList.appendChild(bookItem);
  });
}

// Function to handle book selection
function handleBookSelection(event) {
  const selectedBookId = event.target.getAttribute('data-book-id');
  if (selectedBookId) {
    // Perform actions based on the selected book ID
    borrowBook(selectedBookId);
  }
}

// Function to borrow a book
function borrowBook(bookId) {
  // Make an API request to borrow the book
  fetch(`API_URL/borrow/${bookId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include any necessary authorization headers
    },
    // Include any necessary request body data
  })
    .then(response => response.json())
    .then(data => {
      // Update the user's library account on the client-side
      updateAccount(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to update the user's library account
function updateAccount(data) {
  // Update the DOM to reflect the changes in the user's borrowed books
  const borrowedBooksList = document.getElementById('borrowed-books');
  const bookItem = document.createElement('li');
  bookItem.textContent = data.bookTitle;
  borrowedBooksList.appendChild(bookItem);
}

// Add event listeners to the borrow and return buttons
const borrowButton = document.getElementById('borrow-button');
const returnButton = document.getElementById('return-button');
borrowButton.addEventListener('click', handleBorrow);
returnButton.addEventListener('click', handleReturn);

// Function to handle borrowing a book
function handleBorrow(event) {
  // Retrieve the book information and book ID from the DOM
  const selectedBookId = document.getElementById('selected-book-id').value;
  const selectedBookTitle = document.getElementById('selected-book-title').textContent;
  // Make the API request to borrow the book
  borrowBook(selectedBookId);
}

// Function to handle returning a book
function handleReturn(event) {
  // Retrieve the book information and book ID from the DOM
  const selectedBookId = document.getElementById('selected-book-id').value;
  const selectedBookTitle = document.getElementById('selected-book-title').textContent;
  // Make the API request to return the book
  returnBook(selectedBookId);
}

// Function to return a book
function returnBook(bookId) {
  // Make an API request to return the book
  fetch(`API_URL/return/${bookId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include any necessary authorization headers
    },
    // Include any necessary request body data
  })
    .then(response => response.json())
    .then(data => {
      // Update the user's library account on the client-side
      updateAccount(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



