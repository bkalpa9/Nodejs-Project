var express = require('express');
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");

// Comments new
router.get('/new',isLoggedIn,(req, res) => {
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
// Comments create
router.post('/', (req, res) => {
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