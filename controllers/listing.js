const listing = require("../models/listing.js");

module.exports.index=async (req,res,next)=>{
    const alllistings= await listing.find({});
    res.render("listings/index.ejs",{alllistings});
 };



 module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req,res,next)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id).populate({path:"reviews"
    ,populate:{
        path: "author",},
})
    .populate("owner");
    if(!Listing){
        req.flash("error","Listing you requested ias not exist");
        res.redirect("/listings");
    }
    console.log(Listing);
    res.render("listings/show.ejs",{Listing});
};


module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new listing(req.body.Listing);
    newListing.image = {url,filename};
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};


module.exports.renderEditForm=async (req,res,next)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id);
    if(!Listing){
        req.flash("error","Listing you requested ias not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=Listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs",{Listing,originalImageUrl});
};


module.exports.updateListing = async (req,res,next)=>{
    let{id}=req.params;
    let list = await listing.findByIdAndUpdate(id,{...req.body.Listing});
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    list.image = {url,filename}; 
    await list.save();
    }
    req.flash("success","Listing Updated!");
    return res.redirect(`listings/${id}`);
};