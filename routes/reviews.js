const express=require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpresError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Review=require("../models/review.js");
const {reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const{validateReview}=require("../middleware.js");
const{isLoggedIn}=require("../middleware.js");
const{isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//post review Route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview));
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;