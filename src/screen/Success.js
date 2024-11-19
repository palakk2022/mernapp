import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Success() {
  const [showAlert, setShowAlert] = useState(false);

  //buttun
  const navigate = useNavigate();

  const handleTrackOrder = () => {
    navigate('/order-tracking');  // Navigate to the order tracking page
  };

  useEffect(() => {
    // Show custom alert when component is mounted
    setShowAlert(true);

    // Optionally, hide the alert after a few seconds
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);  // Alert will disappear after 5 seconds

    return () => clearTimeout(timer);  // Clean up the timer
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src="https://media.istockphoto.com/id/845888110/vector/tick-icon-vector-symbol-green-checkmark-isolated-checked-icon-or-correct-choice-sign-check.jpg?s=612x612&w=0&k=20&c=s56MvJUsdR4m4sBRVzkmoSI1LvHxysbhmKeQZ1W4TTM=" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Your Order Is Confirmed!</h5>
          <p>Thanks For Your Order!</p>
          <p>Your Transaction ID:66677788594</p>
          {/* Custom Alert Message */}
          {showAlert && (
            <div className="alert alert-success" role="alert">
              Your order will reach your doorstep within a few minutes!
            </div>
          )}

          <Link className="btn bg-green text-success mx-1" to="/"> ← Back To Home Page </Link>
          <button 
        onClick={handleTrackOrder} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Track Order
      </button>
          <Link className="btn bg-green text-success mx-1" to="/"> ← Track Your Order </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
