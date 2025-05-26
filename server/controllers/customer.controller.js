const {Op} = require('sequelize');
const {Booking, Flight, Customer,Seat, Passenger, Airplane, User} = require('../models/index.model');
const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { profile } = require('console');


//[GET] /api/customer/search-flights : Tìm kiếm chuyến bay

exports.searchFlights = async (req, res) => {
  try {
    // Lấy các tham số tìm kiếm từ query
    const { origin, destination, departure_date, return_date, seat_type } = req.query;

    // Xây dựng điều kiện tìm kiếm cho chuyến đi
    const outboundWhere = {};
    if (origin) outboundWhere.origin = origin;
    if (destination) outboundWhere.destination = destination;
    if (departure_date) {
      outboundWhere.departure_time = { [Op.gte]: new Date(departure_date) };
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
    const outboundFlights = await Flight.findAll({
      where: outboundWhere,
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
    if (outboundFlights.length === 0 && returnFlights.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy chuyến bay phù hợp." });
    }

    // Đánh dấu loại chuyến bay
    outboundFlights.forEach(flight => (flight.type = "outbound"));
    returnFlights.forEach(flight => (flight.type = "return"));

    // Trả về kết quả
    res.status(200).json({
      message: "Tìm thấy chuyến bay",
      flights: return_date
        ? { outbound: outboundFlights, return: returnFlights }
        : outboundFlights,
    });
  } catch (error) {
    console.error("Lỗi tìm kiếm chuyến bay:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

exports.createBooking = async (req, res) => {
    const {
      totalPrice,
      outboundFlight,
      returnFlight,
      passengerNumber,
      passengerDetails,
      paymentDetails,
    } = req.body;

    if (!outboundFlight ||!passengerNumber || !passengerDetails || !paymentDetails || !totalPrice) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết để tạo booking" });
    }

    try {
      let customerId = null;
      if(req.userId) {
        // Lấy thông tin khách hàng từ token
        const customer = await Customer.findOne({ where: { user_id: req.userId } });
        if (!customer) {
          return res.status(404).json({ message: "Không tìm thấy thông tin khách hàng" });
        }
        customerId = customer.id;
      }

      const outboundFlightRecord = await Flight.findByPk(outboundFlight.id);
      if (!outboundFlightRecord) {
        return res.status(404).json({ message: "Không tìm thấy chuyến bay đi" });
      }

      let returnFlightRecord = null;
      if (returnFlight) {
        returnFlightRecord = await Flight.findByPk(returnFlight.id);
        if (!returnFlightRecord) {
          return res.status(404).json({ message: "Không tìm thấy chuyến bay khứ hồi" });
        }
      }

      // Tạo booking
      const newBooking = await Booking.create({
        customer_id: customerId,
        outbound_flight_id: outboundFlight.id,
        return_flight_id: returnFlight ? returnFlight.id : null,
        departure_time: outboundFlight.departure_time,
        return_time: return_time ? outboundFlight.return_time : null,
        booking_date: new Date(),
        status: "Confirmed",
        passenger: passengerNumber,
        payment_status: "Paid",
        payment_method: paymentDetails.paymentMethod,
        cardholder_name: paymentDetails.cardholderName,
        card_number: paymentDetails.cardNumber,
        expiry_date: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        total_price: totalPrice,
        outbound_seat_id: outboundFlight.seat_id,
        return_seat_id: returnFlight ? returnFlight.seat_id : null,
      });

      await Passenger.create({
        booking_id: newBooking.id,
        first_name: passengerDetails.firstName,
        last_name: passengerDetails.lastName,
        email: passengerDetails.email,
        phone: passengerDetails.phone,
      });

      res.status(201).json({
        message: "Tao booking thành công",
        booking: newBooking
      })

      
    } catch (error) {
      console.error("Lỗi khi tạo booking:", error);
      res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    }
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

//[PUT] /api/customer/update-profile : Cập nhật thông tin ca nhan
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
        promo_code
    } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        user.email = email || user.email;
        user.phone = phone || user.phone;

        user.profilePicture = profilePicture
        await user.save();

        //Cap nhat thong tin khach hang
        const customer = await Customer.findOne({ where: { user_id: userId } });
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy thông tin khách hàng" });
        }

        const customerUpdates = {};
        if (address) customerUpdates.address = address;
        if (country_name) customerUpdates.country_name = country_name;
        if (title) customerUpdates.title = title;
        if (country_code) customerUpdates.country_code = country_code;
        if (first_name) customerUpdates.first_name = first_name;
        if (middle_name) customerUpdates.middle_name = middle_name;
        if (last_name) customerUpdates.last_name = last_name;
        if (date_of_birth) customerUpdates.date_of_birth = date_of_birth;
        if (gender) customerUpdates.gender = gender;
        if (promo_code) customerUpdates.promo_code = promo_code;
        await customer.update(customerUpdates);
        
         res.status(200).json({
            message: "Profile updated successfully",
            user: {
                email: user.email,
                phone: user.phone,
                profilePicture: user.profilePicture,
            },
            customer: customerUpdates,
        });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
    }
}

//[GET] /api/customer/my-bookings : Lấy tất cả thông tin đặt vé của người dùng
exports.getUserBookings = async (req, res) => {
    const userId = req.userId; // Lấy userId từ token đã xác thực
    try {
        const customer = await Customer.findOne({
          where : {user_id: userId},
        });
        if(!customer) {
          res.status(404).json({
            message: "Không tìm thấy người dùng"
          })
        }

        const booking = await Booking.findAll({
          where: { customer_id: customer.id},
          include: 
          [
            {
              model: Passenger,
              attributes: ["first_name", "last_name", "email", "phone"],
            }, 

            {
              model: Flight,
              as: "outboundFlight",
              attributes: [
                "origin",
                "destination",
                "departure_time",
                "arrival_time",
                "status",
                "duration"
              ]
            }, 

            {
              model: Flight,
              as: "returnFlight",
              attributes: [
                "origin",
                "destination",
                "departure_time",
                "arrival_time",
                "status",
                "duration",
              ],
            },

            {
              model: Seat,
              as: "outboundSeat",
              attributes: ["seat_type", "seat_number"]
            },

            {
              model: Seat,
              as: "returnSeat",
              attributes: ["seat_type", "seat_number"]
            }
          ]
        });

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy thông tin đặt vé",
            error: error.message
        });
    }
}