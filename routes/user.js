const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controller/userController.js");


router.get("/signup",  (req,res)=>{
    res.render("./users/signup.ejs");
})

router.post("/signup" , wrapAsync(userController.signupRoute ));

router.get("/login", (req, res)=>{
    res.render("./users/login.ejs");
})

router.post("/login",saveRedirectUrl ,passport.authenticate("local", {failureRedirect: "/login" , failureFlash:true}) , userController.postLoginRoute);

router.get("/logout", userController.logoutRoute )


module.exports = router;

