// server.js
// where your node app starts
// server.js = app.js for now

// init project
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Auth install
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Campground = require("./models/campground")
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

// Requiring routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

mongoose.connect(process.env.MONGO_URI)
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Auth setup
app.use(require("express-session")({
  secret: "Chewy is the cutest",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser on all routes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// Seed the database
seedDB();

// Serve public directory
app.use(express.static(__dirname + "/public"));


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Shorten all the campground routesapp.use(c"/campgrounds", ampgroundRoutes);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('The YelpCamp server has started at ' + listener.address().port);
});

