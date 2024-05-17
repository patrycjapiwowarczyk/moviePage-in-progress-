const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/users");

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

router.get("/", function (req, res, next) {
  console.log("Router Working");
  res.end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
