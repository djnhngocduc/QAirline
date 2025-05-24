const express = require('express');
const route = express.Router();
const controller = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { verifyAdmin } = require("../middlewares/admin.middleware");


//Dang thong tin 
route.post("/post",verifyAdmin, verifyToken, controller.createPost);

//Them may bay
route.post("/airplane",verifyAdmin, verifyToken,  controller.addAirplane);

//Them chuyen bay
route.post("/flight",verifyAdmin, verifyToken, controller.addFlight);

//Xem booking
route.get("/bookings",verifyAdmin, verifyToken,  controller.viewBookings);


//Cap nhat trang thai chuyen bay
route.patch("/flight/:flightId/status",verifyAdmin, verifyToken, controller.updateFlightStatus);

//Cap nhat so luong ghe ngoi
route.patch("/airplane/seatCount",verifyAdmin, verifyToken, controller.updateSeatCount);


//[DELETE] /api/admin/post/delete/:id: Xóa bài viết theo id
route.delete("/post/:id",verifyToken, verifyAdmin, controller.deletePost);

//[PATCH] /api/admin/post/edit/:id: Cập nhật bài viết theo id
route.patch("/post/:id",verifyToken, verifyAdmin, controller.editPost);



module.exports = route;