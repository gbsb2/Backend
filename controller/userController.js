const User = require("../schema/user"); // User 모델 가져오기
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async(req, res, next) => {

}

exports.signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // 1. 사용자 중복 검사
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // 2. 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. 새로운 사용자 생성 및 저장
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        // 4. JWT 토큰 발급
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            "your_jwt_secret", // 비밀키 (환경 변수로 관리)
            { expiresIn: "1h" } // 토큰 유효 기간 설정
        );

        // 5. 응답으로 토큰 반환
        return res.status(201).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};