const express = require('express')
const {spellcheck} = require("../controller/spellCheck")
const { authenticateJWT, optionalAuthentication } = require("../middlewares/auth");
const router = express.Router()

router.post("/", optionalAuthentication, spellcheck);

module.exports = router