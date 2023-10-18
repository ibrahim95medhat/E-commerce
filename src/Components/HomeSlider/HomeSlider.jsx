import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




export default function HomeSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
      autoplaySpeed: 2000,
      };




  return (
    


<>

<div>
    <Slider {...settings}>
   
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/banner-4.jpeg")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/grocery-banner-2.jpeg")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/grocery-banner.png")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/slider-2.jpeg")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/slider-image-1.jpeg")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/slider-image-2.jpeg")} alt="slider"></img>
      </div>
      <div>
      <img style={{width:'100%',height:'400px'}} src={require("../../assets/images/slider-image-3.jpeg")} alt="slider"></img>
      </div>
    </Slider>
  </div>
    
</>

   
  )
}
