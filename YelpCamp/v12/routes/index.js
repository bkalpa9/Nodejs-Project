var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        avatar:req.body.avatar,
        
    });

    if(req.body.adminCode==="i am bkalpa@tmystics.np"){
        newUser.isAdmin=true;
     }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to VisitNepal "+ user.username)
            res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged you out, See you later...");
   res.redirect("/campgrounds");
});

// User PROFILE
router.get("/users/:id",function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            req.flash("error","Something went wrong!");
            return res.redirect("/");
        }
            Campground.find().where("aurhor.id").equals(foundUser._id).exec(function(err, campgrounds){
              if (err) {
            req.flash("error","Something went wrong!");
            res.redirect("/")
              }
              res.render("users/show",{user:foundUser,campgrounds:campgrounds});
            });
    });
});
// Sanitize route
router.post('/', function(req, res, next) {
  // replace an HTTP posted body property with the sanitized string
  req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
  // send the response
  res.send('Your value was sanitized to: ' + req.body.sanitized);
});

module.exports = router;