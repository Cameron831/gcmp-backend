Teetime = require('../models/teetime-model')
Reservation = require('../models/reservation-model')
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

        const numPlayersToAdd = req.body.numberOfPlayers || 1;

        if (teetime.players.length + numPlayersToAdd > 4) {
            return res.status(400).send({message: 'Not enough slots available.'});
        }

        for (let i = 0; i < numPlayersToAdd; i++) {
            teetime.players.push({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                riding: req.body.riding,
                nine: req.body.nine
            });
        }

        teetime.numberOfPlayers = teetime.players.length;

        await teetime.save();
        res.status(200).json(teetime);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while reserving the teetime: ' + error});
    }
};

exports.getTeetimesForSelectedDate = async function (req, res) {
    const START_HOUR = 7; // 7 AM UTC
    const END_HOUR = 17; // 5 PM UTC

    const { date } = req.query;
    if (!date) {
        return res.status(400).send({message: 'Please provide a date query parameter in the format YYYY-MM-DD'});
    }

    try {
        const selectedDate = new Date(date + 'T00:00:00.000Z');

        // Adjust hours for filtering specific times
        const startOfSelectedDate = new Date(selectedDate.setUTCHours(START_HOUR, 0, 0, 0));
        const endOfSelectedDate = new Date(selectedDate.setUTCHours(END_HOUR, 0, 0, 0));

        const teetimes = await Teetime.find({
            date: {
                $gte: startOfSelectedDate,
                $lte: endOfSelectedDate
            }
        }).sort({ date: 1 }); // Sorting on the backend
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

        res.send({ message: 'Player payment status updated.', player });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while updating asdadasd.' });
    }
};

exports.playerCheckedIn = async function (req, res) {
    try {
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
        console.log(player)
        player.checkedIn = true;  // assuming 'paid' is a boolean field
        console.log(player)
        await teetime.save();

        res.send({ message: 'Player status updated.', player });
    } catch (error) {
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

exports.cancelReservation = async function(req, res) {
    try {
        const account = req.body
        const teetime = await Teetime.findById(req.params._id);
        const updatedPlayers = teetime.players.filter(player => player.firstname + player.lastname !== account.firstName + account.lastName)
        teetime.players = updatedPlayers;
        teetime.numberOfPlayers = updatedPlayers.length;
        await teetime.save();
        const doc = await Reservation.findOneAndDelete({
            "teetime_id": req.params._id,
            "customer_id": account._id
        });
        if (!doc) {
            return res.status(404).send({ message: "Reservation not found." });
        }
        res.status(200).json(teetime);
    } catch (error) {
        console.log("test")
        res.status(500).send({message: 'An error occurred updating teetime.'});
    }
}

exports.payForReservation = async function(req, res) {
    try {
        const account = req.body
        const teetime = await Teetime.findById(req.params._id);
        teetime.players.forEach(player => {
            if ((player.firstname + player.lastname).toLowerCase() === (account.firstName + account.lastName).toLowerCase()) {
                player.paid = true;
            }
        });
        await teetime.save();
        res.status(200).json(teetime);
    } catch (error) {
        res.status(500).send({message: 'An error occurred updating teetime.', error});
    }
}
