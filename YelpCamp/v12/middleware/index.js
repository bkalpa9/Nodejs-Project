var Campground=require("../models/campground");
var Comment=require("../models/comment");
// all the middleware goes here
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership=function(req,res,next){
     // is user logged in?
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    res.flash("error","Destination not found!");
                    res.redirect("back")
                }else{
                    // does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)||req.user.isAdmin){
                      next();
                    }else{
                        req.flash("error","You don't have premession to do that!")
                         //otherwise, redirect
                      res.redirect("back");
                }
                }
            })
        }else{
            req.flash("error","You need to be logged in to do that!")
             // if not, redirect
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership= function(req,res,next){
     // is user logged in?
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    res.redirect("back")
                }else{
                    // does user own the comment?
                    if(foundComment.author.id.equals(req.user._id)||req.user.isAdmin){
                      next();
                    }else{
                        req.flash("error","You don't have premission to do that!")
                        //otherwise, redirect
                      res.redirect("back");
                }
                }
            })
        }else{
            req.flash("error","You need to be logged in to do that!")
              // if not, redirect
            res.redirect("back");
        }
}

//middleware
middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!");
    res.redirect("/login");
}



module.exports= middlewareObj;