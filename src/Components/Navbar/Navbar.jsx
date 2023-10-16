import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg';
import  {UserContext}  from '../Context/Authentication';
import { addToCartContext } from '../AddToCart/AddToCart';
export default function Navbar() {

  const {cartNumOfItems}=useContext(addToCartContext)
  const navigateToLogin=useNavigate();
  let{isUserLoggedIn,setIsUserLoggedIn}=useContext(UserContext);
  function logout (){
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
    navigateToLogin('/login')
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="">
      <img src={logo} alt='logo'></img>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        isUserLoggedIn ? 
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className="nav-item">
         <Link className="nav-link active" aria-current="page" to="home">Home</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link position-relative" to="cart">Cart
         <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {cartNumOfItems}
      <span className="visually-hidden">unread messages</span>
      </span>
         </Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="products">products</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="categories">Categories</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="brands">Brands</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="allorders">All Orders</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="wishlist">WishList</Link>
       </li>
       
       
     </ul> : null
      }
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
        <i className="mx-2 fa-brands fa-instgram"></i>
        <i className="mx-2 fa-brands fa-facebook"></i>
        <i className="mx-2 fa-brands fa-tiktok"></i>
        <i className="mx-2 fa-brands fa-twitter"></i>
        <i className="mx-2 fa-brands fa-linkedin"></i>

        </li>
        {!isUserLoggedIn?<>
          <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>: null}
         {
          isUserLoggedIn?<li className="nav-item">
          <span style={{cursor:'pointer'}} onClick={logout}>Logout</span>
        </li>:null
         }
        
      </ul>
     
    </div>
  </div>
</nav>  
    </>
  )
}
