const mongoose = require('mongoose');
const { Schema } = mongoose;

// User 스키마 정의
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
    }
});

// User 모델 생성
const User = mongoose.model('User', userSchema);


module.exports = User;