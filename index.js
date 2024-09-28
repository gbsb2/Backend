const express = require("express")
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
require('dotenv').config();
const cors = require('cors')
const app = express()

// router import
const tree = require('./routes/tree')
const spellCheck = require('./routes/spellCheck')
const indexRouter = require("./routes/indexRouter");
const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter')
const userInfoRouter = require('./routes/userInfoRouter')
const gemini = require('./routes/geminiRouter');


// 미들웨어 설정
app.use(express.json());
app.use(cookieParser())
app.use(cors())

// MongoDB 연결 (.env 파일에서 MongoDB URI 가져오기)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// use router
app.use("/tree", tree)
app.use("/", spellCheck)
app.use("/user", userRouter); // 예: /user 경로에서 userRouter 사용
app.use("/quiz", quizRouter)
app.use("/info", userInfoRouter)
app.use("/gemini", gemini)

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});