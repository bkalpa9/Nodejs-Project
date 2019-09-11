var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground=require('./models/campground'),
  seedDB=require('./seeds');

mongoose.connect('mongodb://localhost/nepal_camp_v4');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')
seedDB();

// landing Page
app.get('/', (req, res) => {
  // res.send("this wii be landing page soon!");
  res.render('landing')
})
// campgrounds
// INDEX -- show all campgrounds
app.get('/campgrounds', (req, res) => {
// Get all campgrounds from DB
  Campground.find({}, function (err, allcampgrounds) {
    if (err) {
      console.log(err)
    } else {
        // redirect back to campgrounds page
      res.render('index', {campgrounds: allcampgrounds})
    }
  })
  // // res.render("campgrounds", {
  //   campgrounds: campgrounds
  // });
})
// Create -- new campground to database
app.post('/campgrounds', (req, res) => {
  // res.send("YOU HIT THE THE POST ROUTE!");
  // get data from form and add to campgroungs array
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = {
    name: name,
    image: image,
    description:desc
  }
  // create a new campground and save to database
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
  // campgrounds.push(newCampground);
  //  redirect back to campground page
  res.redirect('/campgrounds')
})
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs')
})
// SHOW -- shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render('show', {campground: foundCampground})
    }
  })
})
app.listen(3333, function () {
  console.log(` The YelpCamp Server Started on port: ${3333}`)
})
