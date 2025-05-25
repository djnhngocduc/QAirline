const express = require('express');
const route = express.Router();
const customerController = require("../controllers/customer.controller");

//[GET]: /api/customer/flights: Tim kiem cac chuyen bay

route.get("/search-flights", customerController.searchFlights);

//[GET] /api/customer/profile : Xem thong tin ca nhan
route.get('/profile', customerController.getProfile);

//[POST] /api/customer/booking: Tao moi mot booking
route.post("/booking", customerController.createBooking);

//[PATCH]: /api/customer/cancle/:bookingId: Huy mot booking
route.patch("/cancle/:bookingId", customerController.cancelBooking);

//[GET] /api/customer/booking/:bookingId: Theo doi thong tin booking
route.get("/booking/:bookingId", customerController.trackBooking);

route.get("/booking-details/:bookingId", customerController.getBookingsDetail);

route.get("/bookings", customerController.getAllBookings);

// Lấy tất cả thông tin của khách hàng đã đăng nhập
router.get("/my-info", verifyToken, customerController.getLoggedInCustomerInfo);

// Cập nhật thông tin khách hàng
router.patch("/update-profile", verifyToken, customerController.updateProfile);

// Lấy tất cả thông tin đặt vé của người dùng
router.get("/my-bookings", verifyToken, customerController.getUserBookings);



module.exports = route;