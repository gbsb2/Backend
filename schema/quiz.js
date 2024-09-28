// Quiz 스키마 정의
const quizSchema = new Schema({
    id : {
        type : Schema.Types.ObjectId,
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
/**@type { mongoose.Model } */
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz