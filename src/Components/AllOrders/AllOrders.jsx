import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import {Oval} from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
export default function AllOrders() {

   const [allOrders,setAllOrders]=useState(null)


useEffect( ()=>{
    const {id} = jwt_decode(localStorage.getItem('token'));
    getAllOrders(id)
},[])
async function getAllOrders(id){
const res=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
setAllOrders(res.data)
console.log(res.data)
}

if(allOrders===null){
return <div className="container vh-100 d-flex justify-content-center align-items-center">
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
          <title>All Orders</title>
        </Helmet>
        <div className="row g-2">
            {allOrders.map((eachOrder,index)=>{
                return  <div className="col-12 border border-3 p-2 m-2" key={index}>
                <div className="d-flex flex-column p-2">
                <div className="cart-product">
                    <div className="row g-3 ">
                      
                        {eachOrder.cartItems.map((eachItem,id)=>{
                            return <div className="col-md-4 col-sm-6 col-12 bg-dark-subtle border border-3 " key={id}>
                                <div className="d-flex flex-row">
                                  
                                    <div className="image-container text-center mx-2">
                                <img  className='w-100' src={eachItem.product.imageCover} alt='pic'></img>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                            <div className="title mb-3">{eachItem.product.title.split(' ').splice(0,2).join(' ')}</div>
                            <div  className="item-price d-flex alert alert-info "><span>price: </span><p className='text-center'>{eachItem.price}</p><span> EGP</span></div></div>
                            </div>
                        
                            
                        </div>
                        })}
                        
                    </div>
                </div>
                <div className=" row shipping-address d-flex  align-items-center justify-content-around">
                
                    <div className="col-12 col-sm-4 city pe-1 "><span className='fw-bold'>City</span> : {eachOrder.shippingAddress===undefined || eachOrder.shippingAddress.city===undefined ? 'data not found': <>{eachOrder?.shippingAddress.city}</>}</div>
                    <div className="col-12 col-sm-4 address pe-1"><span className='fw-bold'>Address</span> : {eachOrder.shippingAddress===undefined || eachOrder.shippingAddress.address===undefined ?'data not found':<>{eachOrder?.shippingAddress.address}</>}</div>
                    <div className="col-12 col-sm-4 phone pe-1"><span className='fw-bold'>Phone</span> : {eachOrder.shippingAddress===undefined || eachOrder.shippingAddress.address===undefined ?'data not found':<>{eachOrder?.shippingAddress.phone}</>}</div>
                </div>
                <div className="text-center cart-total-price alert alert-info my-3">total cart price :{eachOrder.totalOrderPrice} EGP</div>
                </div>

                <div className="payment-method my-2  d-flex justify-content-center align-items-center"><span><span className='fw-bold'>Payment Method</span> :{eachOrder.paymentMethodType}</span></div>
              
            </div>
            })}
   
        </div>
      </div>
    </>
  )
}
