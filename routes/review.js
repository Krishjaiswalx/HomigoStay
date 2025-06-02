const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware/auth.js");
const reviewController = require("../controllers/review.js");

//reviews post
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.review));

//delete reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.reviewDelete));

module.exports = router;