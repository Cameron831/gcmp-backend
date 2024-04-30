Customer = require('../models/customer-model')
var ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')


exports.addCustomer = async (req, res) => {
    var newCustomer = new Customer(req.body)
    try {
        const savedCustomer = await newCustomer.save()
         res.status(201).json(savedCustomer)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the customer: ' + error})
    }
}

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({})
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting all customers: ' + error})
    }
}

exports.getCustomer = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params._id)
      console.log(customer)
      if (customer) {
        res.status(200).json(customer)
      } else {
        res.status(404).send({message: 'Customer not found.'})
      }
    } catch (err) {
      res.status(500).send({message: 'An error occurred retrieving customer.'})
    }
}

exports.verifyLogin = async (req, res) => {
  try {
    const customer = await Customer.findOne({username: req.body.username});
    if (customer) {
      const passwordMatch = await bcrypt.compare(req.body.password, customer.password);
      if (passwordMatch) {
        res.status(200).json(customer);
      } else {
        res.status(401).send({message: "Invalid login credentials"});
      }
    } else {
      res.status(404).send({message: "Customer not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "An internal server error occurred"});
  }
};


exports.updateCustomer = async function(req, res) {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params._id, req.body, {new:true});
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).send({message: 'An error occurred updating customer.'});
  }  
}
