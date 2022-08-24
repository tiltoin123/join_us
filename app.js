var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

//app.get("/",function(req,res){
	//var q ='select count(*) as count from users';
//connection.query(q, function(error,results){
	//if(error) throw error;
	//console.log(results);
	//res.send(results);
	//var count = results[0].count;
	//res.send("We have " + count + " users in our db");
	//res.render("home",{data :count});
//});
//});

app.get("/",function(req,res){
	var q = 'select count(*) as count from users';
	connection.query(q, function(error,results){
		var count = results[0].count;
		if(error) throw error;
		res.render("home",{count});
		//res.send(results);
	});
});

app.post("/register",function(req,res){
	var person = {email:req.body.email
				 };
	
	var end_result =connection.query('INSERT INTO users SET ?',person, function(error,results){
		if(error) throw error;
		res.redirect("/");
	});
});

app.get("/joke",function(req,res){
	var joke="<strong>What do you call a dog that magic tricks?</strong><em> A labracadabrador.</em>";
	res.send(joke);
	console.log("REQUESTED THE JOKE ROUTE!")
});

app.get("/random_num",function(req,res){
	var num=Math.floor(Math.random()*10)+1;
	res.send("your lucky number is "+ num);
	console.log("random number")
});

app.listen(3000,function(){
	console.log("Server is running on port 3000!");
	});

