const mongoose = require("mongoose");

// Tree 스키마 정의
/*
* @type {}
*/
const treeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // 사용자 ID를 참조
        ref: 'User',
        required: true,
    },
    exp: {
        type: Number,
        default: 0,
    },
    fruitExp: {
        type: Number,
        default: 0, // 열매 경험치
    }
});

// Tree 모델 생성
/**
 * @type {mongoose.Model}
 */
const Tree = mongoose.model('Tree', treeSchema);

module.exports = Tree