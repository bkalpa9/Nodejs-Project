var express = require('express')
var app = express()
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")

var campgrounds = [{
    name: "Annapurna",
    image: "https://www.sycol.com/wp-content/uploads/2016/05/Camping-Everest-Base-Camp_1439798320.jpg"
  },
  {
    name: "Mustang",
    image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"
  },
  {
    name: "Langtang",
    image: "http://blog.nepaladvisor.com/wp-content/uploads/2013/11/DSC0514-copy.jpg"
  },
  {
      name: "Annapurna",
      image: "https://www.sycol.com/wp-content/uploads/2016/05/Camping-Everest-Base-Camp_1439798320.jpg"
    },
    {
      name: "Mustang",
      image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"
    },
    {
      name: "Langtang",
      image: "http://blog.nepaladvisor.com/wp-content/uploads/2013/11/DSC0514-copy.jpg"
    },
    {
        name: "Annapurna",
        image: "https://www.sycol.com/wp-content/uploads/2016/05/Camping-Everest-Base-Camp_1439798320.jpg"
      },
      {
        name: "Mustang",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"
      },
      {
        name: "Langtang",
        image: "http://blog.nepaladvisor.com/wp-content/uploads/2013/11/DSC0514-copy.jpg"
      }

];

// landing Page
app.get('/', (req, res) => {
  // res.send("this wii be landing page soon!");
  res.render("landing");

});
// campgrounds
app.get('/campgrounds', (req, res) => {

  res.render("campgrounds", {
    campgrounds: campgrounds
  });

});
app.post('/campgrounds', (req, res) => {
  // res.send("YOU HIT THE THE POST ROUTE!");
  // get data from form and add to campgroungs array
  var name =req.body.name;
  var image =req.body.image;
  var newCampground={name:name,image:image};
  campgrounds.push(newCampground);
  //  redirect back to campground page
  res.redirect('/campgrounds');
})
app.get('/campgrounds/new', (req, res) => {
  res.render("new.ejs");
});

app.listen(3333, function() {
  console.log(` The YelpCamp Server Started on port: ${3333}`);
})
