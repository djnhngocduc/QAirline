const { Post, Flight, Booking, Airplane, Passenger, Seat } = require('../models/index.model');

//[POST] /api/admin/post: Tạo bài viết mới

exports.createPost = async (
    title,
    image,
    cta,
    content,
    postType,
    startDate,
    endDate,
    adminId
) => {
    return await Post.create({
        title,
        image,
        cta,
        content,
        post_type: postType, // Đúng tên trường trong model
        start_date: startDate || null,
        end_date: endDate || null,
        admin_id: adminId
    });
}

// //[POST] /api/admin/airplane: Tạo máy bay mới
// exports.addAirplane = async (
//     model,
//     manufacturer,
//     seat_count,
//     airlineId
// ) => {
//     return await Airplain.create({
//         model,
//         manufacturer,
//         seat_count,
//         airlineId
//     });
// }

//[POST] /api/admin/flight: Tạo chuyến bay mới
exports.addFlight = async (
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
) => {
    return await Flight.create({
        flightNumber,
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        status: "scheduled"
    })
}

// //[GET] /api/admin/bookings: Lấy danh sách đặt chỗ
exports.viewBookings = async () => {
    const bookings = await Booking.findAll({
      include: [
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
          ],
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
          ],
        },
        {
          model: Seat,
          as: "outboundSeat",
          attributes: ["seat_number", "seat_type"],
        },
        {
          model: Seat,
          as: "returnSeat",
          attributes: ["seat_number", "seat_type"],
        },
      ],
    });
    return bookings;
}

//[PUT] api/admin/flight/:flightId/status Cập nhật trạng thái chuyến bay
exports.updateFlightStatus = async (flightId, newStatus) => {
    const flight = await Flight.findByPk(flightId);
    if(!flight) {
        throw new Error("Flight not found");
    }
    flight.status = newStatus;
    await flight.save();
    return flight;
}

//[PUT] api/admin/airplane/seatCount: Cập nhật số lượng ghế ngồi
exports.updateSeatCount = async (airplaneId, newSeatCount) => {
    const airplane = await Airplain.findByPk(airplaneId);
    if(!airplane) {
        throw new Error("Airplane not found");
    }
    airplane.seat_count = newSeatCount;
    await airplane.save();
    return airplane;
}

//[GET] api/post: Lấy danh sách bài viết
exports.getPosts = async() => {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch(error) {
        console.error(error);
        throw new Error("Lấy danh sách bài viết thất bại");
    }
}

//[DELETE] api/post/:id: Xóa bài viết
exports.deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if(!post) {
        throw new Error("Bài viết không tồn tại");
    }
    await post.destroy();
    return post;
}

//[PATCH] api/post/:id: Cập nhật bài viết
exports.editPost = async(id,title, image, cta) => {
    const post = await Post.findByPk(id);
    if(!post) {
        throw new Error("Bài viết không tồn tại");
    }
    post.title = title;
    post.image = image;
    post.cta = cta;
    await post.save();
    return post;
}

//[POST] /api/admin/airplane Them máy bay mới
exports.addAirplane = async (model, manufacturer, seat_count) => {
    return await Airplane.create({
        model,
        manufacturer,
        seat_count,
    });
}

//[PATCH] /api/admin/airplane/:id Cap nhật máy bay theo id
exports.updateAirplane = async (id, model, manufacturer, seat_count) => {
    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
        throw new Error("Máy bay không tồn tại");
    }
    airplane.model = model;
    airplane.manufacturer = manufacturer;
    airplane.seat_count = seat_count;
    await airplane.save();
    return airplane;
}

// [DELETE] /api/admin/airplane/:id Xoa máy bay theo id
exports.deleteAirplane = async (id) => {
    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
        throw new Error("Máy bay không tồn tại");
    }
    await airplane.destroy();
}