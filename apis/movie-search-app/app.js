var express = require('express');
var app = express();
var request = require('request');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('search')
});
app.get('/results', function (req, res) {
  // console.log(req.query.search);
  var query = req.query.search;
  var url = 'http://www.omdbapi.com/?i=tt3896198&apikey=21a719df&s=' + query;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      // res.send(results["Search"][0]["Title"])
      res.render('results', {data: data})
    }
  })
});
// server node.
app.listen(3002, function () {
  console.log('Movie App has started')
});
