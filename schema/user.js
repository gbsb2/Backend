const mongoose = require('mongoose');
const { Schema } = mongoose;

// User 스키마 정의
/**@type { mongoose.Schema } */
const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true, // 중복검사
    }, 
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 5
    },
    lastUse: {
        type: Number,
        default: 0
    },
    correctQuiz: {
        type: Array,
        default: []
    },
    incorrectQuiz: {
        type: Array,
        default: []
    }
});

// User 모델 생성
/**@type { mongoose.Model } */
const User = mongoose.model('User', userSchema);

module.exports = User;