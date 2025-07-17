const mongoose= require("mongoose");
const initdata=require("./data.js");
const Listing= require("../models/listing.js");
const URL ="mongodb://127.0.0.1:27017/WanderHive";

async function main(){
    await mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    
}

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
}
)

const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map(
        (obj)=>({
            ...obj,
            owner:"686945cff818230cd4a6d509",
        })
    );
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();