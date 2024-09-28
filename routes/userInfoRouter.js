const express = require("express");
const router = express.Router();
const userInfoController = require("../controller/userInfoController");
const { authenticateJWT } = require("../middlewares/auth");


//로그인API 호출
router.post("/", userInfoController.info);

module.exports = router;