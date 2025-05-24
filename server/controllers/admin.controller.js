const {Post , Airplane, Flight, Booking } = require('../models/index.model');
const adminService = require('../service/admin.service');

//[POST]: /api/admin/post: Tạo bài viết mới
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

//[POST]:   /api/admin/airplane: Tạo máy bay mới
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

//[POST]: /api/admin/flight: Tạo chuyến bay mới
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

//[GET]: /api/admin/bookings: Lấy danh sách đặt chỗ
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

//[PATCH]: /api/admin/flight/:flightId/status: Cập nhật trạng thái chuyến bay
exports.updateFlightStatus = async (req,res) => {
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

//[PATCH]: /api/admin/airplane/seatCount: Cập nhật số lượng ghế ngồi
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

//[DELETE]: /api/admin/post/delete/:id: Xóa bài viết theo id
exports.deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await adminService.deletePost(id);
        return res.status(200).json({
            message: "Xóa bài viết thành công",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Xóa bài viết thất bại",
            error: error.message
        });
    }
}

//[PATCH]: /api/admin/post/edit/:id: Cập nhật bài viết theo id
exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const { title, image, cta } = req.body;
    try {
        const post = await adminService.editPost(id, title, image, cta);
        return res.status(200).json({
            message: "Cập nhật bài viết thành công",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Cập nhật bài viết thất bại",
            error: error.message
        });
    }
}


