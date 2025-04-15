const express = require("express");
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");

const reviewController = require("../controller/reviewcontroller.js");

// validate 


// Review routs
// post route to add reviw
router.post("/", isLoggedIn ,validateReview,wrapAsync(reviewController.postReview));
// delete route of review
router.delete("/:reviewID" ,isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.destroyReview));

module.exports = router;


