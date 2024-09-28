const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");
const { authenticateJWT } = require("../middlewares/auth");

router.use(express.json())
//로그인API 호출

router.get("/:id", authenticateJWT, quizController.getQuiz)
//회원가입API 호출
router.post("/:id", authenticateJWT, quizController.submitQuiz);

module.exports = router;