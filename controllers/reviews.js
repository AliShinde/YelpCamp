const Campground = require('../model/campground');
const Review = require('../model/review.js');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const reviews = new Review(req.body.review);
    reviews.author = req.user._id;
    campground.reviews.push(reviews);
    await reviews.save();
    await campground.save();
    req.flash('success', 'Review added successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully');
    res.redirect(`/campgrounds/${id}`);
}