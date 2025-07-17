const express=require("express");
const router =express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController =require("../controllers/user.js");

//use router.route in signup path
router.route("/signup")
.get(userController.signUpFormRender)
.post(wrapAsync(userController.signUpUser));

//use router.route in login path
router.route("/login")
.get(userController.logInFormRender)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),userController.logInUser);

//because we use router.route ok!

//signup form
//router.get("/signup",userController.signUpFormRender);
//singup user"/signup"
//router.post("/signup",wrapAsync(userController.signUpUser));
//login form
//router.get("/login",userController.logInFormRender);
//login user
//router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),userController.logInUser);
//logout user
router.get("/logout",userController.logOutUser);

module.exports=router;