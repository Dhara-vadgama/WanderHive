const Listing=require("../models/listing.js");
const mbxStyles = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxStyles({ accessToken: mapToken });
// stylesService exposes listStyles(), createStyle(), getStyle(), etc.

module.exports.index =async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
   
   }

module.exports.randerNewForm=(req,res)=>{
 
    res.render("listings/new.ejs");
}

module.exports.createListing=async (req,res,next)=>{

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
       //console.log(response.body.features[0].geometry);
    
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listings");
    // }
    let url =req.file.path;
    let filename = req.file.filename;
    let listing=req.body.listing;
    const newListing=new Listing(listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let new_listing= await newListing.save();
    //console.log(new_listing);
    req.flash("success","New Listing Created");
    res.redirect("/listings");
    }

module.exports.showListing=async (req,res)=>{
    let id= req.params.id;
    const listing= await Listing.findById(id).populate({path:"reviews", populate:({path:"author"})}).populate("owner");
    if(!listing){
        req.flash("error","Listing Doesn't Exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    }


module.exports.randerEditForm=async(req,res)=>{
    
    let{id}=req.params;
    let listing=await Listing.findById(id);
    let URL= listing.image.url;
    URL =URL.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,URL});

}


module.exports.updateListing=async(req,res)=>{
    let{id}=req.params;
    let listings=req.body.listing;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listings");
    // }
    
    let listing = await Listing.findByIdAndUpdate(id,{...listings});
    if(typeof req.file !== "undefined"){
        let url =req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let{id}=req.params;
    let a=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}