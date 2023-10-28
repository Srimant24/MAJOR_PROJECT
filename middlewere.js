const listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError=require("./utils/Express.js");
const{ listingSchema,reviewSchema }=require("./schema.js");


module.exports.validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl; 
    req.flash("error","you must be logged in to create listing");
    return res.redirect("/login");
    }
    next();
};


module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};



module.exports.isOwner = async(req,res,next)=>{
    let{id}=req.params;
    let list=await listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission to edit");
        res.redirect(`listings/${id}`);
    }
    next();
};

module.exports.isreviewAuthor = async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let rev=await Review.findById(reviewId);
    if(!rev.author.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission to edit");
        res.redirect(`listings/${id}`);
    }
    next();
};