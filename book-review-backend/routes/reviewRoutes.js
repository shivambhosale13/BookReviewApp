const express = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');
const router = express.Router();

// Create a review for a book
router.post('/:bookId', async (req, res) => {
    const { user, rating, comment } = req.body;
    const newReview = new Review({ user, rating, comment, book: req.params.bookId });
    try {
        await newReview.save();
        const book = await Book.findById(req.params.bookId);
        book.reviews.push(newReview);
        // Recalculate average rating
        const averageRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
        book.averageRating = averageRating;
        await book.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a review
router.delete('/:bookId/:reviewId', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        const book = await Book.findById(req.params.bookId);
        book.reviews = book.reviews.filter(review => review.toString() !== req.params.reviewId);
        // Recalculate average rating
        const averageRating = book.reviews.length > 0
            ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
            : 0;
        book.averageRating = averageRating;
        await book.save();
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
