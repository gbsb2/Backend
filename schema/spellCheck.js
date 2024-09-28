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
        required: true,
    },
    input: {
        type: String,
        required: true, // 입력된 내용
    },
    result: {
        type: String,
        required: true, // 검사 결과
    },
    incorrectCount: {
        type: Number,
        default: 0, // 틀린 개수
    },
    incorrectParts: {
        type: [String], // 틀린 부분 배열
        default: [], // 기본값은 빈 배열
    },
    experienceGained: {
        type: Number,
        default: 0, // 증가한 경험치량
    }
});

// 맞춤법 검사 로그 모델 생성
const SpellingCheckLog = mongoose.model('SpellingCheckLog', spellingCheckLogSchema);

module.exports = SpellingCheckLog;
