
import Home from './screen/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'remixicon/fonts/remixicon.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import { CartProvider } from './Component/ContextReducer';
import MyOrder from './screen/MyOrder';
import Success from './screen/Success';
import Cancel from './screen/Cancel';
import Order_tracking from './screen/Order_tracking';


function App() {
  return (
    <CartProvider >
    <Router>
 <div>
      <Routes>
        < Route exact path ="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createuser" element={<SignUp/>}/>
        <Route exact path="/myOrder" element={<MyOrder/>}/>
        <Route exact path="/success" element={<Success/>}/>
        <Route exact path="/cancel" element={<Cancel/>}/>
        <Route path="/order-tracking" element={<Order_tracking />} />
      </Routes>
      
    
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
