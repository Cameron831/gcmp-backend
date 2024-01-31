const axios = require('axios').default;
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;
Customer = require('../models/customer-model')

exports.test = async (req, res) => {
    try {
        res.status(200).send("test")
    } catch (error) {
        res.status(500).send({message: 'An error occurred'});
    }
}

exports.addCustomer = async (req, res) => {
    var newCustomer = new Customer(req.body)
    try {
        const savedCustomer = await newCustomer.save();
         res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the customer: ' + error});
    }
}