import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyResetPassword() {
    const navigate=useNavigate()
async function resetPassword(resetCode){
console.log(resetCode)

try {
    const res=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
    console.log(res) 
    navigate('/resetpassword')
} catch (error) {
    console.log(error)
}

}
const Formik= useFormik({
    initialValues:{
        resetCode:'',
    },
    onSubmit:resetPassword
})

  return (
    <>
<div className="container my-5 d-flex justify-content-center align-items-center">
    <form className='w-25' onSubmit={Formik.handleSubmit}>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='form-control' name='resetCode' id='resetCode' type='text' ></input>
        <button className='btn btn-success'>reset password</button>
    </form>
</div>
      
    </>
  )
}
