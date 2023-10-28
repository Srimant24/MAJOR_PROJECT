const express = require("express");
const router = express.Router();
const wrap=require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,validateListing}=require("../middlewere.js");
const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });
 



router.route("/")
.get(wrap(listingController.index))
.post(isLoggedIn,upload.single("Listing[image]"),validateListing,
wrap(listingController.createListing));

router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrap(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("Listing[image]"),
    validateListing,wrap(listingController.updateListing));


router.get("/:id/edit",isLoggedIn,isOwner,wrap(listingController.renderEditForm));

module.exports = router;