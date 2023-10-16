import React, { useEffect , useState } from 'react'
import axios from 'axios';
import {Oval} from 'react-loader-spinner'
export default function WishList() {

const [wishlistproduct,setWishListProduct]=useState(null);
const [isInWishList,setIsInWishList]=useState(null)


async function gettingWishList(){
try {
  const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
    headers:{token:localStorage.getItem('token')}
  })
  
  setWishListProduct(data.data);
  
} catch (error) {
  console.log(error)
}
}


useEffect(()=>{

gettingWishList()
},[])

if(wishlistproduct===null){

  <div className="container d-flex justify-content-center align-items-center vh-100">
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
        <div className="row g-3">

          {
            wishlistproduct?.map((e,index)=>{
              return <div className="col-12 col-md-3" key={index}>
               <div className="image-container"><img className='w-100' src={e.imageCover} alt='pic'></img></div>
        <h5>{e.category.name}</h5>
        <h6>{e.title.split(" ").splice(0,2).join(" ")+'...'}</h6>
        <div className='d-flex justify-content-between'>
        <p>{e.price}EGP</p>
        <p><i className="fa-solid fa-star"></i>{e.ratingsAverage}</p>
        </div>
              </div>
            })
          }
          
        </div>
      </div>
    </>
  )
}