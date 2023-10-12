import React from 'react'
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Authentication from '../Context/Authentication.jsx';


export default function Layout() {
  return (
   <>
   <Authentication>
   <Navbar/>
<Outlet></Outlet>
   <Footer/>
   </Authentication>
 

 
   
   </>
  )
}
