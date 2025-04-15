const Listing = require("../models/listing.js");



module.exports.index = async (req,res)=>{
    let allListings = await Listing.find({});
    res.render("./listing/index.ejs",{allListings});

};

module.exports.renderListings = async (req,res)=>{
    res.render("./listing/new.ejs");
};

module.exports.showRoute = async (req,res)=>{
    let {id} = req.params;
    let post = await Listing.findById(id).populate({path:"reviews" , populate:{path:"author"}}).populate("owner");
    if(!post){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
    }
    res.render("./listing/show.ejs",{post});
};


module.exports.createRoute = async (req,res ,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    console.log(listing);
    const newListing = new Listing(listing);
    newListing.image.url = url;
    newListing.image.filename = filename;
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");    
};

module.exports.editRoute = async (req,res)=>{
    let {id} = req.params;
    let post = await Listing.findById(id);
    let previewImgUrl = post.image.url;
    previewImgUrl = previewImgUrl.replace("/upload", "/upload/w_250");
    if(!post){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
    }
    res.render("./listing/edit.ejs",{post , previewImgUrl});
};

module.exports.updateRoute = async (req,res,next)=>{
                         
    let {id} = req.params;
    let post = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        post.image.url = url;
        post.image.filename = filename;
        await post.save();
    }
    req.flash("success"," listing updated");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let post = await Listing.findByIdAndDelete(id);
    console.log(post);
    req.flash("success"," listing  deleted");

    res.redirect(`/listings`);
};