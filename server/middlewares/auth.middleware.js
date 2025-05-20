const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).json({ message: "Vui lòng cung cấp token" });
    }
    const token = authorization.split(' ')[1];
    if(!token) {
        return res.status(403).json({ message: "Người dùng chưa đăng nhập" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token không hợp lệ." });

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
}