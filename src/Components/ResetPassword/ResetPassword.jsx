import { Formik, useFormik } from 'formik'
import React from 'react'
import Register from '../Register/Register'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

    const navigate=useNavigate()
async function resetPassword(val){
try {
    console.log(val)
const res=await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",val);
console.log(res)

navigate('/login')
} catch (error) {
    console.log(error)
}

}

const Formik=useFormik({
    initialValues:{
        email:'',
        newPassword:'',
    },
    onSubmit:resetPassword
})


  return (
    <>
     <div className="container my-5 d-flex justify-content-center align-items-center">
        <form className='w-50' onSubmit={Formik.handleSubmit}>
    <input placeholder='email' onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='form-control mb-2' id='email' name='email' type='email'></input>
    <input placeholder='new password' onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='form-control mb-2' id='newPassword' name='newPassword' type='password' ></input>
        <button className='btn btn-success'>reset password</button>
        </form>
        </div> 
    </>
  )
}
