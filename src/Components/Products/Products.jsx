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
import {Helmet} from 'react-helmet'
export default function Products() {


async function addToWhishList(id){
  const Id={productId:id}
const res=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',Id,{
  headers:{token:localStorage.getItem("token")}
})
console.log(res)
}

  const {addToCart}=useContext(addToCartContext);
  console.log(addToCart)
  
const[isSending,setIsSending]=useState(false)


 async function addingProduct(id,e){
  

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
//   async function getProducts(){
//     const {data:{data}} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//     console.log(data);
//     setProdcuts(data)
//    }

// const[products,setProdcuts]=useState(null)

// useEffect(()=>{
//   getProducts()
// },[])

const {isError,isLoading,isFetching,data,refetch}=useQuery(['allProducts'],getProducts,{

})
console.log(isLoading,'isloading')
console.log(isFetching,'isfetching')
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
      
    <div className="row g-2">
      
            {
                 data?.data.data.map((product,index)=>{
                  return     <div className="col-md-2 position-relative" key={index}>
                    
                  <Link className='text-decoration-none text-black' to={`/products/${product.id}`}>
                    <div className="image-container"><img className='w-100' src={product.imageCover} alt='pic'></img></div>
        <h5>{product.category.name}</h5>
        <h6>{product.title.split(" ").splice(0,2).join(" ")+'...'}</h6>
        <div className='d-flex justify-content-between'>
        <p>{product.price}EGP</p>
        <p><i className="fa-solid fa-star"></i>{product.ratingsAverage}</p>
        </div>
        
                  </Link>
                  
                  <button onClick={()=>{addToWhishList(product.id)}} className='position-absolute top-0 end-0 border-0'><i className="fa-regular fa-heart"></i></button>
                  <button   onClick={(e)=>{addingProduct(product.id,e)}} className='btn btn-success w-100'>+ add to cart </button>
                  </div>
                })
            }
          </div>
   
  </div>  
   

 

    
    
  )
}
