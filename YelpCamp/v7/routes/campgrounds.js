var express = require('express');
var router=express.Router();
var Campground=require("../models/campground")
// campgrounds
// INDEX -- show all campgrounds
router.get('/', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allcampgrounds) {
    if (err) {
      console.log(err)
    } else {
      // redirect back to campgrounds page
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,currentUser:req.user
      })
    }
  })
  // // res.render("campgrounds", {
  //   campgrounds: campgrounds
  // });
})
// Create -- new campground to database
router.post('/', (req, res) => {
  // res.send("YOU HIT THE THE POST ROUTE!");
  // get data from form and add to campgroungs array
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = {
    name: name,
    image: image,
    description: desc
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
// NEW - show from to create new campground
router.get('/new', (req, res) => {
  res.render('campgrounds/new')
})
// SHOW -- shows more info about one campground
router.get('/:id', (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground)
      // render show template with that campground
      res.render('campgrounds/show', {
        campground: foundCampground
      })
    }
  })
})

module.exports=router;