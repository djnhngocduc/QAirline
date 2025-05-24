const { Post } = require('../models/index.model');
const adminService = require('../service/admin.service');

//[GET] /api/post: Lấy danh sách bài viết
exports.getPosts = async (req, res) => {
    try {
        const posts = await adminService.getPosts();
        return res.status(200).json({
            message: "Lấy danh sách bài viết thành công",
            posts: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lấy danh sách bài viết thất bại",
            error: error.message
        });
    }
}

