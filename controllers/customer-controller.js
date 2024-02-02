Customer = require('../models/customer-model')
var ObjectID = require('mongodb').ObjectID;

exports.addCustomer = async (req, res) => {
    var newCustomer = new Customer(req.body)
    try {
        const savedCustomer = await newCustomer.save();
         res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the customer: ' + error});
    }
}

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting all customers: ' + error});
    }
}

exports.getCustomer = async function(req, res) {
    try {
        console.log(req.params.id)
      const customer = await Customer.findById(req.params._id);
      console.log(customer)
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).send({message: 'Customer not found.'});
      }
    } catch (err) {
      res.status(500).send({message: 'An error occurred retrieving user.'});
    }
  }