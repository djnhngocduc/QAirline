const Airplain = require("../models/airplane.model");

exports.getAllAirplanes = async (req, res) => {
    try {
        const airplanes = await Airplain.findAll({
            attributes: ["model"]
        });
        return res.status(200).json(airplanes);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách máy bay" });
    }
}

