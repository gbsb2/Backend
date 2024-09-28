const express = require("express");
const router = express.Router();
const gemini = require("../controller/gemini");
const { authenticateJWT } = require("../middlewares/auth");

router.get("/gemini", gemini.getGemini);

module.exports = router;