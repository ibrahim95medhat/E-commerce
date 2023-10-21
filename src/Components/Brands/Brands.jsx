import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {Oval} from 'react-loader-spinner';
import {Helmet} from 'react-helmet' 
export default function Brands() {
const [brands,setBrands]=useState(null)
 async function getAllBrands(){
const {data:{data}}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
setBrands(data)
  }

  useEffect(()=>{getAllBrands()},[])

if(brands===null){

  return <div className='container d-flex justify-content-center align-items-center vh-100'>
    <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
  </div> 
}

  return (
    <>
      <div className="container">
        <Helmet>
          <title>Brands</title>
        </Helmet>
        <div className="row">
          {brands.map((eachBrand)=>{
            return <div className="col-12 col-sm-6 col-md-4 product">
              <div className="image-container mb-2 ">
                <img className='w-100' src={eachBrand.image} alt='brand-img'></img>
              </div>
            
          </div>
          })}
          
        </div>
      </div>
    </>
  )
}
