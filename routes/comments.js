// Comments routes

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
        res.redirect("/campgounds");
      } else {
        Comment.create(req.body.comment, function(err, comment){
          if(err){
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id)
          }
        })
      }
    });
});