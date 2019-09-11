var express = require('express'),
  expressSanitizer = require('express-sanitizer'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();
// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
// schema creation/ MONGOOSE /MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
// creating model for database
var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title:"TestBlog",
//   image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Terrier_mixed-breed_dog.jpg/220px-Terrier_mixed-breed_dog.jpg",
//   body:"HELLO THIS IS BLOG POST!"
// });
// RESTful ROUTES
//
//  REDIRECT ROOT TO INDEX
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

// INDEX PAGE ROUTE
app.get('/blogs', (req, res) => {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR!")
    } else {
      res.render('index', {blogs: blogs})
    }
  });
})

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('new');
})

// CREATE ROUTE
app.post('/blogs', (req, res) => {
  // create blogs
  console.log(req.body);
  console.log('===========');
  console.log(req.body);
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render('new')
    } else {  // then,redirect to index
      res.redirect('/blogs')
    }
  });
})
// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('show', {blog: foundBlog})
    }
  });
})

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('edit', {blog: foundBlog})
    }
  });
})
// UPDATE ROUTE
app.put('/blogs/:id', function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs/' + req.params.id)
    }
  })
});

// DELETE ROUTE
app.delete('/blogs/:id', (req, res) => {
  // destroy blog

  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs')
    }
  });
  // redirect somewhere
})

app.listen(3333, function () {
  console.log(`RESTful Blog Server Starts on ${3333}`)
});
