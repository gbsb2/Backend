const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();


// 미들웨어 설정
app.use(express.json());

// MongoDB 연결 (.env 파일에서 MongoDB URI 가져오기)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// 라우터 사용
const indexRouter = require("./routes/indexRouter");
const userRouter = require('./routes/userRouter');
const userInfoRouter = require('./routes/userInfoRouter')

app.use("/", indexRouter);
app.use("/user", userRouter); // 예: /user 경로에서 userRouter 사용
app.use("/info", userInfoRouter)
// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});