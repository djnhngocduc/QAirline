const express = require('express');
const route = express.Router();
const controller = require("../controllers/flight.controller");

// Get all flights
route.get('/', controller.getAllFlights);

// Create a new flight
route.post('/', controller.addFlight);

// Edit a flight
route.patch('/:id', controller.editFlight);

// Delete a flight
route.delete('/:id', controller.deleteFlight);


module.exports = route;