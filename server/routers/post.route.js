const express = require('express');
const route = express.Router();
const controller = require("../controllers/post.controller");

//[GET] /api/post: Lấy danh sách bài viết
route.get("/", controller.getPosts);

//[DELETE] /api/post/:id: Xóa bài viết theo id
route.delete("/:id", controller.deletePost);

//[PATCH] /api/post/:id: Cập nhật bài viết theo id
route.patch("/:id", controller.editPost);

module.exports = route;