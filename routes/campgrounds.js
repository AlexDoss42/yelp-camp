var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campground/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  })
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
  res.send('You hit the post route')
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author: author};
  Campground.create(newCampground, function(err, newCampground){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});
  
router.get("/campground/new", middleware.isLoggedIn, function(req, res){
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

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campground/edit", {campground: foundCampground});
    });
});

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
        res.redirect("/campgrounds")
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
    });
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
