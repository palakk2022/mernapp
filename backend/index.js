const express = require("express");
const mongoDB = require("./db");
const stripe = require("stripe")("sk_test_51Q5OxLGzY54WvCvtHaCUlAcHxGXdkvoANfN0N4ifaAyZd614xBn2Y1jgWHeLMdZX8KCRlW1ge9gkiVo3OMp0eyY200pe8UVPin");
//const cors = require('cors');
//const Order = require('../model/orders');
const http = require("http");  // For creating a server
const socketIO = require("socket.io");  // Socket.IO for real-time updates

const app = express();
const port = 5000;

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Create Socket.IO instance
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Set up WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  // Listen for order tracking updates (for example: `track_order` event)
  socket.on("track_order", (orderId) => {
    // Emit order status updates to the client
    // You can fetch the order status from the database and send it here
    const orderStatus = getOrderStatus(orderId);  // Mock function to get order status
    socket.emit("order_status", orderStatus);
  });
  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

function getOrderStatus(orderId) {
  // Mock function to return random order status for demonstration
  const statuses = ["Order placed", "Preparing", "Out for delivery", "Delivered"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}


// Use CORS middleware
// app.use(cors({
//   origin: 'http://localhost:3000',  // Allow requests from this origin
//   credentials: true  // If your requests include credentials (e.g., cookies)
// }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type , Accept"
  );

  next();
})


app.use(express.json());
app.use('/api', require("./Routes/createuser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body; 
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",  // Fix currency key
        product_data: { name: product.name },
        unit_amount: product.price * 100, // Convert to the smallest currency unit
      },
      quantity: product.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"
      ],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});


app.get('/', (req, res) => {
  res.send("Hello world")
})

server.listen(port, () => {
  console.log(`app listening on port no ${port}`)
})