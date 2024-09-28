const hs = require("hanspell")

module.main = async (req,res) => {
    res.send()
}

module.spellcheck = async (req,res) => {
    const data = []
    save = (d) => {
        data.append(d)
    }
    
    send = () => {
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