const User = require("../models/user.js");

module.exports.signupRoute = async (req, res)=>{
    try{
        let{username , email , password} = req.body;
        const newUser = new User({
            username , email
        }); 
        const reqisteredUser = await User.register(newUser , password);
        console.log(reqisteredUser);
        req.login(reqisteredUser, (err) =>{
            if(err){
                 return next(err);
            }
            req.flash("success" , "New user registered successfully!!");
            res.redirect("/listings");
         });
        
    }catch(e){
        req.flash("error", `error ${e.message}`);
        res.redirect("/listings");
    }
};
module.exports.postLoginRoute = async (req,res)=>{
    req.flash("success" , "Welcome back to wanderlust!!")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

};
module.exports.logoutRoute = (req, res,next)=>{
    req.logout((err) =>{
       if(err){
            return next(err);
       }
    
        req.flash("success" , "logged out successfully")
    
        res.redirect("/listings");
    })
};
