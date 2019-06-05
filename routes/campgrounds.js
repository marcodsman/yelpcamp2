var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// ==================
// CAMPGROUND ROUTES
// ==================
// Routes have been shortened using server.js


// INDEX Route
router.get("/", function(req, res) {
  // Get all campgrounds from db
  //console.log(req.user);
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds });
    }
  });
  
  // res.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE Route - Submit form
router.post("/", function(req, res){
  // get data from from and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  
  var newCampground = {name: name, image: image, description: desc};
  
  // Save to database
  Campground.create(newCampground, function(err, newlyCreated){
            if(err){
              console.log(err);
            } else {
              // redirect to campgrounds page
              res.redirect("/campgrounds");
            }
  });
});

// NEW - Show form
router.get("/new", function(req, res){
  res.render("campgrounds/new");
});


// SHOW - Shows more info about one campground
router.get("/:id", function(req, res){
  // Find the campground with particular id. 
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      // Render showpage with that id.
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

module.exports = router;
