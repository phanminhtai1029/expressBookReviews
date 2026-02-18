const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let booksByAuthor = [];
  // Get all the keys for the 'books' object
  let bookKeys = Object.keys(books);
  // Iterate through the books array & check if the author matches
  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });
  res.send(JSON.stringify(booksByAuthor, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];
  // Get all the keys for the 'books' object
  let bookKeys = Object.keys(books);
  // Iterate through the books array & check if the title matches
  bookKeys.forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });
  res.send(JSON.stringify(booksByTitle, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// Task 10: Get all books using async-await
public_users.get('/async', async function (req, res) {
  try {
    // Simulate async operation by wrapping in Promise
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    
    const booksList = await getBooks;
    res.send(JSON.stringify(booksList, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error fetching books", error: error.message});
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn-async/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Using Promise to get book details
  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject(new Error("Book not found"));
    }
  });

  getBookByISBN
    .then(book => res.send(JSON.stringify(book, null, 4)))
    .catch(error => res.status(404).json({message: error.message}));
});

// Task 12: Get book details based on Author using async-await
public_users.get('/author-async/:author', async function (req, res) {
  try {
    const author = req.params.author;
    
    // Simulate async operation
    const getBooksByAuthor = new Promise((resolve, reject) => {
      let booksByAuthor = [];
      let bookKeys = Object.keys(books);
      
      bookKeys.forEach(key => {
        if (books[key].author === author) {
          booksByAuthor.push(books[key]);
        }
      });
      
      if (booksByAuthor.length > 0) {
        resolve(booksByAuthor);
      } else {
        reject(new Error("No books found by this author"));
      }
    });

    const booksList = await getBooksByAuthor;
    res.send(JSON.stringify(booksList, null, 4));
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// Task 13: Get book details based on Title using Promises
public_users.get('/title-async/:title', function (req, res) {
  const title = req.params.title;
  
  // Using Promise to get books by title
  const getBooksByTitle = new Promise((resolve, reject) => {
    let booksByTitle = [];
    let bookKeys = Object.keys(books);
    
    bookKeys.forEach(key => {
      if (books[key].title === title) {
        booksByTitle.push(books[key]);
      }
    });
    
    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject(new Error("No books found with this title"));
    }
  });

  getBooksByTitle
    .then(books => res.send(JSON.stringify(books, null, 4)))
    .catch(error => res.status(404).json({message: error.message}));
});

module.exports.general = public_users;
