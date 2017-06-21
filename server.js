var express  = require('express');
var request  = require('request');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

var movie = [];

app.get('/', function(req, res){
  request('https://api.themoviedb.org/3/discover/movie?api_key=a492894f4023ba237e9b72222795fbf1&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false', function(error, response, body){
    body=JSON.parse(body);
    res.render('home', {movie : body.results});
  });
});

app.get('/home', function(req, res){
  request('https://api.themoviedb.org/3/discover/movie?api_key=a492894f4023ba237e9b72222795fbf1&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false', function(error, response, body){
    body=JSON.parse(body);
    res.render('home', {movie : body.results});
  });
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
