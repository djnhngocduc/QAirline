const {Post , Airplane, Flight, Booking } = require('../models/index.model');
const adminService = require('../service/admin.service');

//[POST]
exports.createPost = async (req, res) => {
    const {image, title,content , postType, startDate, endDate} = req.body;
    const adminId = req.userId;
    try {
        const post = await adminService.createPost(
            image,
            title,
            content,
            postType,
            startDate,
            endDate,
            adminId
        );
        return res.status(201).json({
            message: "Tạo bài viết thành công",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Tạo bài viết thất bại",
            error: error.message
        });
    }
}

//[POST]
exports.addAirplane = async (req, res) => {
    const { model, manufacturer, seatCount , airlineId } = req.body;
    try {
        const airplane = await adminService.addAirplane(
            model,
            manufacturer,
            seatCount,
            airlineId
        );
        return res.status(201).json({
            message: "Tạo máy bay thành công",
            airplane
        });
    } catch (error) {
        return res.status(500).json({
            message: "Tạo máy bay thất bại",
            error: error.message
        });
    }
}

exports.addFlight = async (req, res) => {
    const {
    flightNumber,
    airplaneId,
    origin,
    destination,
    departureTime,
    arrivalTime } = req.body;

    try {
        const flight = await adminService.addFlight(
            flightNumber,
            airplaneId,
            origin,
            destination,
            departureTime,
            arrivalTime
        );
        return res.status(201).json({
            message: "Tạo chuyến bay thành công",
            flight
        });
    } catch (error) {
        return res.status(500).json({
            message: "Tạo chuyến bay thất bại",
            error: error.message
        });
    }
}

//[GET]
exports.viewBookings = async (req, res) => {
    try {
        const bookings = await adminService.viewBookings();
        return res.status(200).json({
            message: "Lấy danh sách đặt chỗ thành công",
            bookings
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lấy danh sách đặt chỗ thất bại",
            error: error.message
        });
    }
}

//[PUT]
exports.updateFlightStatus = async (req, res) => {
    const { flightId, newStatus } = req.body;
    try {
        const flight = await adminService.updateFlightStatus(flightId, newStatus);
        return res.status(200).json({
            message: "Cập nhật trạng thái chuyến bay thành công",
            flight
        });
    } catch (error) {
        return res.status(500).json({
            message: "Cập nhật trạng thái chuyến bay thất bại",
            error: error.message
        });
    }
}

exports.updateSeatCount = async (req, res) => {
    const { airplaneId, newSeatCount } = req.body;
    try {
        const airplane = await adminService.updateSeatCount(airplaneId, newSeatCount);
        return res.status(200).json({
            message: "Cập nhật số lượng ghế ngồi thành công",
            airplane
        });
    } catch (error) {
        return res.status(500).json({
            message: "Cập nhật số lượng ghế ngồi thất bại",
            error: error.message
        });
    }
}