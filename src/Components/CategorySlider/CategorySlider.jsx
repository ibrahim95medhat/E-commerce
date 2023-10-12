import React from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query';
import {Oval} from 'react-loader-spinner';
import Slider from "react-slick";

export default function CategorySlider() {



function getCategories(){
   return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}


const {data,isLoading}=useQuery(["getCategories"], getCategories)
console.log(data)
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
  };


if(isLoading){
    return <div className='vh-100 d-flex justify-content-center align-items-center'>
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
    <div className='container'>

<div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          
            {data?.data.data.map((category,index)=>{
                return <div key={index}>
                    <img src={category.image} alt='catSlider' style={{height:'100px',width:'100%'}}></img>
                    <p className='text-center'>{category.name}</p>
                </div>
            })}
          
        
            
          
        </Slider>
      </div>
      
    </div>
  )
}



