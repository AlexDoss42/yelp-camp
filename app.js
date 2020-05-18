var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

// var campgrounds = [
//   {name: "Uranium Valley", image: "https://www.ohsosavvymom.com/wp-content/uploads/2017/05/Behind-the-Reef-Road-Temple-Mountain-Camping-on-BLM-land-at-Goblin-Valley.jpg"},
//   {name: "Goblin's Lair", image: "https://sp-images.summitpost.org/835994.jpg?auto=format&fit=max&h=800&ixlib=php-2.1.1&q=35&s=f8c0015266577409e89469e7d73f8c4a"},
//   {name: "Iceland's Secret", image: "https://www.freshoffthegrid.com/wp-content/uploads/Camping-in-Iceland.jpg"}
// ]

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  })
});

app.post("/campgrounds", function(req, res){
  res.send('You hit the post route')
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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
  res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});

app.listen(3001, () => console.log(`It's over Anakin. I have the high ground`));


// <%- include("partials/header") %>