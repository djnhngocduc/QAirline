const {User, Customer} = require("../models/index.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//[POST] /api/auth/register
exports.register = async (req, res) => {
    const {
        email,
        title,
        password,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        country_name,
        gender,
        promo_code,
    } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password : hashedpassword,
            phone: null,
            role: "customer"
        });

        //Tao customer moi
        const newCustomer = await Customer.create({
            user_id: newUser.id,
            title,
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            country_name,
            gender,
            promo_code,
        });

        //Tao ra tokentoken
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(201).json({
            message: "Tạo tài khoản thành công",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }, 
            customer: {
                id: newCustomer.id,
                title: newCustomer.title,
                first_name: newCustomer.first_name,
                middle_name: newCustomer.middle_name,
                last_name: newCustomer.last_name,
                date_of_birth: newCustomer.date_of_birth,
            },
        });
    } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình tạo tài khoản" });
    }
}

//[POST] /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        
        res.status(200).json({
            message: "Đăng nhập thành công",
            token: token
        });

    } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng nhập" });
    }
}