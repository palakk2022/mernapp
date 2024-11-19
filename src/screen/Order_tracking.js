import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState('Order placed');

  useEffect(() => {
    // Initialize socket connection
    const socket = io('http://localhost:5000');  // Adjust to match your backend URL
    
    // Listen for real-time order status updates
    socket.on('order_status', (status) => {
      setOrderStatus(status);  // Update the order status
    });
      // Clean up socket connection when component unmounts
      return () => {
        socket.disconnect();
      };
    }, []);
  
    // Define the possible order statuses
  const statuses = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

  return (
    <div style={{ margin: "20px", color: "#fff" }}>
      <h1>Track Your Order</h1>
      <ul>
        {statuses.map((status, index) => (
          <li
            key={index}
            style={{
              fontSize: "20px",
              color: orderStatus === status ? "blue" : "gray", // Highlight current status
              fontWeight: orderStatus === status ? "bold" : "normal",
              textDecoration: orderStatus === status ? "underline" : "none",
            }}
          >
            {index + 1}. {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderTracking;