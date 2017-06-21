var express  = require('express');
var request  = require('request');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('home');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/review', function(req, res){
  res.render('review');
});

app.get('/single', function(req, res){
  res.render('single');
});

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
