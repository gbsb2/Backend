// Quiz 스키마 정의
const mongo = require('mongoose')
const quizSchema = new mongo.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    question: {
        type: Array,
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    }
});

// Quiz 모델 생성

const Quiz = mongo.model('Quiz', quizSchema);
module.exports = Quiz
