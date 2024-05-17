const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../server.js");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const signUp = async (req, res, next) => {
  const { login, email, password } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email is already in use",
    });
  }
  try {
    const newUser = new UserModel({ login, email, password });
    await newUser.save();
    res.json({
      status: "success",
      code: 201,
      data: "Created",
      message: "Register complete! Check your email to confirm verification.",
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });

  if (!user || user.password !== password) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login or password",
    });
  }

  const payload = { id: user.id };
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "30d" });
  user.token = token;
  const data = { token, user };

  console.log(data);

  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: data,
    message: "User logged in",
  });
};

module.exports = { auth, signUp, logIn };
