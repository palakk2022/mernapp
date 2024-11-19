export default function OrderStatus({ orderStatus }) {
    // console.log(orderStatus)
  const status = {
    placed: { index: 0, text: "Order Placed" },
    processed: { index: 33.33, text: "Processed" },
    shipped: { index: 66.66, text: "Shipped" },
    delievered: { index: 100, text: "Delievered" },
  };
  const lineColor = `linear-gradient(to right,
   #00bc8c 0%,
   #00bc8c ${status[orderStatus].index}% ,
   #fff ${status[orderStatus].index}%, 
   #fff 100%)`
  
  return (
    <div className="order-status">
      <div className="status">
        <p className="icons">
          <i className="ri-circle-fill" style={{color: '#00bc8c'}}></i>
          <i className="ri-circle-fill" style={{color: `${status[orderStatus].index >= 33.33? '#00bc8c': '#fff'}`}}></i>
          <i className="ri-circle-fill" style={{color: `${status[orderStatus].index >= 66.66? '#00bc8c': '#fff'}`}}></i>
          <i className="ri-circle-fill" style={{color: `${status[orderStatus].index === 100? '#00bc8c': '#fff'}`}}></i>
        </p>
        <p className="line" style={{background: lineColor}}></p>
      </div>
      <p>{status[orderStatus].text}</p>
    </div>
  );
}
