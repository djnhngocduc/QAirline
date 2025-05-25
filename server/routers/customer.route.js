const express = require('express');
const route = express.Router();
const customerController = require("../controllers/customer.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

//[GET]: /api/customer/flights: Tim kiem cac chuyen bay

route.get("/search-flights", customerController.searchFlights);

//[POST] /api/customer/booking: Tao moi mot booking
route.post("/booking", customerController.createBooking);

//[PATCH]: /api/customer/cancle/:bookingId: Huy mot booking
route.patch("/cancel/:bookingId", customerController.cancelBooking);

//[GET] /api/customer/booking/:bookingId: Theo doi thong tin booking
route.get("/booking/:bookingId", customerController.trackBooking);

//[GET] /api/customer/booking-details/:bookingId: Lấy chi tiết thông tin booking
route.get("/booking-details/:bookingId", customerController.getBookingsDetail);

//[GET] /api/customer/profile : Xem thong tin ca nhan
route.get('/profile',verifyToken, customerController.getProfile);

// Cập nhật thông tin khách hàng
route.patch("/update-profile", verifyToken, customerController.updateProfile);

// Lấy tất cả thông tin đặt vé của người dùng
route.get("/my-bookings", verifyToken, customerController.getUserBookings);



module.exports = route;