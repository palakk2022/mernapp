const  mongoose= require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    
    },
    password:{
        type:String,
        require:true
    },
    contact_no: {   // Added the new field for contact number
        type: String,
        required: true // You can set this to true if you want it to be mandatory
    },
    date:{
        type:Date,
        default:Date.now
    
    }
}) ;
const userModel = mongoose.model("user",userSchema)
module.exports= userModel;