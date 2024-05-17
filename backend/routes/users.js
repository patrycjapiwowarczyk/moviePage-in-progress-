const express = require("express");
const router = express.Router();
require("dotenv").config();

const usersControllers = require("../controllers/users");

router.post("/users/signup", usersControllers.signUp);
router.post("/users/login", usersControllers.logIn);

module.exports = router;
