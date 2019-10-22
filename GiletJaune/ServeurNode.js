var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var hostname = 'localhost';
var port = 3000;
var app = express();
var bodyParser = require("body-parser");
var myRouter = express.Router();
var session = require('express-session');
var cors = require('cors');

app.use(cors({
	origin: [
		'http://localhost:4200'
	], credentials: true
}));
app.use(session({
	secret: "Appartoo",
	resave: false,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost", function (error, client) {
	if (error) throw error;

	var db = client.db('DBGiletJaune');

	myRouter.route('/')
		.all(function (req, res) {
			res.json({ message: "Bienvenue chez les Gilets Jaune", methode: req.method });
		});

	myRouter.route('/inscription')
		.post(function (req, res) {

		});

	myRouter.route('/connexion')
		.post(function (req, res) {
			db.collection("utilisateurs").findOne({ mail: req.body.email }, function (error, result) {
				if (error) throw error;
				if (result === null) {
					res.json({ error: 'user not found', loggedIn: false });
					return;
				}
				if (req.body.password = result.mdp) {
					req.session.user = {};
					req.session.user.prenom = result.prenom;
					req.session.user.nom = result.nom;
					req.session.user.amis = result.amis
					res.json({ loggedIn: true, info: 'tu renverra + d\'infos + tard, genre lid etc..' });

					myRouter.route('/getuser')
					.get(function (req, res) {
						if (result === null) {
							res.json({ error: 'pas amis'});
							return;
						} else {
							res.json({ result });
						}
					});
				}
			});

		});

	myRouter.route('/connexion')
		.get(function (req, res) {
			req.session.user ? res.status(200).send({ loggedIn: true }) : res.status(200).send({ loggedIn: false });
		});

	myRouter.route('/addfirend')
		.post(function (req, res) {

		});

	myRouter.route('/changeinfo')
		.post(function (req, res) {

		});


	myRouter.route('/deconnection')
	.post(function (req, res) {
		req.session.destroy((err) => {
			if (err) {
			  res.status(500).send('Could not log out.');
			} else {
			  res.status(200).send({});
			}
		  });
	});

	console.log("Connecté à la base de données 'giletjaune'");
});

app.use(myRouter);
app.listen(port, hostname, function () {
	console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});