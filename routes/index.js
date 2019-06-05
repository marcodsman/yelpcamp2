var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// http://expressjs.com/en/starter/basic-routing.html

// Root route
router.get('/', function(req, res) {
  res.render("landing")
  //res.sendFile(__dirname + '/views/index.html');
});


// ============
// Auth routes
// ============

// Show Register Form
router.get("/register", function(req, res){
  res.render("register");
});

// Handle Sign Up logic
router.post("/register", function(req, res){
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// Show login form
router.get("/login", function(req, res){
  res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", 
                                         {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req,res){
  // Will be handled by middleware
});

// Logout Route
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
});


// Check if user is logged in middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;