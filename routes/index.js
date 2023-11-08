var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport=require("passport");
const localStrategy=require("passport-local")
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/home", isLoggedIn,function(req,res){
  res.send("This is Home Page")
})
router.get("/work",isLoggedIn,function(req,res){
  res.send("This is Work Page")
})
router.get("/courses",isLoggedIn,function(req,res){
  res.send("This is Courses Page")
})
router.get("/about",isLoggedIn,function(req,res){
  res.send("This is About Page")
})
router.get("/login",function(req,res){
  res.render("login")
})

// Register Method 

router.post("/register",function(req,res){
  var userData=new userModel({
    username:req.body.username,
    password:req.body.password,
    secret:req.body.secret
  });

  userModel.register(userData, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/")
    })
  })
})


// Login Method

router.post("/login",passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}),function(req,res){});

// Logout Method

router.get("/logout",function(req,res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/")
  })
})


// Check authoraization

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}


module.exports = router;
