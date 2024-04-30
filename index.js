const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors'); // Import CORS module

const app = express()
const PORT = 3001; 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//connect mongoose to mongoDB
mongoose = require('mongoose')
const uri = process.env.DB_URI;
mongoose.Promise = global.Promise
mongoose.connect(uri)


app.use(cors({
    origin: 'http://localhost:3000' // Allow all domains/origins or specify to restrict
}));

//import route
var route = require('./routes/routes.js')
app.use('/', route)

  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running http://localhost:"+ PORT) 
    else 
        console.log("Error occurred, server can't start", error)
    } 
); 