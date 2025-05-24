const express = require('express');
const route = express.Router();
const airplaneController = require("../controllers/airplane.controller");

route.get("/", airplaneController.getAllAirplanes);

module.exports = route;