const { Flight, Airplane } = require('../models/index.model');
const flightService = require('../service/flight.service');


//[GET] /api/flight
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await flightService.getAllFlights();
        return res.status(200).json(flights);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy chuyến bay" });
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
            const newFlight = await flightService.addFlight(req.body);
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
        if(!deletedFlight) {
            return res.status(404).json({ message: "Chuyến bay không tồn tại" });
        }
        res.status(200).json({ message: "Chuyến bay đã được xóa thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa chuyến bay" });
    }
}
