const Listing = require("./models/listing.js");
const errorExpress = require("./utils/ErrorExpress.js");
const { reviewSchema} = require("./schema.js");
const {listingSchema } = require("./schema.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated() ){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in for this functionality ");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res, next)=>{
    let {id} = req.params;
    let post = await Listing.findById(id);
    if(!post.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "Not authorizied to perform this action");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        // console.log(error);
        throw new errorExpress(400,errMsg);
        
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let {error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new errorExpress(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res, next)=>{
    let {id , reviewID} = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "Not authorizied to perform this action on review");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}