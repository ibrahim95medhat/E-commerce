
import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {Formik,useFormik} from 'formik'
import axios from 'axios';
import { UserContext } from '../Context/Authentication';
export default function Login() {

  let [isloading,setLoading]=useState(false);
  let [err, setErr]=useState('');
  let navigate=useNavigate();
 let{isUserloggedIn,setIsUserLoggedIn}=useContext(UserContext)

  async function login (values){
  console.log(values);
  setLoading(true)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>
  {
      setErr(err.response.data.message);
      setLoading(false);
  });
  setLoading(false);
  setErr('');
  console.log(data);
  localStorage.setItem("token",data.token);
  setIsUserLoggedIn(true)
  navigate('/home');
}
function validate (values){
  let errors={};


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


return errors;
}

let formik = useFormik({
  initialValues:{
    
    email:"",
    password:"",
    
  } ,
  validate:validate
  ,
  onSubmit:login 
})

  return (
    <>
    <div className="container">
      <div className="w-75 m-auto">
      <form onSubmit={formik.handleSubmit}>
    
     
      <label htmlFor='email'>email:</label>
      <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.email}  onChange={formik.handleChange} type='email' name='email'  id='email'/>
    {formik.touched.email && formik.errors.email ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.email}</p></div>:true} 
   
    <label htmlFor='password'>password</label>
    <input className='form-control mb-3' onBlur={formik.handleBlur} values={formik.values.password} onChange={formik.handleChange} type='password' name='password' id='password' />
    {formik.touched.password && formik.errors.password ? <div className='error-msg alert alert-danger p-2 rounded-2 '><p>{formik.errors.password}</p></div>:true}
    
    
    {
     err!=='' ? <div className="account-exist alert alert-danger rounded-3">
      <p>{err}</p>
      </div> : true
    }
      

   
    {isloading?<button type='text' disabled className='d-block ms-auto btn btn-outline-success'><i className='fas fa-spinner fa-spin'></i></button>:<button type='submit'  className='d-block ms-auto btn btn-outline-success'>Login</button>}


   </form>
      </div>
    </div>
   
    </>
  )
}



