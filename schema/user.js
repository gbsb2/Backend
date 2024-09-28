const mongoose = require('mongoose');
const { Schema } = mongoose;

// User 스키마 정의
/**@type { mongoose.Schema } */
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // 중복검사
    },
    password: {
        type: String,
        required: true,
    }
});

// User 모델 생성
/**@type { mongoose.Model } */
const User = mongoose.model('User', userSchema);

export default User