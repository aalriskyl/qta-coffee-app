const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware.js")
const { LoginUser, RegisterUser } = require("../controllers/userController.js");
const { runValidation,  validationLogin } = require("../validation/validation");
const roleMiddleware = require('../middleware/roleMiddleware');

// USER AUTH
router.post("/login", validationLogin, runValidation, LoginUser);
router.post("/register", RegisterUser);
router.get('/history', roleMiddleware(['admin']), (req, res) => {
    res.send('Dashboard');
  });
module.exports = router;
