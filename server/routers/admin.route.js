const express = require('express');
const route = express.Router();
const controller = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { verifyAdmin } = require("../middlewares/admin.middleware");


//Dang thong tin 
route.post("/post",verifyAdmin, verifyToken, controller.createPost);

//Them may bay
route.post("/airplane",verifyAdmin, verifyToken,  controller.addAirplane);

//Xem booking
route.get("/bookings",verifyAdmin, verifyToken,  controller.viewBookings);


//Cap nhat trang thai chuyen bay
route.put("/flight/:flightId/status",verifyAdmin, verifyToken, controller.updateFlightStatus);

//Cap nhat so luong ghe ngoi
route.put("/airplane/seatCount",verifyAdmin, verifyToken, controller.updateSeatCount);

module.exports = route;