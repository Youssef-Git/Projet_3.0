import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';


const Book = ({route}) => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [numeroTelephone, setNumeroTelephone] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { marque, id } = route.params;

    const handleSubmit = () => {
        // Vérifier si tous les champs obligatoires sont remplis
        if (!nom || !prenom || !email || !numeroTelephone || !startDate || !endDate) {
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            return; // Arrêter la soumission si un champ est manquant
        }

    setErrorMessage('');

    // console.log('Données du formulaire :', {
    // nom,
    // prenom,
    // email,
    // numeroTelephone,
    // periode: {
    //     startDate,
    //     endDate,
    // },

    // marque: marque,

    // });

    const reservationData = {
        nom,
        prenom,
        email,
        numeroTelephone,
        startDate,
        endDate,
        marqueVoiture: marque, // Récupéré depuis la navigation (route.params)
        idVoiture: id 
    };



    // Envoi de la requête POST vers le serveur avec Axios
    axios.post('http://192.168.1.12:3000/ride/reservations', reservationData)
    .then((response) => {
        console.log('Réponse du serveur :', response.data);
        // Vous pouvez effectuer des actions supplémentaires ici après l'enregistrement réussi
        // Par exemple, afficher un message de succès ou rediriger l'utilisateur vers une autre page
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi de la réservation :', error);
        // Afficher un message d'erreur ou effectuer des actions en cas d'erreur
    });





    // Réinitialiser le formulaire à vide
    setNom('');
    setPrenom('');
    setEmail('');
    setNumeroTelephone('');
    setStartDate('');
    setEndDate('');
    setShowCalendar(false);
};

const handleDateSelect = (date) => {
    // Vérifier si une date de départ est déjà sélectionnée
    if (!startDate) {
    setStartDate(date.dateString);
    } else {
      // Si une date de départ est déjà sélectionnée, on vérifie si la date de retour est après la date de départ
    if (new Date(date.dateString) >= new Date(startDate)) {
        setEndDate(date.dateString);
    } else {
        setErrorMessage('La date de retour doit être après la date de départ.');
    }
    }
};

    const toggleCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
};

    const markedDates = {};
    // Colorer en vert les jours pris entre la date de départ et la date de retour
    if (startDate && endDate) {
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = { selected: true, marked: true, selectedColor: 'green' };
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>

            {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            <Text style={styles.marqueText}>{marque}</Text>

            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNom}
                value={nom}
                placeholder="Entrez votre nom"
            />

            <Text style={styles.label}>Prénom</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPrenom}
                value={prenom}
                placeholder="Entrez votre prénom"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Entrez votre email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNumeroTelephone}
                value={numeroTelephone}
                placeholder="Entrez votre numéro de téléphone"
                keyboardType="phone-pad"
            />

            <TouchableOpacity onPress={toggleCalendar}>
                <View style={styles.calendarContainer}>
                <Text style={styles.label}>Période aller-retour</Text>
                <Icon name="calendar" size={20} style={styles.calendarIcon} />
                </View>
            </TouchableOpacity>

            {showCalendar && (
                <Calendar
                onDayPress={handleDateSelect}
                markedDates={markedDates}
                style={styles.calendar}
                />
            )}

            <Button title="Valider" onPress={handleSubmit} />
        </View>
    </TouchableWithoutFeedback>

);
};

export default Book;

const styles = StyleSheet.create({
    
    errorMessage: {
        color: 'red',
        marginBottom: 16,
    },

    container: {
    flex: 1,
    padding: 20,
    },

    label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    },

    input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    },

    calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },

    calendarIcon: {
    marginLeft: 10,
    },

    calendar: {
    marginBottom: 15,
    },

});
