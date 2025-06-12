const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book storage
let books = [];
let nextId = 1;

// Create a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required.' });
    }

    const book = { id: nextId++, title, author };
    books.push(book);
    res.status(201).json(book);
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    res.json(book);
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    books.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Book API server is running at http://localhost:${PORT}`);
});
