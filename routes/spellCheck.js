const express = require('express')
const spellcheck = require("../controller/spellCheck")
const { authenticateJWT, optionalAuthentication } = require("../middlewares/auth");
const router = express.Router()

router.post("/", optionalAuthentication, spellcheck.spellcheck);

router.post("/log/:userID", authenticateJWT, spellcheck.checklog);

module.exports = router