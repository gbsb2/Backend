const hs = require("hanspell")
const SpellingCheckLog = require("../schema/spellCheck")

exports.spellcheck = async (req,res) => {
    const data = []
    const errors = []
    save = (d) => {
        data.push(d)
    }
    
    send = async () => {
        if (req.user != undefined)
        await new SpellingCheckLog(
            req.user.userId,
            req.body.sentence,
            data,
        ).save()
        else
        await new SpellingCheckLog(
            req.user.userId,
            req.body.sentence,
            data,
        ).save()
        res.status(200).json({
            result: data
        })
    }
    error_ = (e) => {
        console.log(errors, e)
        errors.push(e)

    }
    error = (e) => {
        errors.push(e)
        console.log(errors, e)
        res.status(500).json({
            result: data,
            error: errors
        })
        return
    }
    hs.spellCheckByDAUM(req.body.sentence, 6000, save, () => {}, error_)
    hs.spellCheckByPNU(req.body.sentence, 6000, save, send, error)
}

exports.checklog = async (req,res) => {

}