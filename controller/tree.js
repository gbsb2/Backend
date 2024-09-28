const Tree = require("../schema/tree")

exports.treeGrow = async (req, res) => {
    var tree = await Tree.findOne({userId: req.user.userID})
    if (!tree){
        tree = new Tree({userId: req.user.userID})
        await tree.save()
    }

    res.status(200, {
        exp: tree.exp,
        fruitExp: tree.fruitExp
    })
}
exports.fruitGrow = async (req, res) => {
    try{
        const tree = await Tree.findOne({userId: req.user.userID})
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