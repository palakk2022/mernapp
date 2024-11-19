import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import Card from '../Component/Card'
//import Carousal from '../Component/Carousal'
export default function Home() {

  const [search,setsearch]=useState('');
    const [foodcat,setfoodcat]=useState([]);
    const [fooditem,setfooditem]=useState([]);

  
    const loadData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/foodData", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        response = await response.json();
        setfooditem(response[0]);
        setfoodcat(response[1]);
        console.log("Fetched Food Items:", response[0]);
        console.log("Fetched Food Categories:", response[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
     useEffect(() => {
      console.log('Loading data...');
      loadData();
    }, []); // Correct syntax
    





  return (
    <div>
      <div><Navbar/></div>
      <div>
     
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ "zIndex": "10" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search food-items..." aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={{ filter: "brightness(50%)" ,  position: "relative", top: "-90px"}} alt="..." />
                        </div>
                       
                        <div className="carousel-item">
                        <img src="https://ak.picdn.net/shutterstock/videos/1107808249/thumb/1.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" ,  position: "relative", top: "-90px"}} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_640.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" ,position:"relative" , top:"-90px"}} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.webp?b=1&s=612x612&w=0&k=20&c=TPHBRusJNFvTkrdknqlv8GcDmmnjg2SbNVRVw_BngVI=" className="d-block w-100" style={{ filter: "brightness(50%)",position:"relative",top:"-90px" }} alt="..." />
                        </div>
                       
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
      </div>
      <div className='container'>
      {

foodcat.length > 0 ? (
  foodcat.map((data) => (
    <div key={data._id} className="row mb-3">
      {/* Category Name */}
      <div className="fs-3 m-3">{data.CategoryName}</div>
      <hr />

      {/* Filter and Display Food Items for the Current Category */}
      {fooditem.length > 0
        ? fooditem
            .filter(
              (item) =>
                item.CategoryName === data.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((filteredItem) => (
              <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                <Card
                  fooditem ={filteredItem}
                  options={filteredItem.options[0]} // Assuming options is an array
                
                />
              </div>
            ))
        : <p>No food items available</p>}
    </div>
  ))
) : (
  <p>Loading categories...</p>
)}

  
 


        
      </div>
     
      <div><Footer/></div>
    </div>
  )}

