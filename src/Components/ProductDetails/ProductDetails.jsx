import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {ThreeDots} from 'react-loader-spinner'
import { addToCartContext } from '../AddToCart/AddToCart';
import toast from 'react-hot-toast';
import {FallingLines} from 'react-loader-spinner'
export default function ProductDetails() {
const {addToCart}=useContext(addToCartContext);
const{id}=useParams();
console.log(id)

const[isSending,setIsSending]=useState(false);

async function addingProduct(id){

  setIsSending(true);
let res=await addToCart(id);
console.log(res);
res.status==='success'? toast.success(res.message):toast.error(res.message);
setIsSending(false);
}


function getProductDetails(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}


const {data,isLoading}=useQuery(['getSpecificProduct'],getProductDetails);

if(isLoading){
  return  <div className=' d-flex vh-100 justify-content-center align-items-center '>
  <div>
  <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
/>
</div>
</div>
}
  return (
    
      <div className='container mt-4'>
     <div className="row">
      <div className="col-md-3">
        <div className="image">
          <img  src={data?.data.data.imageCover} style={{width:'100%'}} alt='pic'></img>
          
        </div>
      </div>
      <div className="col-md-9">
        <h4 >{data?.data.data.title}</h4>
        <p >{data?.data.data.description}</p>
        <p >price : {data?.data.data.price} EGP</p>
        <button onClick={()=>{addingProduct(data?.data.data.id)}} className='w-100 btn btn-success text-center'>{isSending? <FallingLines
  color="#fff"
  width="35"
  visible={true}
  ariaLabel='falling-lines-loading'
/> :'+ add to cart'}</button>
      </div>
      </div> 
    </div>
   
    
  )
}
