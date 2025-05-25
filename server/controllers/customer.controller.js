const {Op} = require('sequelize');
const {Booking, Flight, Customer,Seat, Passenger, Airplane, User} = require('../models/index.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//[GET] /api/customer/search-flights : Tìm kiếm chuyến bay

exports.searchFlights = async (req, res) => {
    try {
        const { origin, destination, departure_date, return_date, seat_type } = req.query;

        //Tim kiem chuyen bay di 
        const outgoingwhere = {};
        if (origin) {
            outgoingwhere.origin = origin;
        }
        if (destination) {
            outgoingwhere.destination = destination;
        }

        if (departure_date) {
            outgoingwhere.departure_time = {
                [Op.gte]: new Date(departure_date) // Chuyến bay khởi hành sau thời gian này
            }
        }

        // Tim kiem chuyen bay khua hoi (neu co)
        let returnWhere = {};
        if (return_date) {
            returnWhere = {    
                origin: destination, // Chuyến bay khứ hồi sẽ có điểm đến là điểm đi của chuyến đi
                destination: origin, // và điểm đi là điểm đến của chuyến đi
                departure_time: {
                    [Op.gte]: new Date(return_date) // Chuyến bay khởi hành sau thời gian này
                }
            };
        }

        //Tim kiem ghe ngoi
        const seatInclude = {
            model: Seat,
            attributes: ["id","seat_type", "seat_number", "is_available", "price"],
            where: {
                is_available: true // Chỉ lấy ghế còn trống
            },
        }
        if(seat_type) {
            seatInclude.where.seat_type = seat_type; // Lọc theo loại ghế nếu có 
        }

        //Tim kiem chuyen bay di phu hop dieu kien
        const outgoingFlights = await Flight.findAll({
            where: outgoingwhere,
            include: [
                {
                    model: Airplane,
                    attributes: ["model", "manufacturer"]
                },
                seatInclude
            ]
        })

        //Tim chuyen bay khua hoi phu hop dieu kien
        let returnFlights = [];
        if(returnWhere) {
            returnFlights = await Flight.findAll({
                where: returnWhere,
                include: [
                    {
                        model: Airplane,
                        attributes: ["model", "manufacturer"]
                    },
                    seatInclude
                ]
            });
        }

        //Khong tim thay chuyen bay nao
        if (outgoingFlights.length === 0 && returnFlights.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy chuyến bay phù hợp" });
        }

        // Đánh dấu chuyến bay đi và chuyến bay khứ hồi
        outgoingFlights.forEach(flight => {
            flight.type = 'outgoing'; // Đánh dấu chuyến bay đi
        });
        returnFlights.forEach(flight => {
            flight.type = 'return'; // Đánh dấu chuyến bay khứ hồi
        });

        return res.status(200).json({
            message: "Tìm kiếm chuyến bay thành công",
            flights: return_date ? { outgoing: outgoingFlights, return: returnFlights } : outgoingFlights
        })

    } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyến bay:", error);
        return res.status(500).json({ message: "Lỗi khi tìm kiếm chuyến bay" });
    }
}

exports.createBooking = async (req, res) => {

}

exports.cancelBooking = async (req, res) => {

}

exports.trackBooking = async (req, res) => {

}

exports.getBookingsDetail = async (req, res) => {

}


//[GET] /api/customer/profile : Xem thong tin ca nhan
exports.getProfile = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ token đã xác thực
        const customer = await Customer.find({
            where: {user_id: userId},
            include: [
                {
                    model: User,
                    attributes: ["profilePicture","email","phone"]
                }
            ]
        })
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
        }
        return res.status(200).json({
            message: "Lấy thông tin người dùng thành công",
            customer: customer
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
}


exports.updateProfile = async (req, res) => {

}

exports.getUserBookings = async (req, res) => {

}