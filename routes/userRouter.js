const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


//로그인API 호출
router.post("/login", userController.login);

module.exports = router;