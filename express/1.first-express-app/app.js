var express = require("express");
var app = express();

// "/"=> "Hi there!"
app.get("/", function(req, res) {
    res.send("hi there!");
});
// "/bye"=> "Goodbye"
app.get("/bye", function(req, res) {
    res.send("Goodbye!")
});
// "/dog"=> "MEOW!"
app.get("/dog", function(req, res) {
    console.log("Someone made a request to /dog")
    res.send("MEOW!");
});

// app.get("/r/subredditName/id/title/")
app.get("/r/:subredditName",function(req,res) {
	var subreddit =req.params.subredditName;
	res.send("WELCOME TO THE "+subreddit.toUpperCase()+" SUBREDDIT");
});

app.get("/r/:subredditName/comments/:id/:title/",function(req,res){
	console.log(req.params);
	res.send("WELCOME TO COMMENTS PAGE!");
});

app.get("*", function(req, res) {
    res.send("YOU ARE A STAR");
});
//Tell Express to listen for requests(start over) for c9
// app.listen(process.env.PORT,process.env.IP,function(){
// 	console.log("Server has started");
// });
app.listen(3001, function() {
    console.log("Server has started");
});
