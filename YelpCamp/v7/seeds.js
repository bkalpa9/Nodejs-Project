var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')
var data = [{
  name: 'Everest Basecamp',
  image: 'https://cdn.pixabay.com/photo/2017/10/18/05/59/everest-2863048__340.jpg',
  description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
},
{
  name: 'Sagarmatha Basecamp',
  image: 'https://cdn.pixabay.com/photo/2014/04/05/11/20/buddhist-315297__340.jpg',
  description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
},
{
  name: 'Himalaya Basecamp',
  image: 'https://cdn.pixabay.com/photo/2017/07/25/07/00/mount-2537125__340.jpg',
  description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
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
