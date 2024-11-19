import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const[credentials,setcredentials]=useState({email:"",password:""})
  let navigate= useNavigate()
const handleSubmit= async(e)=>{
   
  e.preventDefault();
 // try {
 console.log(JSON.stringify({email: credentials.email, password:credentials.password}))
  const response = await fetch("http://localhost:5000/api/loginuser",{
    method: "POST",
    headers:{
    'Content-Type':'application/json'
  },
    body:JSON.stringify({email: credentials.email, password:credentials.password})
  });

  const json = await response.json()
   console.log(json);
   
   if(!json.success){
  alert("Enter Valid CRedentials")
   }

   if(json.success){
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authtoken",json.authtoken);
    console.log(localStorage.getItem("authtoken"))
     navigate("/");
     }

  // }catch (error) {
  //   console.error("Error:", error);
  //   alert("Something went wrong. Please try again later.");
  // }
}
const onChange=(event)=>{
  setcredentials({
    ...credentials,
    [event.target.name]:event.target.value})
}
  return (
  <div>
       <div className='container'>
      <form onSubmit={handleSubmit}> 
     
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input
     type="email" 
     className="form-control" 
     id="exampleInputEmail1" 
     aria-describedby="emailHelp"
      name='email' 
      value ={credentials.email} 
      onChange={onChange} 
      placeholder="Enter Your email"/>
    <small id="emailHelp" className="form-text text-muted">
      We'll never share your email with anyone else.
      </small>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input 
    type="password" 
    className="form-control"
     id="exampleInputPassword1"
     name='password' 
      value ={credentials.password}
       onChange={onChange}
        placeholder="Enter Your Password"/>
  </div>
 
  <button type="submit" className=" m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'> I'm a  new User</Link>
</form>
</div>
</div>
  )
}
