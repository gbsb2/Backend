const express = require("express")
const app = express()
// router import

app.use(express.json());
app.use(cors());

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// use router
app.use()

app.listen(3000, () => {
    console.log("server on in http://localhost:3000");
    
})