const express = require('express')
const router = express.Router()
const axios = require('axios')
router.use(express.json())

const {body, param, validationResult} = require('express-validator')
const Quiz = require('../Backend/schema/quiz');

const validate = (req, res, next) => {
    const err = validationResult(req)
    if (err.isEmpty()) {
        return next()
    }
    else {
        return res.status(400).json(err.array())
    }
}

router
    .route('/quiz/:id')
    .get(
        [
            param('id').notEmpty().isString().withMessage('문자열로 입력 필요'),
            validate
        ]
        ,async (req, res) => {
        try {
            const {id} = req.params;
            const quiz = await Quiz.findById(id);
            if (quiz) {
                const wordList = quiz.question.split(' ')
                res.status(200).json({
                    words : wordList
                })
            } else {
                res.status(404).json({ message : "잘못된 요청입니다."})
            }
        } catch (err) {
            res.status(500).json({message : "잘못된 요청입니다."})
        }
    })

    .post(
        [
            param('id').notEmpty().isInt().withMessage('id는 숫자여야함'),
            body('answer').notEmpty().isInt().withMessage('숫자여야함'),
            validate
        ]
        ,async (req, res) => {
        try {
            const {answer} = req.body
            const {id} = req.params

            const quiz = await Quiz.findById(id)

            if(!quiz) {
                return res.status(404).json({ message : "퀴즈가 없습니다."})
            }
            if (quiz.answer == answer) {
                try {
                    const fruitResponse = await axios.get('./tree/fruit')
                    res.status(200).json({
                        message : "정답입니다",
                        fruitData : fruitResponse.data
                    })
                } catch (error) {
                    res.status(500).json({
                        message : "정답이지만 fruit api요청 중 오류 발생",
                        error : error.message
                    })
                }
            } else {
                res.status(200).json({
                    message : "틀렸습니다.",
                    correctAnswer : quiz.answer
                })
            }
        } catch (err) {
            res.status(500).json({message : "서버오류", error : err})
        }
    })

    

module.exports = router;