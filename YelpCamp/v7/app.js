var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user');
seedDB = require('./seeds');
// requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index")


mongoose.connect('mongodb://localhost/nepal_camp_v6');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();
// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "I am not mystic Yet",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passing middleware to all routes
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next()
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3333, function () {
  console.log(` The YelpCamp Server Started on port: ${3333}`)
});