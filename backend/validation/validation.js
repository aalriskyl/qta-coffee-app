const { check, validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.validationLogin = [
  check("username", "Username cannot be empty").notEmpty(),
  check("password", "Password cannot be empty").notEmpty()
];
