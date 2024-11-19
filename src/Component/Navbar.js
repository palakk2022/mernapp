import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screen/Cart';
import Modal from '../Model';  // Import the custom Modal component
import { useCart } from '../Component/ContextReducer';
export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCart(); 
  // Example state for cart items (this should ideally come from a global state like Redux or Context)
 //const [cartItems, setCartItems] = useState([]);  // An empty cart initially

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authtoken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authtoken") ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
            ) : (
              <div>
                {/* Button to Open the Modal */}
                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                  My Cart{" "}
                  <Badge pill bg="danger">{cartItems.length}</Badge>
                </div>

                {/* Custom Modal Component with `onClose` prop */}
            {
              cartView? 
              <Modal onClose={()=>setCartView(false)}>
            <Cart/>
              </Modal>:null
            }

                {/* Logout Button */}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
