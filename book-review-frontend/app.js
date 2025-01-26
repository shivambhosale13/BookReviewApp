angular.module('bookReviewApp', [])
    .controller('bookController', function($scope, $http) {

        // Fetch all books
        $http.get('http://localhost:3000/api/books')
            .then(function(response) {
                $scope.books = response.data;
            });

        // Add new book
        $scope.addBook = function() {
            $http.post('http://localhost:3000/api/books', $scope.newBook)
                .then(function(response) {
                    $scope.books.push(response.data);
                    $scope.newBook = {};  // Reset form
                });
        };

        // Add a review to a book
        $scope.addReview = function(bookId) {
            $http.post(`http://localhost:3000/api/reviews/${bookId}`, $scope.review)
                .then(function(response) {
                    const book = $scope.books.find(b => b._id === bookId);
                    book.reviews.push(response.data);
                    $scope.review = {};  // Reset form
                });
        };

        // Delete a review
        $scope.deleteReview = function(bookId, reviewId) {
            $http.delete(`http://localhost:3000/api/reviews/${bookId}/${reviewId}`)
                .then(function(response) {
                    const book = $scope.books.find(b => b._id === bookId);
                    book.reviews = book.reviews.filter(r => r._id !== reviewId);
                });
        };
    });
