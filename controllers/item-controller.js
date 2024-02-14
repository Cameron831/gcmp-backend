Item = require('../models/item-model')
var ObjectID = require('mongodb').ObjectID

exports.getAllItems = async function (req, res) {
    try {
        const items = await Item.find({})
        res.status(200).json(items)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting all items: ' + error})
    }
}

exports.addItem = async (req, res) => {
    var newItem = new Item(req.body)
    try {
        const savedItem = await newItem.save()
         res.status(201).json(savedItem)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the item: ' + error})
    }
}