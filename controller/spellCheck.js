const hs = require("hanspell")
const SpellingCheckLog = require("../schema/spellCheck")

exports.spellcheck = async (req,res) => {
    const data = []
    save = (d) => {
        data.append(d)
    }
    
    send = () => {
        if (req.user != undefined)
        SpellingCheckLog(
            req.user.userId,
            req.body.sentence,
            data,
        )
        res.status(200).json({
            result: data
        })
    }
    error = (e) => {
        res.status(500).json({
            result: data,
            error: e
        })
        return
    }
    hs.spellCheckByDAUM(req.body.sentence, save, send, error)
    hs.spellCheckByPNU(req.body.sentence, save, send, error)
}

exports.checklog = async (req,res) => {

}