const express = require('express');
const route = express.Router();
const postController = require("../controllers/post.controller");

//[GET] /api/post: Lấy danh sách bài viết
route.get("/", postController.getPosts);


module.exports = route;