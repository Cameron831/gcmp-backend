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
    players: {
        type: [playerSchema], // Array of playerSchema
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'], // Custom validator for array size
        default: [] // Default to an empty array
    },
    numberOfPlayers: {
        type: Number,
        required: true,
        default: 0,
        validate: {
          validator: function(v) {
            return v === this.players.length;
          },
          message: function(props) { // Changed to a traditional function
            return `numberOfPlayers (${props.value}) does not match the actual number of players (${this.players.length})`;
          }
        }
    }    
});

teetimeSchema.pre('findOneAndUpdate', function(next) {
    this.set({ numberOfPlayers: this.getUpdate().$push.players.length });
    next();
});

// Custom validator function to ensure the array size is 0 to 4
function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model('Teetime', teetimeSchema, 'teetimes');
