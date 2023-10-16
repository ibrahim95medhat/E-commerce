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
    slidesToShow: 2,
    slidesToScroll: 2,
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
    <div className='container my-5'>

<div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          
            {data?.data.data.map((category,index)=>{
                return <div className='w-75 cursor-pointer' key={index}>
                  <div className="image-cont ">
                  <img className='w-100 ' src={category.image} alt='catSlider' ></img>
                  </div>
                    
                    <p className='text-center'>{category.name.split(' ').splice(0,1).join(' ')}</p>
                </div>
            })}
          
        
            
          
        </Slider>
      </div>
      
    </div>
  )
}



