var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cat_app')

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temprement: String
})

var Cat = mongoose.model('Cat', catSchema)

// adding new cat to database

// var george=new Cat({
//   name:"Mrs. Norris",
//   age:7,
//   temprement:"Evil",
//
// })
// Retrive all cats from database and console.log each time

// // george.save(function (err, cat) {
//   if (err) {
//     console.log('SOMETHING WENT WRONG!')
//   } else {
//     console.log('WE JUST SAVED A CAT TO THE DB:')
//     console.log(cat)
//   }
// })
Cat.create({
  name:"Snow White",
  age:15,
  temprement:"Bland"
},function (err,cat) {
  if (err) {
    console.log(err );
  } else {
    console.log(cat);
  }
})
// retrive all the cats from database
//
Cat.find({}, function (err, cats) {
  if (err) {
    console.log('error!!!')
    console.log('err')
  } else {
    console.log('ALL THE CATS...')
    console.log(cats)
  }
})
