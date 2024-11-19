import React, { useState } from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useCartDispatch } from '../Component/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';

export default function Cart() {
  let data = useCart();
  let dispatch = useCartDispatch();

  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [isPayDisabled, setIsPayDisabled] = useState(true);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(data)
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        order_data: [{...data[0], status: 'placed'}],
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
  
    console.log("JSON RESPONSE:::::", response.status);
  
    // Check if the checkout was successful
    if (response.status === 200) {
      // Disable "Confirm Order" button and enable "Pay" button after successful checkout
      setIsCheckoutDisabled(true);
      setIsPayDisabled(false); // Enable Pay button
    } else {
      console.error("Checkout failed:", response.status);
    }
  };
  
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51Q5OxLGzY54WvCvtc6zUAuvlPSiLQ4xdjgH6PLAhukqEMLarVVNyGHQ3h1qdoRS2bCgnvgWvGdsHxuB1BcvEJLqL00lGSmALxg");
  
    const body = { products: data };
    const headers = { 'Content-Type': 'application/json' };
  
    try {
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
  
      // Check if the response is successful
      if (!response.ok) {
        console.error("Error creating checkout session:", response.statusText);
        return;
      }
  
      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      
      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      } else {
        // Disable "Pay" button after successful payment
        setIsPayDisabled(true);
      }
    } catch (error) {
      console.error("Error in makePayment function:", error);
    }
  };
  
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div className="d-flex justify-content-between mt-5">
          <button 
            className='btn bg-success me-2' 
            onClick={handleCheckOut} 
            disabled={isCheckoutDisabled}
          >
            Confirm Order
          </button>
          
          <button 
            className='btn bg-success' 
            onClick={makePayment} 
            disabled={isPayDisabled}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
