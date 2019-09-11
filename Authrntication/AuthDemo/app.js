var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  User=require('./models/user'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/auth_demo_app')

var app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
  secret: "I will be Mystic",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//===========================================
// ROUTES
//===========================================
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/secret',isLoggedIn, (req, res) => {
  res.render('secret')
})
// ======================================
// AUTH ROUTES
// ======================================
// show sign up form
app.get('/register', (req, res) => {
   res.render("register");

});
// handeling sign up form
app.post('/register', (req, res) => {
//  res.send("register post route");
req.body.username
req.body.password
User.register(new User({username:req.body.username}),req.body.password,function (err, user) {
  if (err) {
    console.log(err);
    return res.render('register')
  }
  passport.authenticate("local")(req,res, function ( ) {
    res.redirect('/secret');
  })
})
});
// LOGIN ROUTES
// render login form
app.get('/login', (req, res) => {
  res.render("login");
});
// login logic
app.post('/login',passport.authenticate("local",{
  successRedirect:"/secret",
  failureRedirect:"/login"
}) ,(req, res) => {

});
// Logout route
app.get('/logout', (req, res) => {
  // res.send("OK, I WILL LOG YOU OUT.   ..not yet though");
  req.logout()
  res.redirect('/');
});
//==================================
// MIDDLE WARE
//==================================
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login');
}



app.listen(3333, function () {
  console.log(`Server Starts on 3333`)
})
