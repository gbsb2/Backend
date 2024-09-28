const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// router import
const tree = require('./routes/tree')

app.use(express.json());
app.use(cors());

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/COCOTON', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// use router
app.use("/tree", tree)

app.listen(3000, () => {
    console.log("server on in http://localhost:3000");
    
})