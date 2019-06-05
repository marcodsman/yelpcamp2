var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Salmon Creek",
    image: "https://farm5.staticflickr.com/4176/34533122526_13d698e62a.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac pharetra risus, feugiat lobortis orci. Quisque molestie consequat enim, ac auctor neque cursus sit amet. Nunc cursus ac nunc nec ullamcorper. Phasellus sagittis id justo sit amet consequat. Vivamus accumsan fringilla elementum. Sed at tortor vel ipsum facilisis luctus. Nulla facilisi. Nullam non erat ac sapien lacinia dignissim a id tortor. Pellentesque non consectetur risus, et semper arcu. Ut turpis elit, condimentum id egestas non, congue eu tellus. Aenean efficitur nisi mauris, quis sagittis sem sagittis sed. Integer eget lacinia turpis. Duis aliquam pulvinar rutrum. Etiam quis imperdiet ex. Nam non elit augue. "
  },
  {
    name: "Granite Hill",
    image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac pharetra risus, feugiat lobortis orci. Quisque molestie consequat enim, ac auctor neque cursus sit amet. Nunc cursus ac nunc nec ullamcorper. Phasellus sagittis id justo sit amet consequat. Vivamus accumsan fringilla elementum. Sed at tortor vel ipsum facilisis luctus. Nulla facilisi. Nullam non erat ac sapien lacinia dignissim a id tortor. Pellentesque non consectetur risus, et semper arcu. Ut turpis elit, condimentum id egestas non, congue eu tellus. Aenean efficitur nisi mauris, quis sagittis sem sagittis sed. Integer eget lacinia turpis. Duis aliquam pulvinar rutrum. Etiam quis imperdiet ex. Nam non elit augue. "
  },
  {
    name: "Mountain Goat's Rest", 
    image: "https://farm6.staticflickr.com/5288/5330247665_09e1b98416.jpg", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac pharetra risus, feugiat lobortis orci. Quisque molestie consequat enim, ac auctor neque cursus sit amet. Nunc cursus ac nunc nec ullamcorper. Phasellus sagittis id justo sit amet consequat. Vivamus accumsan fringilla elementum. Sed at tortor vel ipsum facilisis luctus. Nulla facilisi. Nullam non erat ac sapien lacinia dignissim a id tortor. Pellentesque non consectetur risus, et semper arcu. Ut turpis elit, condimentum id egestas non, congue eu tellus. Aenean efficitur nisi mauris, quis sagittis sem sagittis sed. Integer eget lacinia turpis. Duis aliquam pulvinar rutrum. Etiam quis imperdiet ex. Nam non elit augue."
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    Comment.remove({}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log("removed comments");
      }
    });
    
    // Add a few campgrounds(being done in the callback of remove to insure code runs after remove)
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
          console.log("added a campground");
          // Add a few comments
          Comment.create({
            text: "This place is great but I wish there was internet",
            author: "Homer"
          }, function(err, comment){
            if(err){
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });
  
  
}

module.exports = seedDB;