import React, {  createContext, useContext, useReducer } from 'react';

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define your reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
  }]
  case "REMOVE":
    let newArr=[...state]
    newArr.splice(action.index,1)
    return newArr;

    //update cart 
    case "UPDATE":
      let arr = [...state];  // Copy the current state to a new array
      arr.find((food, index) => {
        if (food.id === action.id ) {
          // Correct usage of parseInt to ensure quantities are numbers
          const updatedQty = parseInt(action.qty) + parseInt(food.qty); 
          const updatedPrice = action.price + food.price;
    
          // Update the item at the found index
          arr[index] = { ...food, qty: updatedQty, price: updatedPrice };
        }
        return null;  // Ensure find() does not rely on the implicit return
      });
      return arr;  // Return the updated array as the new state
    
        case "DROP":
          let empArray = []
          return empArray
    default:
      console.error("Error In Reducer");
      return state;
  }
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
