const axios = require('axios')
const mongoose = require("mongoose")
const Quiz = require('../schema/quiz');
const mongoose = require('mongoose')
// 퀴즈 조회
exports.getQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findOne({id});
        if (quiz) {
            const wordList = quiz.question.split(' ');
            res.status(200).json({ words: wordList });
        } else {
            res.status(404).json({ message: "잘못된 요청입니다." });
        }
    } catch (err) {
        res.status(500).json({ message: "서버 오류입니다.", error: err });
    }
};

// 퀴즈 제출
exports.submitQuiz = async (req, res) => {
    const { answer } = req.body;
    const { id } = req.params;

    try {
        const quiz = await Quiz.findOne({id});
        if (!quiz) {
            return res.status(404).json({ message: "퀴즈가 없습니다." });
        }
        if (quiz.answer == answer) {
            try {
                const fruitResponse = await axios.get('http://your-api-url.com/tree/fruit'); // 절대 URL로 변경
                res.status(200).json({
                    message: "정답입니다.",
                    fruitData: fruitResponse.data
                });
            } catch (error) {
                res.status(500).json({
                    message: "정답이지만 fruit API 요청 중 오류 발생.",
                    error: error.message
                });
            }
        } else {
            res.status(200).json({
                message: "틀렸습니다.",
                correctAnswer: quiz.answer
            });
        }
    } catch (err) {
        res.status(500).json({ message: "서버 오류입니다.", error: err });
    }
};
