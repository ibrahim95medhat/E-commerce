import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { addToCartContext } from '../AddToCart/AddToCart'
import toast, { Toaster } from 'react-hot-toast'
import { Link,  useNavigate } from 'react-router-dom'
export default function Payment() {
const {cartId,removeCart}=useContext(addToCartContext);
const navigate=useNavigate();
console.log(cartId)
const [flag,setFlag]=useState(0)
async function cashOrOnlineFn(shippingAddress){
console.log(shippingAddress)
// flag===0 ? console.log('cash') : console.log('online')

  flag===0?confirmCash(shippingAddress):confirmOnline(shippingAddress);
}

function clearInputs(){
  document.querySelector('#details').value='';
  document.querySelector('#phone').value='';
  document.querySelector('#city').value='';
}
// useEffect(()=>{

// },[])

async function confirmCash (shippingAddress){
    console.log(shippingAddress)
    try {
        let response=  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress} ,{
            headers:{token:localStorage.getItem('token')}
        })
        toast('order done successfully in cash');
        clearInputs()
        removeCart()
        navigate('/allorders')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
 
}
async function confirmOnline(shippingAddress){
let host=window.location.host;

try {
  const {data:{session:{url}}}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{shippingAddress},{
  headers:{token:localStorage.getItem("token")},
  params:{url:`http://${host}//E-commerce/#`},
})
toast.success('order done successfully online payment',{duration: 400,});
clearInputs()
removeCart()
console.log(url)

window.open(url,'_blank')
} catch (error) {
  console.log(error)
}

}

    const formik=useFormik({

        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        onSubmit:cashOrOnlineFn,

        
        })




  return (
    <div>
      <div className="container">
        <form className='payment-details' onSubmit={formik.handleSubmit}>
            <label htmlFor='details'>details</label>
            <input name='details' id='details' type='text'  onChange={formik.handleChange} className='form-control' placeholder='details'></input>
           
            <label htmlFor='phone'>phone</label>
            <input name='phone' id='phone' type='tel'  onChange={formik.handleChange} className='form-control' placeholder='phone'></input>

            <label htmlFor='city'>city</label>
            <input name='city' id='city' type='text'  onChange={formik.handleChange} className='form-control' placeholder='address'></input>
           

            <button  className='ms-auto d-block my-3 btn btn-success me-2' onClick={()=>{setFlag(0)}}>confirm cash payment</button>
            <button  className='ms-auto d-block my-3 btn btn-success' onClick={()=>{setFlag(1)}}>confirm online payment</button>
        </form>

        {/* <Link className='alert alert-success text-decoration-none ' to='/allorders'>All Orders</Link> */}
      </div>
    </div>
  )
}
