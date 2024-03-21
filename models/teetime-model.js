const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  riding: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
  nine: { type: Boolean, default: false }
});

const teetimeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    playerOne: { type: playerSchema, default: () => ({}) },
    playerTwo: { type: playerSchema, default: () => ({}) },
    playerThree: { type: playerSchema, default: () => ({}) },
    playerFour: { type: playerSchema, default: () => ({}) },
    numberOfPlayers: {
        type: Number,
        required: true,
        default: 0 
    }
});

module.exports = mongoose.model('Teetime', teetimeSchema, 'teetimes');
