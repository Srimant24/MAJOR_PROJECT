const listing = require("../models/listing.js");
const Review = require("../models/review.js");



module.exports.createReview=async(req,res)=>{
    let list = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    list.reviews.push(newReview);
    newReview.author=req.user._id;
    console.log(newReview);
    await newReview.save();
    await list.save();
    req.flash("success","New Review created!");
    res.redirect(`/listings/${req.params.id}`);;
};


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};