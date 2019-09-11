var express = require('express');
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

// ROOT ROUTE
// landing Page
router.get('/', (req, res) => {
  // res.send("this wii be landing page soon!");
  res.render('landing')
})

//======================
// AUTH ROUTES
//======================

// show  register form
router.get('/register', (req, res) => {
  res.render("register");
});
// handle sign up logic
router.post('/register', (req, res) => {
  var newUser= new User({username:req.body.username})
  User.register(newUser,req.body.password,function (err,user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req,res,function () {
        res.redirect("/campgrounds");
      })
  })
});
// show login form
router.get('/login', (req, res) => {
  res.render("login");
});
// handeling login logic
router.post('/login',passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}), (req, res) => {

});
// logout Route
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/campgrounds');
});
// middleware
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated() ){
    return next()
  }
  res.redirect('/login');
}

module.exports=router;