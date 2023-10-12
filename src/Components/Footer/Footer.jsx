import React from 'react'


export default function Footer() {
  return (
    <>
    <div className='container my-5'>
     <h3>Get The Fresh Cart app</h3>
     <p>We Will Send You a link open it on your phone to download the app</p>

     <form>
      <div className='d-flex justify-content-between align-items-center'>
      <input id='email' name='email' placeholder='email..' className='w-75 form-control'></input>
      <button className='btn btn-success'>share app link</button>
      </div>
     </form>
      <hr></hr>
    </div>
   
    </>
  )
}
