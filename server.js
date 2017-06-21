var express  = require('express');
var request  = require('request');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.send('la page est chargée !');
});

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
