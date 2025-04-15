const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");


module.exports.postReview = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newRewiew = new Review (req.body.review);
    newRewiew.author = req.user._id;
    await newRewiew.save();
    listing.reviews.push(newRewiew);
    let result = await listing.save();

    // console.log("working");
    // res.send("working");
    // console.log(req.body.review);
    req.flash("success","new Review created");
    res.redirect(`/listings/${id}`);

};
module.exports.destroyReview = async (req, res)=>{
    let {id , reviewID} = req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewID}} );
    await Review.findByIdAndDelete(reviewID);
    req.flash("success"," Review updated");
    res.redirect(`/listings/${id}`);
};
