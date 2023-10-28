const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrap=require('../utils/wrapAsync.js');
const passport = require("passport");
const { savedRedirectUrl } = require("../middlewere.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.rendersignupform)
.post(wrap(userController.signup));


router.route("/login")
.get(userController.renderLoginform)
.post(savedRedirectUrl,
passport.authenticate("local",
{
    failureRedirect:"/login",failureFlash:true,
}),
userController.login
);


router.get("/logout",userController.logout);

module.exports=router;