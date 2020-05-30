var express = require("express");
var router = express.Router();

router.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campground/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  })
});

router.post("/campgrounds", function(req, res){
  res.send('You hit the post route')
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});
  

router.get("/campground/new", function(req, res){
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

module.exports = router;