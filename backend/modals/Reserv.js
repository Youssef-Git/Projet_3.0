const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  
  nom: {
    type: String,
  },

  prenom: {
    type: String,
  },

  email: {
    type: String,
    unique: true
  },

  startDate: {
    type: Date
  },

  endDate: {
    type: Date
  },

  numeroTelephone: {
    type: String
  },

  idVoiture: {
    type: Number
  },

  marqueVoiture: {
    type: String
  }
}, { versionKey: false });

module.exports = mongoose.model('Reservation', reservationSchema, 'Reservation');