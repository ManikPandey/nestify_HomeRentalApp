const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const errorExpress = require("./utils/ErrorExpress.js");
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");
const wrapAsync = require("./utils/wrapAsync.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require('passport-local-mongoose');
const User = require("./models/user.js");
const listingsRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")
const {isLoggedIn} = require("./middleware.js");
const multer  = require("multer");
const uploads = multer({dest:"uploads/"});
require('dotenv').config();
const atlasUrl = process.env.ATLAS_CONNECTURL;
const mongooseurl = 'mongodb://127.0.0.1:27017/wanderlust';
const MongoStore = require('connect-mongo');

const secret = process.env.SECRET;


const store = MongoStore.create({
    mongoUrl: atlasUrl,
    crypto: {
      secret: secret,
    },
    touchAfter: 24*60*60,

  });

store.on("error" , ()=>{
    console.log("error in mongodb session store ", err);
});
const sessionoptions = {
    store:store,
    secret: secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}
app.use(session(sessionoptions));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// demo  user 

app.get("/demouser" , async( req,res)=>{
    let demoUser = new User({
        email: "demo@123",
        username: "demouser123",
    });
    let reqisteredUser = await User.register(demoUser, "demo@123" );
    console.log(reqisteredUser);
    res.send(reqisteredUser);
})




app.use(methodOverride('_method'));

const port = 8080;

app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));

main().then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(atlasUrl);
}


app.engine('ejs', ejsMate);

// app.get("/",(req,res)=>{
//     res.send("connected to root page");
// })

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings" , listingsRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", userRouter);


// page not found 
app.get("*"  ,(req,res,next)=>{
    let err = new errorExpress(404 ,"Page not found");
    next(err);
})

// middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = "Something went Wrong!! try again" } = err;
    res.status(statusCode).render("./listing/error.ejs",{message});
})


// localhost connection
app.listen(port,(req,res)=>{
    console.log(`listning to port: ${port}`);
})




// app.get("/testing",async (req,res)=>{
//     let sampletesting = new Listing({
//         title: "my new villa",
//         description: "this is my himalayan view villa",
//         price: 10000,
//         location: "Pithoraghar",
//         country: "india"
//     })
//     await sampletesting.save();
//     res.send("successful");
// })
