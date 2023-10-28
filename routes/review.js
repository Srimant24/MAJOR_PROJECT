const express = require("express");
const router = express.Router({mergeParams:true});
const {validateReview,isLoggedIn,isreviewAuthor}=require("../middlewere.js");
const wrap=require('../utils/wrapAsync.js');

const reviewController = require("../controllers/reviews.js");



router.post("/",isLoggedIn,validateReview,wrap(reviewController.createReview));


router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrap(reviewController.deleteReview));

module.exports=router;