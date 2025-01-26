const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    const { title, author, description } = req.body;
    const newBook = new Book({ title, author, description });
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('reviews');
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
