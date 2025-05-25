const {Op} = require('sequelize');
const {Booking, Flight, Customer,Seat, Passenger, Airplane, User} = require('../models/index.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//[GET] /api/customer/search-flights : Tìm kiếm chuyến bay

exports.searchFlights = async (req, res) => {
  try {
    // Lấy các tham số tìm kiếm từ query
    const { origin, destination, departure_date, return_date, seat_type } = req.query;

    // Xây dựng điều kiện tìm kiếm cho chuyến đi
    const outgoingWhere = {};
    if (origin) outgoingWhere.origin = origin;
    if (destination) outgoingWhere.destination = destination;
    if (departure_date) {
      outgoingWhere.departure_time = { [Op.gte]: new Date(departure_date) };
    }

    // Xây dựng điều kiện tìm kiếm cho chuyến khứ hồi (nếu có)
    let returnWhere = null;
    if (return_date) {
      returnWhere = {
        origin: destination,
        destination: origin,
        departure_time: { [Op.gte]: new Date(return_date) },
      };
    }

    // Xây dựng điều kiện cho ghế (nếu có seat_type)
    const seatInclude = {
      model: Seat,
      attributes: ["id", "seat_type", "seat_number", "is_available", "price"],
      where: { is_available: true },
    };
    if (seat_type) seatInclude.where.seat_type = seat_type;

    // Truy vấn chuyến bay đi
    const outgoingFlights = await Flight.findAll({
      where: outgoingWhere,
      include: [
        seatInclude,
        {
          model: Airplane,
          attributes: ["model", "manufacturer"],
        },
      ],
    });

    // Truy vấn chuyến bay khứ hồi (nếu có)
    let returnFlights = [];
    if (returnWhere) {
      returnFlights = await Flight.findAll({
        where: returnWhere,
        include: [
          seatInclude,
          {
            model: Airplane,
            attributes: ["model", "manufacturer"],
          },
        ],
      });
    }

    // Nếu không tìm thấy chuyến bay nào
    if (outgoingFlights.length === 0 && returnFlights.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy chuyến bay phù hợp." });
    }

    // Đánh dấu loại chuyến bay
    outgoingFlights.forEach(flight => (flight.type = "outgoing"));
    returnFlights.forEach(flight => (flight.type = "return"));

    // Trả về kết quả
    res.status(200).json({
      message: "Tìm thấy chuyến bay",
      flights: return_date
        ? { outgoing: outgoingFlights, return: returnFlights }
        : outgoingFlights,
    });
  } catch (error) {
    console.error("Lỗi tìm kiếm chuyến bay:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

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
    const userId = req.userId; // Lấy userId từ token đã xác thực
    const {
        email,
        phone, 
        profilePicture,
        address,
        country_name,
        title,
        country_code,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        promote_code
    } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        user.email = email || user.email;
        user.phone = phone || user.phone;

        

    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
    }

}

exports.getUserBookings = async (req, res) => {

}