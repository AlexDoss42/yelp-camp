var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campground/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  })
});

router.post("/campgrounds", isLoggedIn, function(req, res){
  res.send('You hit the post route')
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newCampground){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});
  
router.get("/campground/new", isLoggedIn, function(req, res){
  res.render("campground/new");
});

router.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("campground/show", {campground: foundCampground});
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

module.exports = router;