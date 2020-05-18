var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Uranium Valley", image: "https://www.ohsosavvymom.com/wp-content/uploads/2017/05/Behind-the-Reef-Road-Temple-Mountain-Camping-on-BLM-land-at-Goblin-Valley.jpg"},
  {name: "Goblin's Lair", image: "https://sp-images.summitpost.org/835994.jpg?auto=format&fit=max&h=800&ixlib=php-2.1.1&q=35&s=f8c0015266577409e89469e7d73f8c4a"},
  {name: "Iceland's Secret", image: "https://www.freshoffthegrid.com/wp-content/uploads/Camping-in-Iceland.jpg"}
]

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res){
  res.send('You hit the post route')
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});
  

app.get("/campground/new", function(req, res){
  res.render("new.ejs");
});

app.listen(3001, () => console.log(`It's over Anakin. I have the high ground`));


// <%- include("partials/header") %>