const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");
const { authenticateJWT } = require("../middlewares/auth");

router.use(express.json())
//로그인API 호출

router.get("/quiz/:id", quizController.getQuiz)
//회원가입API 호출
router.post("/quiz/:id", quizController.submitQuiz);

module.exports = router;