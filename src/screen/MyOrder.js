import React, { useEffect, useState } from 'react';
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import OrderStatus from '../Component/OrderStatus';

export default function MyOrder() {
  const [groupedOrders, setGroupedOrders] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    await fetch('http://localhost:5000/api/myorderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.orderData && response.orderData.order_data) {
          groupOrdersByDate(response.orderData.order_data);
        }
      })
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const groupOrdersByDate = (orderData) => {
    const grouped = orderData.reduce((acc, item) => {
      const date = item.Order_date;
      if (!acc[date]) {
        acc[date] = []; // Initialize the array if it doesn't exist
      }
      acc[date].push(item);
      return acc;
    
    }, {});
    console.log(grouped)
    setGroupedOrders(grouped);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.keys(groupedOrders).slice().reverse().map((date, dateIdx) => (
            <div key={dateIdx} className="my-4">
              <h4 className="text-center">Order Date: {date}</h4>
              <hr />
              <div className="row">
                {groupedOrders[date].map((item, idx) => (
                  <div key={idx} className="col-12 col-md-6 col-lg-3">
                    <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: '120px', objectFit: 'fill' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container w-100 p-0" style={{ height: '38px' }}>
                          <span className="m-1">Qty: {item.qty}</span>
                          <span className="m-1">Size: {item.size}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">₹{item.price}/-</div>  
                        </div>
                       <OrderStatus orderStatus={item.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h1 className='text-center'>No orders found. Please order something...</h1>
        )}
      </div>

      <Footer />
    </div>
  );
}
