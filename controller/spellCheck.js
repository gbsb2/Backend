const hs = require("hanspell")
const SpellingCheckLog = require("../schema/spellCheck")
const User = require("../schema/user");
const Tree = require("../schema/tree")

exports.spellcheck = async (req,res) => {
    var data = []
    const errors = []
    save = (d) => {
        d.map((x) => {
            return {
                info:x["info"],
                suggestions: x['suggestions'],
                token: x['token']
            }
        })
        data = data.concat(d)
    }
    
    send = async () => {
        const sentence = req.body.sentence
        var exp = 200
        if (req.user != undefined) {
            const user = await User.findById(req.user.userID)
            await new SpellingCheckLog({
                userId: user._id,
                input: sentence,
                result: data,
            }).save()
            const tree = await Tree.findOne({userId: user._id})
            if (Math.abs(new Date().getDate() - user.lastUse) > 0)
                user.count = 5
            if (user.count != 0){
                if (data.length == 0)
                    exp = 220
                tree.exp += exp
                user.count -= 1
                user.lastUse = new Date().getDate()
                await user.save()
                await tree.save()
                return res.status(200).json({
                    result: data,
                    exp: exp
                })
            }
        }
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
    // hs.spellCheckByDAUM(req.body.sentence, 6000, save, () => {}, error_)
    hs.spellCheckByPNU(req.body.sentence, 6000, save, send, error)
}
exports.checklog = async (req, res) => {
    try {
        const { userID } = req.user;

        //url파라미터 userID와 로그인된 userID가 일치하는지 검사
        // if(userID != req.user.userID) {
        //     return res.status(403).json({ message: "접근 권한이 없습니다."});
        // }

        // userID에 해당하는 사용자의 기록 조회
        const targetUser = await User.findById(userID);
        if(!targetUser) {
            return res.status(404).json({ message : "사용자를 찾을 수 없습니다."})
        }
        const userLog = await SpellingCheckLog.find({ userId: targetUser._id });

        // 사용자의 기록이 없을 경우
        if (!userLog || userLog.length === 0) {
            return res.status(404).json({ message: "사용자 로그를 찾을 수 없습니다." });
        }

        // 사용자의 기록이 있을 경우
        return res.status(200).json({
            message: "사용자의 맞춤법 검사결과 로그 조회 성공",
            logs: userLog
        });
    } catch (error) {
        // 에러 발생 시 500 상태 코드 반환
        return res.status(500).json({
            message: "서버 에러 발생",
            error: error.message
        });
    }
};