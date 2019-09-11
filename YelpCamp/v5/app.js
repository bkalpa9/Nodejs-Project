var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  seedDB = require('./seeds')

mongoose.connect('mongodb://localhost/nepal_camp_v5')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
seedDB()

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
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds
      })
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
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})
// SHOW -- shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
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
// ==================================================
// COMMENTS ROUTES
// ==================================================
app.get('/campgrounds/:id/comments/new', (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', {
        campground: campground
      })
    }
  })
})
app.post('/campgrounds/:id/comments', (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment)
          campground.save()
          campground.comments.push(comment._id)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
          // console.log(req.body.comment);
        }
      })
    }
  })
  // create new comment
  // connnect new connect to campground
  // redirect campground to show page
})

app.listen(3333, function () {
  console.log(` The YelpCamp Server Started on port: ${3333}`)
})
