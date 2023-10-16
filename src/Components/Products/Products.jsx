import {  useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { ThreeDots } from  'react-loader-spinner'
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider'
import  { addToCartContext } from '../AddToCart/AddToCart';
import toast from 'react-hot-toast';
import {FallingLines} from 'react-loader-spinner';
import {Helmet} from 'react-helmet';

export default function Products() {



const[wishListProduct,setWishListProduct]=useState(null)
const {addToCart,gettingWishList,removeFromWishList,addToWhishList}=useContext(addToCartContext);
const[isSending,setIsSending]=useState(false)
const {isError,isLoading,isFetching,data,refetch}=useQuery(['allProducts'],getProducts,{

})


function togglingWishList(id,e){
e.target.classList.contains('fa-solid') ? removingFromWishList(id) : addingToWishList(id)

}


async function removingFromWishList(id){
 const data=await removeFromWishList(id)
 
 toast(data.message)
  getWishList()
}
async function addingToWishList(id){
  

const data=await addToWhishList(id)

    toast.success(data.message)
    getWishList()
  
}


 

 async function addingProduct(id,e){
console.log(id)
  setIsSending(true)
let res=await addToCart(id);
console.log(res)
res.status==='success'? toast.success(res.message,{duration:2000}):toast.error(res.message);
setIsSending(false);
console.log(e);

e.target.classList.add("clicked")
  }
  
  function getProducts(){ 
    return  axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }



async function getWishList(){

  const{data}= await gettingWishList()
setWishListProduct(data)
console.log(wishListProduct)
}

useEffect(()=>{
  getWishList()
},[])

if(isLoading)
{
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

      
      <div className="container">
   <Helmet>
<title>products</title>
</Helmet>
<div className="row gx-0 mb-3">
  <div className="col-sm-9"><HomeSlider/></div>
  <div className="col-sm-3">
    <div style={{height:'200px',overflowX:'hidden'}}>
    <img style={{height:'100%'}} src={require('../../assets/images/blog-img-1.jpeg')} alt='pic'></img>
    </div>
    <div  style={{height:'200px',overflowX:'hidden'}}>
    <img style={{height:'100%'}} src={require('../../assets/images/blog-img-2.jpeg')} alt='pic'></img>
    </div>
    </div>
</div>
<CategorySlider/>
      
    <div className="row g-4">
      
            {
                 data?.data.data.map((product,index)=>{
                  return    <div className="col-md-3 position-relative product p-3" key={index}>
                    
                  <Link className='text-decoration-none text-black' to={`/products/${product.id}`}>
                    <div className="image-container rounded rounded-4 overflow-hidden"><img className='w-100' src={product.imageCover} alt='pic'></img></div>
        <h5>{product.category.name}</h5>
        <h6>{product.title.split(" ").splice(0,2).join(" ")+'...'}</h6>
        <div className='d-flex justify-content-between'>
        <p>{product.price}EGP</p>
        <p><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</p>
        </div>
                  </Link>
               
                  <button onClick={(e)=>{togglingWishList(product.id,e)}} className='wish position-absolute top-0 end-0 border-0 m-2'><i class="position-absolute top-0 end-0 fa-regular fa-heart"></i>{wishListProduct?.map((e)=>{
                   
                   if(e.id===product.id){
                      return <i class="fa-solid fa-heart position-absolute top-0 end-0" style={{color: "#f90612"}}></i>
                    }
                    else{
                     
                    return ''
                    }
                    
                  })}
                  </button>
                  
                  <button onClick={(e)=>{addingProduct(product.id,e)}} className='btn btn-success w-100'>+ add to cart </button>
               
                  
                  </div>
                })
            }
          </div>
   
  </div>  
   

 

    
    
  )
}
