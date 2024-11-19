const express = require("express");
const router = express.Router();
const Order = require('../model/orders');
const { default: Stripe } = require("stripe");

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;

        // Add Order_date to each item in data
        data.forEach(item => item.Order_date = req.body.order_date);

        // Check if the email exists in the database
        let eId = await Order.findOne({ 'email': req.body.email });

        if (!eId) {
            // If email does not exist, create a new document
            await Order.create({
                email: req.body.email,
                order_data: data
            });
            res.json({ success: true });
        } else {
            // If email exists, update the existing document
         
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { $each: data } } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error: " + error.message);
    }
});
  //my order
  router.post('/myorderData', async (req, res) => {
    try{
        let myData= await Order.findOne({'email':req.body.email})
        res.json({orderData : myData})

    }catch(error){
        res.status(500).send("Server error: " + error.message);
    }
  })
  //payment route
  router.post('/chechout-session', async (req, res) => {
    const{order_data}= req.body;
    const lineitems = order_data.map((order_data)=>({
       price_data:{
        Currency:"inr",
        product_data:{
            name:order_data.name,
            images:[order_data.images]
        },
        unit_amount:order_data.price*1000,
       },
       quantity:order_data.quantity
    }));
    const session = await Stripe.Checkout.session.create({
        payment_method_types:["card"],
        lineitems:lineitems,
        mode:"payment",
        success_url:"http://localhost:3000/myOrder",
        cancel_url:"/"
    })
    res.json({id:session.id})
  })

module.exports = router;
