import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { addToCartContext } from '../AddToCart/AddToCart';
import axios from 'axios';
import {TailSpin} from 'react-loader-spinner'
import ClearCart from '../ClearCart/ClearCart';
import {Helmet} from 'react-helmet' 
export default function Cart() {
  const {cartTotalPrice,cartProducts,clearCartItem,updateCartItem,removeCart}=useContext(addToCartContext);
const navigate=useNavigate();
function payment (){
  navigate('/payment')
}

async function increment(count,id){
  count++
  await updateCartItem(count,id);
 

}
async function decrement(count,id){
count--;
if(count<1){
  count=1;
}
  await updateCartItem(count,id);
  
  

}
async function removingCart(){
  await removeCart();

}
console.log(cartProducts)
  if(cartProducts===null){
   
   return <>
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      
    <TailSpin
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
    </>
  }
  if(cartProducts.length===0){
    return <h1>no products in cart</h1>
  }
  return (
    <div className='container my-5 ' > 
     <Helmet>
<title>Cart</title>
</Helmet>
      <div className="row my-5 rounded rounded-3" style={{background:'#bbb'}}>
        <h3>Shop Cart:</h3>
      <p >total price:{cartTotalPrice} EGP</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
      <button   onClick={removingCart} className='py-1 px-3 btn btn-danger'>clear cart</button>
      <button  onClick={payment} className='py-1 px-3 btn btn-primary'>order</button>
      </div>
     
    {cartProducts.map((product,index)=>{
      console.log(product)
      return <div key={index} className="col-sm-12 p-5 mb-1" style={{background:'#eee'}}>
        
      <div className="product-cont d-flex justify-content-between align-items-center">
    <div className="product-details d-flex align-items-center ">
      <div className="image-cont w-25 me-3 ">
      <img src={product.product.imageCover} alt='pic' className='w-100'></img>
      </div>
      <div className="details">
        <p>{product.product.title}</p>
        <p>price: {product.price}</p>
        <button onClick={()=>{clearCartItem(product.product.id)}} className='btn btn-danger ps-1'><span className='pe-2'>Remove</span><i className="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <div className="product-counter d-flex justify-content-around align-items-center">
      <button onClick={()=>{increment(product.count,product.product.id)}} className='btn btn-success'>+</button>
      <p className='mx-3'>{product.count}</p>
      <button onClick={()=>{decrement(product.count,product.product.id)}} className='btn btn-success'>-</button>
    </div>
      </div>
    </div>
     
    })}


</div>
    </div>


    
  )
}
