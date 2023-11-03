import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

const navigate=useNavigate();


const formik=useFormik({
  initialValues:{
    email:'',
  },
  onSubmit:forgotPassword
})


  async function forgotPassword(em){
    console.log(em)
    try {
      const res=await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',em)
  console.log(res)
navigate('/verifyresetpassword')
    } catch (error) {
      console.log(error)
    }
  
  }




  return (
    <>
     <div className="container my-5">
        <form className='my-5 w-25 m-auto' onSubmit={formik.handleSubmit}>
            <input className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' id='email' type='email'  placeholder='e-mail' ></input>
            
            <button  className='btn btn-success ms-auto d-block my-2'>reset password</button>
        </form>
        </div> 
    </>
  )
}
