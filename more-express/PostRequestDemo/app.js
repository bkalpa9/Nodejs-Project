var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
  extended: true
}));


app.set("view engine", "ejs")
var friends = ["Bejay", "Asish", "Mausam", "Baivab", "Dilmorud"]
app.get('/', function(req, res) {
  res.render("home");
});
// friends
app.get('/friends', (req, res) => {

  res.render("friends", {
    friends: friends
  });
});
// post route
app.post('/addfriend', (req, res) => {
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  // res.send("You have reached to post route!");
  res.redirect('/friends');

});


app.listen(3333, function() {
  console.log('Server is started at port :3333');

});
