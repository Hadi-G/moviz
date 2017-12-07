var express  = require('express');
var request  = require('request');
var mongoose = require('mongoose');
var Mailchimp = require('mailchimp-api-v3');

var mailchimp = new Mailchimp('457fa69a252bbecce0ae9497be1c3197-us16');

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

app.get('/login', function(req, res){
  /*if(req.query.email != undefined && req.query.password != undefined){
    movieModel.find({email : req.query.email, password : req.query.password}, function(err, movies){
      if(user != null){
          res.redirect('/');
       } else {
          res.render('login', {error : 'merci de saisir votre email et votre password'});
      }
        else {
          res.render('login', {error : 'merci de saisir votre email et votre password'});
      }});
    });




  res.render('login');
});

app.get('/signup', function(req, res){
*/
  res.render('login');
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
    });

  });
});

app.get('/contact', function(req, res){
  mailchimp.post({
    path : '/lists/9aaf6eff5a/members'
  },
  {
    email_address : req.query.email,
    status : 'subscribed',
    merge_fields : {FNAME : req.query.name}
  },
  function (err, result) {
  console.log(result);
  res.render('contact');
  }
);
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

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});
