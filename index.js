const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");

// const dotenv = require("dotenv");
// dotenv.config();
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

// const connectDB = async () => {
//   const conn = await mongoose.connect("YOUR_MONGODB_URI", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log(`MongoDB Connected: ${conn.connection.host}`);
// };

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(cors({ origin: "*" }));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// middlewares

app.use(router);
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});