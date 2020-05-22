var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

Campground.create(
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
    description: "A nice little campsite on the shore of the Salmon Creek"
  }, function(err, campground){
    if(err){
      console.log(err);
    } else {
      console.log("NEWLY CREATED CAMPGROUND: ");
      console.log(campground);
    }
  });

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  })
});

app.post("/campgrounds", function(req, res){
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
  

app.get("/campground/new", function(req, res){
  res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3001, () => console.log(`It's over Anakin. I have the high ground`));
