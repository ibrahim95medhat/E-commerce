import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {Formik,useFormik} from 'formik'
import axios from 'axios';
export default function Register() {

  let [isloading,setLoading]=useState(false);
  let [err, setErr]=useState('');
  let navigate=useNavigate();


  async function register (values){
  console.log(values);
  setLoading(true)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>
  {
      setErr(err.response.data.message);
      setLoading(false);
  });
  setLoading(false);
  setErr('');
  console.log(data);
  navigate('/login');
}
function validate (values){
  let errors={};
if(values.name===''){
  errors.name = "username is required";
}
else if (values.name.length<3){
  errors.name = "username must be more than 8 characters";
}
else if (values.name.length>16){
  errors.name = "username must be less than 16 characters";
}

if(values.email===''){
  errors.email='email field is required';
}
else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  errors.email="invalid email address";
}

if(values.password===''){
  errors.password='password field is required';
}
else if(! /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
  errors.password='invalid password, password must contain at least number also special character';
}

if(values.rePassword===''){
  errors.rePassword='password field is required';
}
else if(values.rePassword !== values.password){
  errors.rePassword='invalid password';
}
if(values.phone===''){
  errors.phone='phone field is required';
}
else if(! /^01[0125][0-9]{8}$/gm.test(values.phone)){
  errors.phone='invalid phone number';
}
return errors;
}

let formik = useFormik({
  initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  } ,
  validate:validate
  ,
  onSubmit:register 
})

  return (
    <>
    <div className="container">
      <div className="w-75 m-auto">
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor='name'>name</label>
      <input className='form-control mb-3' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type='text' name='name' id='name' />
      {formik.touched.name && formik.errors.name ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.name}</p></div>:true}
     
      <label htmlFor='email'>email:</label>
      <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.email}  onChange={formik.handleChange} type='email' name='email'  id='email'/>
    {formik.touched.email && formik.errors.email ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.email}</p></div>:true} 
   
    <label htmlFor='password'>password</label>
    <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.password} onChange={formik.handleChange} type='password' name='password' id='password' />
    {formik.touched.password && formik.errors.password ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.password}</p></div>:true}
    
    <label htmlFor='rePassword'>repassword:</label>
    <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.rePassword} onChange={formik.handleChange} type='password' name='rePassword' id='rePassword' />
    {formik.touched.rePassword && formik.errors.rePassword ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.rePassword}</p></div>:true}
    
    <label htmlFor='phone'>phone:</label>
    <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.phone} onChange={formik.handleChange} type='tel' name='phone' id='phone' />
    {formik.touched.phone && formik.errors.phone ?<div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.phone}</p></div>:true}
    {
     err!=='' ? <div className="account-exist alert alert-danger rounded-3">
      <p>{err}</p>
      </div> : true
    }
      

   
    {isloading?<button type='text' disabled className='d-block ms-auto btn btn-outline-success'><i className='fas fa-spinner fa-spin'></i></button>:<button type='submit'  className='d-block ms-auto btn btn-outline-success'>Register</button>}


   </form>
      </div>
    </div>
   
    </>
  )
}
