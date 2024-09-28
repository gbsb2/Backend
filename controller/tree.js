const Tree = require("../schema/tree")
const User = require("../schema/user")

exports.treeGrow = async (req, res) => {
    var tree = await Tree.findOne({userId: req.user.userID})
    console.log(tree)
    if (!tree){
        tree = new Tree({userId: req.user.userID})
        await tree.save()
    }

    res.status(200).json({
        exp: tree.exp,
        fruitExp: tree.fruitExp
    })
}
exports.fruitGrow = async (req, res) => {
    try{
        const user = await User.findById(req.body.userID)
        const tree = await Tree.findOne({userId: user._id})
        tree.fruitExp += 1
        await tree.save()
        res.status(200).json({
            msg: "success"
        })
    }catch (e) {
        console.error(e)
        res.status(500).json({
            msg: "error",
            error: e
        })
    }
}