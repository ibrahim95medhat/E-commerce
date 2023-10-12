import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import { Helmet } from 'react-helmet';
export default function Home() {

  const [userName,setUserName]=useState(null)
  
  

  useEffect(()=>{
    const {name}=jwt_decode(localStorage.getItem('token'));
    setUserName(name)
  },[])
  if(userName===null){
   return  <h1>Loading.....</h1>
  }
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
     <div className="container  d-flex justify-content-center align-items-baseline">
      <div className='fw-bold fs-2' > Hello  {userName}</div>
      </div> 
    </>
  )
}
