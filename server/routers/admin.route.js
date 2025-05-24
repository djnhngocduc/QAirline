const express = require('express');
const route = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { verifyAdmin } = require("../middlewares/admin.middleware");


//Dang thong tin 
route.post("/post",verifyAdmin, verifyToken, adminController.createPost);

//Them may bay
route.post("/airplane",verifyAdmin, verifyToken,  adminController.addAirplane);

//Them chuyen bay
route.post("/flight",verifyAdmin, verifyToken, adminController.addFlight);

//Xem booking
route.get("/bookings",verifyAdmin, verifyToken,  adminController.viewBookings);


//Cap nhat trang thai chuyen bay
route.patch("/flight/:flightId/status",verifyAdmin, verifyToken, adminController.updateFlightStatus);

//Cap nhat so luong ghe ngoi
route.patch("/airplane/seatCount",verifyAdmin, verifyToken, adminController.updateSeatCount);


//[DELETE] /api/admin/post/delete/:id: Xóa bài viết theo id
route.delete("/post/:id",verifyToken, verifyAdmin, adminController.deletePost);

//[PATCH] /api/admin/post/edit/:id: Cập nhật bài viết theo id
route.patch("/post/:id",verifyToken, verifyAdmin, adminController.editPost);


//[POST] /api/admin/airplane Route to add a new airplane
route.post("/airplane",verifyToken, verifyAdmin, adminController.addAirplane);

//[PATCH] /api/admin/airplane/:id Route to update an existing airplane
route.patch("/airplane/:id",verifyToken, verifyAdmin, adminController.updateAirplane);

// [DELETE] /api/admin/airplane/:id Route to delete an airplane
route.delete("/airplane/:id",verifyToken, verifyAdmin, adminController.deleteAirplane);



module.exports = route;