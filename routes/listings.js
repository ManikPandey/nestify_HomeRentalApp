const express = require("express");
const router = express.Router();
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingsController = require("../controller/listingsController.js");
const wrapAsync = require("../utils/wrapAsync.js");
require('dotenv').config();
const multer  = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingsController.index ))
.post(isLoggedIn, upload.single("listing[image][url]"),validateListing,wrapAsync(listingsController.createRoute));
// .post(upload.single("listing[image][url]") , (req,res)=>{
//     res.send(req.file);
// } );

//  index route
// new route


router.get("/new", isLoggedIn  ,wrapAsync (listingsController.renderListings));



router.route("/:id")
.get(wrapAsync(listingsController.showRoute))
.put( isOwner,upload.single("listing[image][url]"),validateListing, isOwner, wrapAsync(listingsController.updateRoute))
.delete(isLoggedIn, isOwner,wrapAsync(listingsController.destroyListing));
// show route


// create route


// edit route
router.get("/:id/edit", isLoggedIn ,isOwner,wrapAsync(listingsController.editRoute));


// update route


// delete / destroy route

module.exports = router;