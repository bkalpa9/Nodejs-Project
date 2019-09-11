var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')
var data = [{
  name: 'Everest Basecamp',
  image: 'https://cdn.pixabay.com/photo/2017/10/18/05/59/everest-2863048__340.jpg',
  description: 'blah blah blah'
},
{
  name: 'Sagarmatha Basecamp',
  image: 'https://cdn.pixabay.com/photo/2014/04/05/11/20/buddhist-315297__340.jpg',
  description: 'blah blah blah'
},
{
  name: 'Himalaya Basecamp',
  image: 'https://cdn.pixabay.com/photo/2017/07/25/07/00/mount-2537125__340.jpg',
  description: 'blah blah blah'
}
]

function seedDB () {
  // Remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Removed all Campgrounds!')
      // add a few campgrounds
      data.forEach(seed => {
        Campground.create(seed, function (err, campground) {
          if (err) {
            console.log(err)
          } else {
            console.log('added a campground')
            // create a comments
            Comment.create({
              text: 'this is cool place',
              author: 'Ram'
            }, function (err, comment) {
              if (err) {
                console.log(err)
              } else {
                campground.comments.push(comment)
                campground.save()
                console.log('Created new comments')
              }
            })
          }
        })
      })
    }
  })
}

// add few comments

module.exports = seedDB
