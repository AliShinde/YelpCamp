const express = require('express')
const router = express.Router();
const Campground = require('../model/campground');
const asyncWrapper = require('../utils/asyncWrapper');
const { isLoggedIn, isAuthor, validateCampgrounds } = require('../middleware.js');
const campgroundMethods = require('../controllers/campgrounds.js');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });


router.route('/')
    .get(asyncWrapper(campgroundMethods.index))
    .post(isLoggedIn, upload.array('image'), validateCampgrounds, asyncWrapper(campgroundMethods.createCampground));

router.get('/new', isLoggedIn, campgroundMethods.renderNewForm);

router.route('/:id')
    .get(asyncWrapper(campgroundMethods.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampgrounds, asyncWrapper(campgroundMethods.editCampground))
    .delete(isLoggedIn, isAuthor, asyncWrapper(campgroundMethods.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, asyncWrapper(campgroundMethods.renderEditForm))

module.exports = router;