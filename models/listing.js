const mongoose = require("mongoose");
const Review = require("./reviews");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
        type: String,
        required: true
    },
    description: String,
    image:{
        filename:{
            type: String,
            set : (v) => v ==='' ? "listing image" : v,
            default:"listing image",
            
        },
        url:{
            type:String,
            set : (v) => v ==='' ? "https://images.unsplash.com/photo-1600252016254-f3edb5f3ae95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
            default : "https://images.unsplash.com/photo-1600252016254-f3edb5f3ae95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }    
    },
    price: Number,
    location: String,
    country:String,
    reviews :[{
        type: Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete" , async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews} });
    }
})


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing; 


