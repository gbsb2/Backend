const express = require("express")
const router = express.Router()
const Tree = require("../schema/tree")
const {treeGrow, fruitGrow} = require("../controller/tree")

router.post("/", treeGrow)
router.post("/fruit", fruitGrow)

export default router