const express = require('express');
const route = express.Router();
const controller = require("../controllers/post.controller");

//[GET] /api/post: Lấy danh sách bài viết
route.get("/", controller.getPosts);


module.exports = route;