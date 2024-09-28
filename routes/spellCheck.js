const express = require('express')
const {main, spellcheck} = require("../controller/spellCheck")
const router = express.Router()

router.get("/", main)
router.post("/", spellcheck)

module.exports = router