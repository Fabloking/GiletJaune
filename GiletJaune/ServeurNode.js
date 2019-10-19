var express = require('express');

var hostname = 'localhost'; 
var port = 3000; 

var mongoose = require('mongoose'); 

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var urlmongo = "mongodb://localhost/DBGiletJaune"; 

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
	prenom: String, 
    mail: String, 
    mdp: String, 
	ddn: String,
	role: String   
}); 

var Utilisateur = mongoose.model('utilisateur', utilisateurSchema);

var myRouter = express.Router();

myRouter.route('/')
.all(function(req,res){ 
      res.json({message : "Bienvenue chez les Gilets Jaune", methode : req.method});
});
  
myRouter.route('/inscription')
.post(function(req,res){
	var utilisateur = new Utilisateur();

	if(req.body.user_mdp = req.body.user_mdp2){

		utilisateur.nom = req.body.user_nom;
		utilisateur.prenom = req.body.user_prenom;
		utilisateur.mail = req.body.user_email;
		utilisateur.mdp = req.body.user_mdp;
		utilisateur.ddn = req.body.user_ddn;
		utilisateur.role = req.body.role;
		
		utilisateur.save(function(err){
			if(err){
			  res.send(err);
			}
			res.sendFile('/src/app/Composants/time-line/time-line.component.html',{ root : __dirname});
		  })
	} else {
		res.send({message : "Le mot de passe ne correspond pas !"})
	}

});

app.use(myRouter);   
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});