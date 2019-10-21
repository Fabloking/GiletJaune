var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var hostname = 'localhost'; 
var port = 3000; 
var app = express();
var bodyParser = require("body-parser"); 
var myRouter = express.Router();
var session  = require('express-session');
var cors = require('cors');

app.use(cors({origin: [
	'http://localhost:4736'
], credentials: true
}));
app.use(session({
	secret: "Appartoo",
	resave: false,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

myRouter.route('/')
.all(function(req,res){ 
      res.json({message : "Bienvenue chez les Gilets Jaune", methode : req.method});
});
  
myRouter.route('/inscription')
.post(function(req,res){

});

myRouter.route('/connexion')
.post(function(req,res){
	MongoClient.connect("mongodb://localhost", function(error, client) {
		if (error) throw error;

		var db = client.db('DBGiletJaune');

		db.collection("utilisateurs").findOne({mail: req.body.user_email}, function(error, result) {
			if (error) throw error;
	 
			if(req.body.user_mdp = result.mdp){
				req.session.user = result.prenom;
				res.send('<p>Bienvenue '+ result.prenom +' '+result.nom +'<p>')
    			res.sendFile("C:/Users/fablo/git/Test/GiletJaune/GiletJaune/src/app/Composants/time-line/time-line.component.html");
			}
		});
    console.log("Connecté à la base de données 'giletjaune'");
	});
});

myRouter.route('/addfirend')
.post(function(req,res){
	
});

myRouter.route('/changeinfo')
.post(function(req,res){
	
});

app.use(myRouter);   
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});