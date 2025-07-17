const Listing=require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");

module.exports.validateListing = (req, res, next) => {
    if (typeof req.file !== "undefined") {
        req.body.listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }    
    const { error } = listingSchema.validate(req.body); // ✅ validate nested object
    if (error) {
        throw new ExpressError(400, error.details[0].message); // ✅ use first error message
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // ✅ validate nested object
    if (error) {
        throw new ExpressError(400, error.details[0].message); // ✅ use first error message
    } else {
        next();
    }
};

module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
       
        req.flash("error","You must be logged in ");
        return res.redirect("/login");
       
        
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
       
         res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id}=req.params;
    let{reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}