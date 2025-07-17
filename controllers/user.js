const User=require("../models/user.js");


module.exports.signUpFormRender=(req,res)=>{
    res.render("user/singup.ejs");
}

module.exports.signUpUser=async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email,username});
        const registedUser = await User.register(newUser,password);
        // console.log(registedUser);
        req.login(registedUser,(err)=>{
        if(err){
            
            return next(err);
            
        }
        req.flash("success","Welcome to WanderHive");
        res.redirect("/listings");
       })
      
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
 
}

module.exports.logInFormRender=(req,res)=>{
    res.render("user/login.ejs")
}

module.exports.logInUser= async(req,res)=>{
    req.flash("success","Welcome back to WanderHive");
    const url =res.locals.redirectUrl || "/listings";
    res.redirect(url);
}

module.exports.logOutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are Logged out");
        res.redirect("/listings");
    }
    
    )
}