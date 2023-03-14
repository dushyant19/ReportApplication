const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB Atlas!');
  }).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
  
// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to CRUD application." });
});

// routes
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

//set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
