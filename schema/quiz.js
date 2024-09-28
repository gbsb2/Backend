// Quiz 스키마 정의
const quizSchema = new Schema({
    id : {
        type : Schema.Types.ObjectId,
        required : true,
        unique : true
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
});

// Quiz 모델 생성
const Quiz = mongoose.model('Quiz', quizSchema);
