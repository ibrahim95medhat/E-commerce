
import './App.css';
import "react-router-dom"
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx'
import Cart from  './Components/Cart/Cart.jsx';
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import Home from './Components/Home/Home.jsx'
import Categories from './Components/Categories/Categories.jsx'
import ProtectedRoute from './Components/ProtectedRoute/protectedRoute'; 
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import AddToCart from './Components/AddToCart/AddToCart';
import {Toaster} from 'react-hot-toast';
import Payment from './Components/Payment/Payment.jsx';
import AllOrders from './Components/AllOrders/AllOrders';
import {Offline} from 'react-detect-offline'
import WishList from './Components/WishList/WishList';
let routers=createHashRouter([
  
  {path:'' , element:<Layout/> , children:[
  {index :true, element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'products/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'register', element:<Register/>},
  {path:'payment', element:<Payment/>},
  {path:'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
  {path:'wishlist', element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:'login', element:<Login/>},
  {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
 
  {path:'*', element:<Notfound/>},
]}
])
function App() {
  let clientQuery=new QueryClient();
  return (<>
  
  <AddToCart>
       <QueryClientProvider client={clientQuery}>
    <RouterProvider router={routers}></RouterProvider>
    </QueryClientProvider>
    <Toaster/>
    </AddToCart>
   
    <Offline>
    <div className='fixed-bottom ms-1 mb-1'><span className='alert alert-dark'>Oops you are offline....</span></div>
    </Offline>
  </>
    
  );
}

export default App;
