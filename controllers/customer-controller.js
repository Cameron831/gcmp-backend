Customer = require('../models/customer-model')

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