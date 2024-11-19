import React, { useState } from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {

   const[credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:"",contact_no:""})

  const handleSubmit= async(e)=>{
     
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:5000/api/createuser",{
      method: "POST",
      headers:{
       'Content-Type': 'application/json'
    },
      body:JSON.stringify({name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.geolocation,
        contact_no:credentials.contact_no})
    });

    const json = await response.json()
     console.log(json);
     
     if(!json.success){
    alert("Enter Valid CRedentials")
     }
     if(json.success){
      alert("Registered Successfully")
     }
    }catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  }
  const onChange=(event)=>{
    setcredentials({
      ...credentials,
      [event.target.name]:event.target.value})
  }
  return (
    <>
    <div className='container'>
      <form onSubmit={handleSubmit}> 
      <div className="mb-3">
    <label htmlFor="name">Name</label>
    <input 
    type="text"
     className="form-control"
      name='name' 
       value ={credentials.name} 
       onChange={onChange}
        placeholder="Enter Your Name"/>
   
  </div>
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
  <div className="mb-3">
    <label htmlFor="geolocation">Address</label>
    <input
     type="text" 
     className="form-control" 
     id="geolocation"
     name='geolocation' 
      value ={credentials.geolocation} 
      onChange={onChange} 
      placeholder="Enter Your Address"/>
  </div>
  <div className="mb-3">
    <label htmlFor="contact">Contact_NO</label>
    <input
     type="text" 
     className="form-control" 
     id="contact_no"
     name='contact_no' 
      value ={credentials.contact_no} 
      onChange={onChange} 
      placeholder="Enter Your Contact_No"/>
  </div>
 
  <button type="submit" className=" m-3 btn btn-success">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
</form>
</div>
    </>
  )
}
