const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// router.get("/home", (req, res) => {
//     res.render("listings/home.ejs");
// });
//use router.route in "/" path
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, (listingController.createListing));

//create route
//new route
router.get("/new", isLoggedIn, listingController.randerNewForm);

//use router.route in "/:id" path
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


//index route
// router.get("/",wrapAsync(listingController.index));



//create route
// router.post("/",validateListing,isLoggedIn,wrapAsync(listingController.createListing));

//show route

// router.get("/:id",wrapAsync(listingController.showListing));

//update route
//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.randerEditForm));

//update  route
//router.put("/:id",validateListing,isLoggedIn,isOwner,wrapAsync(listingController.updateListing));

//delete route

//router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;
