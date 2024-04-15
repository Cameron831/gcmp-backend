Teetime = require('../models/teetime-model')
var ObjectID = require('mongodb').ObjectID
const { startOfDay, endOfDay } = require('date-fns');

exports.getAllTeetimes = async function (req, res) {
    try {
        const teetimes = await Teetime.find({})
        res.status(200).json(teetimes)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting all teetimes: ' + error})
    }
}

exports.addTeetime = async (req, res) => {
    var newTeetime = new Teetime(req.body)
    try {
        const savedTeetime = await newTeetime.save()
         res.status(201).json(savedTeetime)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the teetime: ' + error})
    }
}

exports.reserveTeeTime = async function (req, res) {
    try {
        const teetime = await Teetime.findById(req.params._id);
        if (teetime.players.length >= 4) {
            res.status(500).send({message: 'An error occurred while reserving the teetime: ' + error});
        }
        teetime.players.push(req.body);
        teetime.numberOfPlayers = teetime.players.length;
        await teetime.save();
        res.status(200).json(teetime);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while reserving the teetime: ' + error});
    }
};

exports.getTeetimesForSelectedDate = async function (req, res) {
    const { date } = req.query;
    if (!date) {
        return res.status(400).send({message: 'Please provide a date query parameter in the format YYYY-MM-DD'});
    }

    try {
        // Parse the date as UTC
        const selectedDate = new Date(date + 'T00:00:00.000Z');
        
        // Construct a range for the entire day in UTC
        const startOfSelectedDate = new Date(selectedDate);
        const endOfSelectedDate = new Date(selectedDate);
        endOfSelectedDate.setUTCHours(23, 59, 59, 999);

        const teetimes = await Teetime.find({
            date: {
                $gte: startOfSelectedDate,
                $lte: endOfSelectedDate
            }
        });

        res.status(200).json(teetimes);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting teetimes for the selected date: ' + error});
    }
};

exports.deletePlayer = async function (req, res) {
    try {
        const teetime = await Teetime.findById(req.params._id);
        const playerID = req.params.player
        const updatedPlayers = teetime.players.filter(player => player._id.toString() !== playerID);
        teetime.players = updatedPlayers;
        teetime.numberOfPlayers = updatedPlayers.length;
        await teetime.save();
        res.status(200).json(teetime);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while updating player: ' + error});
    }
}

exports.playerPaid = async function (req, res) {
    try {
        // Assuming you have some debug info to log, make sure the variable is defined
        const debugInfo = 'Starting playerPaid function';
        console.log(debugInfo);

        // Find teetime by ID provided in request parameters
        const teetime = await Teetime.findById(req.params._id);
        if (!teetime) {
            return res.status(404).send({ message: 'Teetime not found.' });
        }

        // Find player by ID within the teetime's players array
        const playerID = req.params.player;
        const player = teetime.players.find(player => player._id.toString() === playerID);
        if (!player) {
            return res.status(404).send({ message: 'Player not found.' });
        }

        // Example: Update player paid status and save
        player.paid = true;  // assuming 'paid' is a boolean field
        await teetime.save();

        console.log('Player updated:', player);
        res.send({ message: 'Player payment status updated.', player });
    } catch (error) {
        console.error('An error occurred while updating player:', error);
        res.status(500).send({ message: 'An error occurred while updating player.' });
    }
};


exports.updateTeeTime = async function (req, res) {
    try {
        const updatedTeetime = await Teetime.findByIdAndUpdate(req.params._id, req.body, {new:true});
        res.status(200).json(updatedTeetime);
    } catch (error) {
        res.status(500).send({message: 'An error occurred updating teetime.'});
    }
}
