const mongoose = require('mongoose');
const { Schema } = mongoose;

// 맞춤법 검사 로그 스키마 정의
const spellingCheckLogSchema = new Schema({
    checkTime: {
        type: Date,
        default: Date.now, // 기본값으로 현재 시간
    },
    userId: {
        type: Schema.Types.ObjectId, // 사용자 ID를 참조
        ref: 'User',
        // required: true,
    },
    input: {
        type: String,
        required: true, // 입력된 내용
    },
    result: {
        type: Array,
        required: true, // 검사 결과
    }
});

// 맞춤법 검사 로그 모델 생성
const SpellingCheckLog = mongoose.model('SpellingCheckLog', spellingCheckLogSchema);

module.exports = SpellingCheckLog;
