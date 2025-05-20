const express = require('express');
const route = express.Router();
const controller = require("../controllers/admin.controller");


//Dang thong tin 
route.post("/post", controller.createPost);

//Them may bay
route.post("/airplane", controller.addAirplane);

//Xem booking
route.get("/bookings", controller.viewBookings);


//Cap nhat trang thai chuyen bay
route.put("/flight/:flightId/status", controller.updateFlightStatus);

//Cap nhat so luong ghe ngoi
route.put("/airplane/seatCount", controller.updateSeatCount);

module.exports = route;