const express = require('express')
const {spellcheck} = require("../controller/spellCheck")
const { authenticateJWT } = require("../middlewares/auth");
const router = express.Router()

router.post("/", authenticateJWT, spellcheck)

module.exports = router