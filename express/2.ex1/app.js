var express = require("express");
var app = express();

//routes
//1
app.get("/", function(req, res) {
    res.send("hi there, welcome to my assingment!");
});
//methord 1
// app.get("/speak/pig", function(req, res) {
// 	res.send("The pig says 'Oink'");
// });
// app.get("/speak/cow", function(req, res) {
// 	res.send("The cow says 'Moo'");
// });
// app.get("/speak/dog", function(req, res) {
// 	res.send("The dog says 'Woof Woof'");
// });
// 
// methord 2 if else
// app.get("/speak/:animal", function(req, res) {
// 	var animal=req.params.animal;
// 	var sound="";
// 	if (animal=="pig") {
// 		sound="oink";
// 	}else if (animal=="cow") {
// 		sound="moo";
// 	}else if (animal=="dog") {
// 		sound="woof woof";
// 	}
// 	res.send("The "+ animal+" says "+ sound);
// });
//3
//
//methord 3 using dictonary
app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "oink",
        cow: "moo",
        dog: "woof woof",
        cat: "I hate  you Human",
        fish: "....."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
});
//
//
//
app.get("/repeat/:echoText/:times", function(req, res) {
    var message = req.params.echoText;
    var times = Number(req.params.times);
    var result = "";
    for (var i = 0; i < times; i++) {
        result += message+" ";
    }
    res.send(result);
});





app.get("*", function(req, res) {
    res.send("Sorry,page not found...What are you doing with your life?");
});



//server node
app.listen(3002, function() {
    console.log("Server has started");
});