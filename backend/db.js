const mongoose = require("mongoose");
//DATABASE CONNECTION
const mongoURI = "mongodb+srv://thakur2205palak:1qoZ8FcJMR63iH2K@cluster0.anpk9.mongodb.net/GoFood";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {

    });console.log("database connected");
    //FETCHING FOOD CATEGORY 
    const fetchedCategory_data = await mongoose.connection.db.collection("foodCategory");

    try {
      const data = await fetchedCategory_data.find({}).toArray();
      global.foodCategory = data;
     //console.log(global.foodCategory);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
    
 //FETCHING FOOD ITEMS

    const fetched_data = await mongoose.connection.db.collection("food_items");

    try {
      const data = await fetched_data.find({}).toArray();
      global.food_items = data;
      //console.log(global.food_items);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
    //DATABASE CATCH
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

mongoDB();




  
//  const dbconnect = async () => {
 
//      try {
//          await mongoose.connect("mongodb+srv://thakur2205palak:1qoZ8FcJMR63iH2K@cluster0.anpk9.mongodb.net/GoFood");
//          console.log("mongo db connceted successfully")
 
//      }
//      catch (error) {
//          console.log(error);
//      }
 
//  };
 //module.exports= mongoDB;
