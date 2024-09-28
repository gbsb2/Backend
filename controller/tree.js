const Tree = require("../schema/tree")

exports.treeGrow = async (req, res) => {
    const tree = await Tree.findOne({userId: req.user.userId})
    res.status(200, {
        exp: tree.exp,
        fruitExp: tree.fruitExp
    })
}
exports.fruitGrow = async (req, res) => {
    try{
        const tree = await Tree.findOneAndUpdate({userId: req.user.userId})
        tree.fruitExp += 1
        await tree.save()
        res.status(200, {
            msg: "success"
        })
    }catch (e) {
        res.status(500, {
            msg: "error",
            error: e
        })
    }
}