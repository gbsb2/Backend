// Tree 스키마 정의
const treeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // 사용자 ID를 참조
        ref: 'User',
        required: true,
    },
    growthExperience: {
        usageCount: {
            type: Number,
            default: 0, // 사용 횟수
        },
        bonusPoints: {
            type: Number,
            default: 0, // 다 맞으면 가산점
        }
    },
    fruitExperience: {
        type: Number,
        default: 0, // 열매 경험치
    },
    quizCorrectCount: {
        type: Number,
        default: 0, // 퀴즈 맞은 횟수
    }
});

// Tree 모델 생성
const Tree = mongoose.model('Tree', treeSchema);
