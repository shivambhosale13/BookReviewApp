const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
