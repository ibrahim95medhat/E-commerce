import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {Oval} from 'react-loader-spinner';
import {Helmet} from 'react-helmet' 
export default function Categories() {

  const [cat,setCat]=useState(null)
  async function getAllCat(){
 const {data:{data}}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
 setCat(data)
   }
 
   useEffect(()=>{getAllCat()},[])
 
 if(cat===null){
 
   return <div className="container d-flex justify-content-center align-items-center vh-100">
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
          <title>Categories</title>
        </Helmet>
         <div className="row">
           {cat.map((eachCat)=>{
             return <div className="col-12 col-sm-6 col-md-4">
               <div className="image-container mb-2">
                 <img className='w-100' src={eachCat.image} alt='brand-img'></img>
               </div>
             
           </div>
           })}
           
         </div>
       </div>
     </>
   )
 }
 







