const express = require("express")
const router = express.Router()
const Tree = require("../schema/tree")
const {treeGrow, fruitGrow} = require("../controller/tree")
const { authenticateJWT } = require("../middlewares/auth");


router.post("/", authenticateJWT, treeGrow)
router.post("/fruit", authenticateJWT, fruitGrow)

module.exports = router