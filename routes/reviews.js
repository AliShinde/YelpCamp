const express = require('express')
const router = express.Router({ mergeParams: true });

const Campground = require('../model/campground');
const Review = require('../model/review.js');
const asyncWrapper = require('../utils/asyncWrapper');
const { validateReviews, isLoggedIn, isReviewAuthor } = require('../middleware.js');

const reviewMethods = require('../controllers/reviews.js');

router.post('/', isLoggedIn, validateReviews, asyncWrapper(reviewMethods.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, asyncWrapper(reviewMethods.deleteReview))

module.exports = router;
