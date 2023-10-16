
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const addToCartContext= createContext();

export default function AddToCart({children}) {
let token=localStorage.getItem("token")

let [cartProducts,setCartProducts]=useState(null);
let [cartTotalPrice,setCartTotalPrice]=useState(0);
let [cartNumOfItems,setCartNumOfItems]=useState(0);
let [cartId,setCartId]=useState(null);

async function gettingWishList(){
  try {
    const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers:{token:localStorage.getItem('token')}
    })
    
return data
    
  } catch (error) {
    console.log(error)
  }
  }


async function clearCartItem(id){
  try {
   const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
  headers:{token:localStorage.getItem('token')}
})
setCartNumOfItems(data.numOfCartItems)
setCartTotalPrice(data.data.totalCartPrice)
setCartProducts(data.data.products)
console.log(data)
  } catch (error) {
    console.log(error)
  }
 
}

async function updateCartItem(count,id)
{

  try {
    

    const {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      'count':count
    },{
      headers:{token:localStorage.getItem('token')}
    })
    setCartNumOfItems(data.numOfCartItems)
    setCartTotalPrice(data.data.totalCartPrice)
    setCartProducts(data.data.products)
console.log(data)
return data;
  } catch (error) {
    console.log(error)
  }


  
}

async function removeCart(){
  try {
    await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{token:localStorage.getItem('token')}
     
    });
    setCartNumOfItems(0);
    setCartProducts([])
    setCartTotalPrice(0)
  } catch (error) {
    console.log(error)
  }
 
  
//  await getCartProducts();
}

async function getCartProducts(){
    try {
        const{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{token:localStorage.getItem('token')}
        });
        console.log(data.numOfCartItems)
        console.log(data.data.totalCartPrice)
        console.log(data)
        setCartNumOfItems(data.numOfCartItems)
        setCartTotalPrice(data.data.totalCartPrice)
        setCartProducts(data.data.products)
    
        
      
    } catch (error) {
        console.log(error)
        // setCartNumOfItems(0)
        // setCartTotalPrice(0)
        // setCartProducts(data.data.products)
        
    }
  
}
async function removeFromWishList(id){
  try {
    const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      headers:{token:localStorage.getItem('token')}
    })

    return data;
  } catch (error) {
    console.log(error)
  }
}
async function addToWhishList(id){

  try {
    const Id={productId:id}
  const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',Id,{
    headers:{token:localStorage.getItem("token")}
  })
  return data
 
  
  } catch (error) {
    console.log(error)
  }
  }
useEffect(()=>{
    getCartProducts()
},[])

async function addToCart(id){
try {
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId: id},{
        headers:{token}
      })
      console.log(data.data._id)
      setCartId(data.data._id)
      getCartProducts()
      
      console.log(data)
     
      return data;
} catch (error) {
    console.log(error)
}



}





  return (
    <addToCartContext.Provider value={{addToCart,gettingWishList,removeFromWishList,addToWhishList,cartId,getCartProducts,removeCart,updateCartItem,cartProducts,cartTotalPrice,cartNumOfItems,clearCartItem}}>
      {children}
      {console.log(cartProducts,cartTotalPrice)}
    </addToCartContext.Provider>
  )
}
