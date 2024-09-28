const User = require("../schema/user"); // User 모델 가져오기
const Tree = require("../schema/tree")
const bcrypt = require("bcrypt");
const {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken,
  } = require("../jwt/index");

exports.login = async (req, res) => {
    const { userID, password } = req.body;

    try {
        // 1. 사용자 찾기
        const user = await User.findOne({ userID : userID });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // 2. 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const payload = { 
            userID : user._id
        };        
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
    
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        }); //7일

        // 액세스 토큰을 Authorization 헤더에 추가
        res.setHeader("Authorization", `Bearer ${accessToken}`);

        // 4. 토큰 반환
        return res.status(200).json({ 
            message : '로그인 되었습니다.',
            accessToken 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.signup = async (req, res) => {
    const { userID, password, nickname } = req.body;

    try {
        // 1. 사용자 중복 검사
        const existingUser = await User.findOne({ userID : userID });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // 2. 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. 새로운 사용자 생성 및 저장
        const newUser = new User({
            userID,
            password: hashedPassword,
            nickname
        });

        const newUserTree = new Tree({
            userId : newUser._id,
            exp : 0,
            fruitExp: 0
        });

        await newUser.save();
        await newUserTree.save();

        // 5. 응답으로 회원정보 반환
        return res.status(201).json({ newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    // 검사1: 토큰이 없을 경우
    if (!refreshToken) {
      return res.status(400).json({
        message: "리프레시 토큰이 쿠키에 존재하지 않습니다."
      });
    }
    // 검사 2: 토큰이 정상적인 토큰이 아닌 경우
    try {
      jwt.verify(refreshToken, secretKey); // 토큰 유효성 검증
    } catch (err) {
      return res.status(400).json({
        message : "잘못된 리프레시 토큰입니다."
      });
    }
  
    // 쿠키 삭제
    res.clearCookie("refreshToken");
    res.status(StatusCodes.OK).json({ message: "로그아웃 되었습니다." });
  };