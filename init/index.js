const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Data = require("./data.js");
require("dotenv").config();
const atlasUrl = process.env.ATLAS_CONNECTURL;

main().then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(atlasUrl);
}



const initDB = async ()=>{
    // await Listing.deleteMany({});
    Data.data = Data.data.map((obj)=>({...obj, owner:'67fe40503328aa32ba0fe541'}));
    await Listing.insertMany(Data.data);
    console.log("data inserted successfully");
}

initDB();