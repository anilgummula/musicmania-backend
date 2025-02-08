const { login, signup } = require("../controllers/authcontroller");
const { loginValidation, signupValidation } = require("../middlewares/authvalidation");

const router = require("express").Router();

router.post("/login",loginValidation,login);
router.post("/signup",signupValidation,signup);

module.exports = router;
