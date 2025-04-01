const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());
const userRoute = require("./router/userRoute");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("error:", err);
  });

app.use(userRoute);

app.listen(process.env.PORT || 2000, () => {
  console.log("server started");
});
