const express = require('express');
const bodyParser = require('body-parser');
const app = express()
// let cors = require('cors');
const ride = require('./cars.json')


// // Initialisation de l'application Express
// const app = express();

// //Connexion à la BDD

// // Configuration de bodyParser pour analyser les données POST
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// app.use(express.json())
// app.use(cors());

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
// console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
// });

app.use(express.json())

//Affiche tous les voitures
app.get("/ride", (req,res) => {
    res.status(200).json(ride);
});

//affichage d'une voiture par rapport à son Id
app.get("/ride/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const TheRide = ride.find(ride => ride.id === id)
    res.status(200).json(TheRide);
});

//affichage d'une voiture par rapport à sa marque
app.get("/ride/marque/:marque", (req, res) => {
    const marque = req.params.marque;
    const TheRide = ride.find((ride) => ride.marque === marque);
    res.status(200).json(TheRide);
});


//ajout d'une nouvelle voiture
app.post("/ride", (req,res) => {
    ride.push(req.body)
    res.status(200).json(ride);
});

//Modification d'une voiture par rapport à son id
app.put("/ride/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let TheRide = ride.find(ride => ride.id === id)
    TheRide.marque =req.body.marque,
    TheRide.modele =req.body.modele,
    TheRide.transmission =req.body.transmission,
    TheRide.annee =req.body.annee,
    TheRide.image =req.body.image,
    TheRide.localisation =req.body.localisation,
    res.status(200).json(TheLivre);
});

//Suppression d'une voiture par rapport à son id
app.delete("/ride/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let TheRide = ride.find(ride => ride.id === id)
    ride.splice(ride.indexOf(TheRide),1)
    res.status(200).json(ride);
});


app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})
