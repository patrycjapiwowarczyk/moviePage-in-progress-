const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  login: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", userSchema);


module.exports = UserModel;
