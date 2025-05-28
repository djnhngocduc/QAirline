const {Post , Airplane, Flight, Booking} = require('../models/index.model');
const adminService = require('../service/admin.service');
const flightService = require('../service/flight.service');

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

// //[POST]: /api/admin/flight: Tạo chuyến bay mới
// exports.addFlight = async (req, res) => {
//     const {
//     flightNumber,
//     airplaneId,
//     origin,
//     destination,
//     departureTime,
//     arrivalTime } = req.body;

//     try {
//         const flight = await adminService.addFlight(
//             flightNumber,
//             airplaneId,
//             origin,
//             destination,
//             departureTime,
//             arrivalTime
//         );
//         return res.status(201).json({
//             message: "Tạo chuyến bay thành công",
//             flight
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Tạo chuyến bay thất bại",
//             error: error.message
//         });
//     }
// }

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
exports.editPost = async (req, res) => {
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


// //[POST] /api/admin/airplane Them máy bay mới
// exports.addAirplane = async (req,res) => {
//     const { model, manufacturer, seat_count} = req.body;
//     try {
//         const airplane = await adminService.addAirplane(model, manufacturer, seat_count);
//         return res.status(201).json({
//             message: "Thêm máy bay thành công",
//             airplane
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Thêm máy bay thất bại",
//             error: error.message
//         });
//     }
// }

//[PATCH] /api/admin/airplane/:id Cap nhật máy bay theo id

exports.updateAirplane = async (req,res) => {
    const id = req.params.id;
    const { model, manufacturer, seat_count } = req.body;
    try {
        const newAirplane = await adminService.updateAirplane(id, model, manufacturer, seat_count);
        return res.status(200).json({
            message: "Cập nhật máy bay thành công",
            airplane: newAirplane
        });
    } catch (error) {
        return res.status(500).json({
            message: "Cập nhật máy bay thất bại",
            error: error.message
        });
    }
}

// [DELETE] /api/admin/airplane/:id Xoa máy bay theo id
exports.deleteAirplane = async (req, res) => {
    const id = req.params.id;
    try {
        const airplane = await adminService.deleteAirplane(id);
        return res.status(200).json({
            message: "Xóa máy bay thành công",
            airplane
        });
    } catch (error) {
        return res.status(500).json({
            message: "Xóa máy bay thất bại",
            error: error.message
        });
    }
}

//[POST] /api/flight
exports.addFlight = async (req, res) => {
    const {
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        status,
        airplaneModel
    } = req.body;
    try {
        const newFlight = await flightService.addFlight(
            flightNumber,
            origin,
            destination,
            departureTime,
            arrivalTime,
            status,
            airplaneModel
        );
        return res.status(201).json(newFlight);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi thêm chuyến bay" });
    }
}

//[PATCH] /api/flight/:id
exports.editFlight = async (req, res) => {
    const flightId = req.params.id;
    const {
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        status,
        airplaneModel
    } = req.body;
    
    try {
        const updatedFlight = await flightService.editFlight(
            flightId,
            flightNumber,
            origin,
            destination,
            departureTime,
            arrivalTime,
            status,
            airplaneModel
        );
        return res.status(200).json(updatedFlight);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật chuyến bay" });
    }
}

//[DELETE] /api/flight/:id
exports.deleteFlight = async (req, res) => {
    const flightId = req.params.id;
    try {
        const deletedFlight = await flightService.deleteFlight(flightId);
        if (!deletedFlight) {
            return res.status(404).json({ message: "Chuyến bay không tồn tại" });
        }
        return res.status(200).json({ message: "Xóa chuyến bay thành công" });
    }
    catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa chuyến bay" });
    }
}
