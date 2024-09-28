const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authenticateJWT } = require("../middlewares/auth");


//로그인API 호출
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/logout", userController.logout);

module.exports = router;