Teetime = require('../models/teetime-model')
var ObjectID = require('mongodb').ObjectID

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