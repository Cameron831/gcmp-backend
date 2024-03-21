const mongoose = require('mongoose');
const Teetime = require('../models/teetime-model'); // Update with the correct path
const { addDays, setHours, setMinutes, startOfToday, addMinutes } = require('date-fns');

require('dotenv').config({ path: '../.env' });
const uri = process.env.DB_URI;

// Connect to MongoDB - update the connection string as per your setup
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const generateTeetimesForNextMonth = () => {
  const teetimes = [];
  const now = startOfToday();
  const end = addDays(now, 30); // Adjust the number of days as needed

  for (let day = now; day <= end; day = addDays(day, 1)) {
    for (let hour = 7; hour <= 17; hour++) {
      let time = setHours(day, hour);
      if (hour === 17) { // For the 5 PM slot
        teetimes.push(createTeetimeDocument(time));
      } else {
        for (let minute = 0; minute < 60; minute += 10) {
          time = setMinutes(time, minute);
          teetimes.push(createTeetimeDocument(time));
        }
      }
    }
  }

  return teetimes;
};

const createTeetimeDocument = (time) => {
  return {
    date: time,
    // Assuming default values for players. Adjust as necessary.
    playerOne: {},
    playerTwo: {},
    playerThree: {},
    playerFour: {},
    numberOfPlayers: 0
  };
};

const insertTeetimesIntoDatabase = async (teetimes) => {
  try {
    await Teetime.insertMany(teetimes);
    console.log('Teetimes successfully added to the database');
  } catch (error) {
    console.error('Error inserting teetimes into the database:', error);
  } finally {
    mongoose.disconnect();
  }
};

const run = async () => {
  const teetimes = generateTeetimesForNextMonth();
  await insertTeetimesIntoDatabase(teetimes);
};

run();
