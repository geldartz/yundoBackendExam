const express = require("express");
const router = express.Router();

const {authLogin, authUser} = require("../controllers/authController");
const validateToken = require("../middleware/tokenHandler");

router.route("/login").post(authLogin);
router.route("/user").get(validateToken, authUser);

module.exports = router;