require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
// let cors = require('cors');
const ride = require('./cars.json')
const Reservation = require('./modals/Reserv');

//connexion BDD
const connectDB=require('./conn')

app.use(express.json())

//Connect Database 
connectDB();


//Affiche tous les voitures
app.get("/ride", (req,res) => {
    res.status(200).json(ride);
});



// Ajoutez un point de terminaison pour récupérer les réservations pour une voiture spécifique
app.get("/reservations/:id", (req, res) => {
    const { id } = req.params;
    console.log(id, typeof id)
    Reservation.findById(  id) // Récupérer les réservations par idVoiture
        .then((reservations) => {
            res.status(200).json(reservations);
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des réservations :', err);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des réservations.' });
        });

});


app.post("/ride/reservations", (req, res) => {
    const { nom, prenom, email, numeroTelephone, startDate, endDate, marqueVoiture, idVoiture } = req.body;

    // Créez une nouvelle instance de la réservation en utilisant le modèle
    const newReservation = new Reservation({
        nom,
        prenom,
        email,
        numeroTelephone,
        startDate,
        endDate,
        marqueVoiture,
        idVoiture:Number(idVoiture)
    });

    // Enregistrez la réservation dans la base de données
    newReservation.save()
        .then((response) => {
            console.log('Reservation saved successfully.');
            res.status(201).json({ message: 'Reservation saved successfully.', id:response._id });
        })
        .catch((err) => {
            console.error('Error saving reservation:', err);
            res.status(500).json({ message: 'An error occurred while saving the reservation.' });
        });
});



app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})
