import React from 'react'
import notFoundImg from '../../assets/images/error.svg';
export default function Notfound() {
  return (
    <div>
     <div className="container">
      
        <div className="row">
        <div className="col-12">
          <div className="img-cont">
          <img className='w-100' src={notFoundImg} alt="pic"></img>
          </div>
        </div>
      </div> 
    </div>
    </div>
  )
}
