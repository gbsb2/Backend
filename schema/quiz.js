// Quiz 스키마 정의

import mongoose from "mongoose";

/**@type { mongoose.Schema } */
const quizSchema = new Schema({
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

export default Quiz