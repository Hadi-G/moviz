var express  = require('express');
var request  = require('request');
var mongoose = require('mongoose');
var session  = require('express-session');

app.use(
 session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://hadi:zipang75@ds129532.mlab.com:29532/cinema',options, function(err) {
  console.log(err);
});

var movieSchema = mongoose.Schema({
  image : String,
  title : String,
  overview : String
});

var movieModel = mongoose.model('movie',movieSchema);

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

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
  request('https://api.themoviedb.org/3/movie/'+req.query.id+'?api_key=a492894f4023ba237e9b72222795fbf1&language=fr-FR', function(error, response, single){
    single=JSON.parse(single);
    var favorite = new movieModel({
      image : single.poster_path,
      title : single.title,
      overview : single.overview
    });
    favorite.save(function(error, verif){
      console.log(verif);
    });

  });
});

app.get('/contact', function(req, res){

  res.render('contact');
});

app.get('/review', function(req, res){
    movieModel.remove({_id:req.query.id}, function(error){
      movieModel.find(function (err, mesFilms){
res.render('review', {mesFilms : mesFilms});
    });
  });
});


app.get('/single', function(req, res){
  request('https://api.themoviedb.org/3/movie/'+req.query.id+'?api_key=a492894f4023ba237e9b72222795fbf1&language=fr-FR', function(error, response, single){
    single=JSON.parse(single);
    res.render('single', {single : single});
  });
});

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
