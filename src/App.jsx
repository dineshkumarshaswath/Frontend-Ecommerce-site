import React, { useEffect, useState } from 'react'
import Header from "./components/layout/Header"

import "./App.css"
import Footer from "./components/layout/Footer"
import Home from "./components/Home"
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/productdetail'
import Productsearch from './components/product/productsearach'
import Login from './components/user/Login'
import Register from './components/user/Register'
import store from './store'
import { loadUser } from './actions/userAction'
import Profile from './components/user/Profile'
import ProtectRoute from './components/route/Protectroute'
import UpdateProfile from './components/user/Updateprofile'
import Updatepassword from './components/user/Updatepassword'
import ForgotPassword from './components/user/Forgotpassword'
import Resetpassword from './components/user/Resetpassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import Confirmorder from './components/cart/confirmorder'
import Payment from './components/cart/Payment'
// import axios from 'axios'
// import {Elements} from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import Ordersuccess from './components/cart/orderSuccess'
import UserOrder from './components/orders/userorders'
import Orderdetail from './components/orders/orderdetail'
import Dashboard from './components/admin/dashboard'
import Productlist from './components/admin/productlist'
import Newproduct from './components/admin/newproduct'
import Updateproducts from './components/admin/updateproduct'
import Orderlist from './components/admin/orderlist'
import Updateorder from './components/admin/updateOrder'



function App() {
 // const [stripeApiKey, setStripeApiKey]=useState("")
  useEffect(()=>{

    store.dispatch(loadUser)
    // async function getStripeApiKey(){
    //   const config={
    //     headers:{
    //       'x-auth-token':localStorage.getItem("token")
    //     }
    //   }
    //   const { data } = await axios.get("http://localhost:8888/api/v1/stripeapi",config)
    //   console.log(data.stripeApiKey)
    //   setStripeApiKey(data.stripeApiKey)
      
    // }
    // getStripeApiKey()
   

  },[])
 

  return (
    <Router>
     
      <div className="app">
        <HelmetProvider>
      <Header/>
      <div className='container container-fluid'>
      <ToastContainer theme='dark'/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/search/:keyword" element={<Productsearch/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/myprofile" element={<ProtectRoute><Profile/></ProtectRoute>}/>
      <Route path="/myprofile/update" element={<ProtectRoute><UpdateProfile/></ProtectRoute>}/>
      <Route path="/myprofile/update/password" element={<ProtectRoute><Updatepassword/></ProtectRoute>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset/:token" element={<Resetpassword/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/shipping" element={<ProtectRoute><Shipping/></ProtectRoute>}/>
      <Route path="/order/confirm" element={<ProtectRoute><Confirmorder/></ProtectRoute>}/>
      <Route path="/orders" element={<ProtectRoute><UserOrder/></ProtectRoute>}/>
      <Route path="/order/:id" element={<ProtectRoute><Orderdetail/></ProtectRoute>}/>
      
      <Route path="/payment" element={<ProtectRoute><Payment/></ProtectRoute>}/>
      <Route path="/order/success" element={<ProtectRoute><Ordersuccess/></ProtectRoute>}/>

      </Routes>
      
      </div>
      {/*admin routes  */}
      <Routes>
        <Route path='/admin/dashboard' element={ <ProtectRoute isAdmin={true}><Dashboard/></ProtectRoute>}/>
        <Route path='/admin/products' element={ <ProtectRoute isAdmin={true}><Productlist/></ProtectRoute>}/>
        <Route path='/admin/products/create' element={ <ProtectRoute isAdmin={true}><Newproduct/></ProtectRoute>}/>
        <Route path='/admin/product/:id' element={ <ProtectRoute isAdmin={true}><Updateproducts/></ProtectRoute>}/>
        <Route path='/admin/orders' element={ <ProtectRoute isAdmin={true}><Orderlist/></ProtectRoute>}/>
        <Route path='/admin/order/:id' element={ <ProtectRoute isAdmin={true}><Updateorder/></ProtectRoute>}/>
      
      </Routes>
      
      
      <Footer/>
      </HelmetProvider>
    </div>

     
    </Router>
   
  )
}

export default App
