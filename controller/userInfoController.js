const axios = require('axios');
const User = require('../schema/user');
const mongoose = require('mongoose')
// 퀴즈 조회
exports.info = async (req, res) => {
        const {username} = req.body
    try {
        const user = await User.findOne({ username : username })
        if (user) {
            res.status(200).json({
                name : user.name,
                password : user.password,
                email : user.email});
        } else {
            res.status(404).json({ message: "잘못된 요청입니다." });
        }
    } catch (err) {
        res.status(500).json({ message: "서버 오류입니다.", error: err });
    }
};
