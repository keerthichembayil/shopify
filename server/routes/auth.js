const express = require("express");
const { register,login,getProfile} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getprofile",getProfile);

module.exports = router;