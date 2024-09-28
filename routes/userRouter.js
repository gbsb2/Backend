const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authenticateJWT } = require("../middlewares/auth");


//로그인API 호출
router.post("/login", userController.login);

//회원가입API 호출
router.post("/signup", userController.signup);

//로그아웃API호출
router.post("/logout", userController.logout);

module.exports = router;