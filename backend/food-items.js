const mongoose= require("mongoose");
const usermodel = require("./model/userschema")
const fooditems = async(req,res)=>{
    const { name , email , password} = req.body;
    try{
        const userdata = await usermodel.create({
            name:name,
            email:email,
            password:password
        })
        res.json({message:"food item received",userdata,success:true})
    }catch(error){
        console.log(error)
        res.json({message:"food item  not received",success:false})
    }}
    module.exports=fooditems;