var express = require('express');

var hostname = 'localhost'; 
var port = 3000; 

var mongoose = require('mongoose'); 

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var urlmongo = "mongodb://Fabien:1234/DBGiletJaune"; 

mongoose.connect(urlmongo, options);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 
var app = express(); 
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var utilisateurSchema = mongoose.Schema({
    nom: String, 
    adresse: String, 
    tel: String, 
    description: String   
}); 

var Utilisateur = mongoose.model('utilisateur', utilisateurSchema); 
var myRouter = express.Router(); 
myRouter.route('/')
.all(function(req,res){ 
      res.json({message : "Bienvenue chez les Gilets Jaune", methode : req.method});
});
  

app.use(myRouter);   
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});