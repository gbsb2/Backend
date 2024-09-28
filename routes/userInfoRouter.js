const express = require("express");
const router = express.Router();
const userInfoController = require("../controller/userInfoController");
const { authenticateJWT } = require("../middlewares/auth");

router.use(express.json())
//로그인API 호출
router.post("/", authenticateJWT, userInfoController.info);

module.exports = router;