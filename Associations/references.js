
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog_demo_2')
var Post = require('./models/post')
var User=require('./models/user');
// POST - title, content
// var postSchema = new mongoose.Schema({
//   title: String,
//   content: String
// })
//var Post = mongoose.model('Post', postSchema)
// // USER- email, name
// var userSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   posts: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post'
//   }]
// })
// var User = mongoose.model('User', userSchema)

Post.create({
  title: 'How to cook the best Chicken pt.4 ?',
  content: 'welll part 4 has lot of twists....'
}, function (err, post) {
  if (err) {
    console.log(err)
  } else {
    User.findOne({
      email: 'basant@cool.cos'
    }, function (err, foundUser) {
      if (err) {
        console.log(err)
      } else {
        foundUser.posts.push(post)
        foundUser.save(function (err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log(data)
          }
        })
      }
    })
  }
})

// User.create({
//   email:"basant@cool.cos",
//   name:"Basant Cool"
// })
// find user
// User.findOne({email:"basant@cool.cos"}).populate("posts").exec(function (err,user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// })
// find all posts for that user
