import React, { useEffect, useRef, useState } from 'react';
import { useCart,useCartDispatch } from './ContextReducer';

export default function Card(props) 
//ADD TO CART FUNCTIONALITY
{
  const dispatch = useCartDispatch();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

    const [cartMessage, setCartMessage] = useState('');

  const handleAddToCart = async () => {
    try{
      let existingItem = null;  // Initialize to null instead of an empty array

// Find if the item is already in the cart
for (const item of data) {
  if (item.id === props.fooditem._id) {
    existingItem = item;  
    // Set the existing item if found
    break;
    
  }
}

if (existingItem) {  // Check if the item exists
  // Check if an item with the same size exists
  if (existingItem.size === size) {  // Now we compare size directly
    await dispatch({
      type: "UPDATE",
      id: props.fooditem._id,  // Use correct identifier
      price: finalPrice,
      qty: qty
    });
  } else {  // If the size is different, add a new item
    await dispatch({
      type: "ADD",
      id: props.fooditem._id,
      name: props.fooditem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.fooditem.img // Add img if needed
    });
  }
} else {  // If the item does not exist in the cart, add it
  await dispatch({
    type: "ADD",
    id: props.fooditem._id,
    name: props.fooditem.name,
    price: finalPrice,
    qty: qty,
    size: size,
    img: props.fooditem.img // Add img if needed
  });
}

 // Set success message after adding/updating the cart
 setCartMessage(`${props.fooditem.name} added to cart successfully!`);

 // Clear the message after a few seconds (optional)
 setTimeout(() => setCartMessage(''), 3000);
   
      }catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
  let finalPrice = qty *parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.fooditem.img}
          className='card-img-top'
          alt=" "
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.fooditem.name}</h5>
          <div className='container w-100'>
            <select
              className='m-2 h-100 bg-success rounded'
              onChange={(e) => setQty((e.target.value))}
              style={{ color: "white" }}
            >
        
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className='m-2 h-100 bg-success rounded'
              ref = {priceRef}
              onChange={(e) => setSize(e.target.value)}
              style={{ color: "white" }}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              {finalPrice}/-
            </div>
            <hr />
            <button
              className='btn btn-success justify-center ms-2'
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            {cartMessage && <div className="cart-message">{cartMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
