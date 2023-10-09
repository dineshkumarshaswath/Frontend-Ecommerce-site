
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { validateShipping } from "./Shipping"
import axios from "axios"
import { toast } from "react-toastify"
import { orderCompleted } from "../slices/cartSlice"
import { createOrder } from "../../actions/orderAction"
import { clearError as clearOrderError } from "../slices/orderSlice"
import useRazorpay from "react-razorpay";
import {Button} from 'react-bootstrap'





export default function Payment() {


  const [Razorpay] = useRazorpay();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const { user } = useSelector(state => state.authState)
  const { items: cartItems, shippingInfo } = useSelector(state => state.cartState)
  const { error: orderError } = useSelector(state => state.orderState)

  


  

  const order = {
    orderItems: cartItems,
    shippingInfo
  }
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice,
      order.shippingPrice = orderInfo.shippingPrice,
      order.taxPrice = orderInfo.taxPrice,
      order.totalPrice = orderInfo.totalPrice

  }

  


  useEffect(() => {

    validateShipping(shippingInfo, navigate)
    if (orderError) {
      toast(orderError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => { dispatch(clearOrderError()) }
      })

      return
    }




  }, [])

 

  const handleOpenRazorpay =  (data) => {

    const options = {
        key:'rzp_test_kpkgzH3QE5weEB',
        amount: Number(data.amount),
        currency: data.currency,
        order_id: data.id,
        name: 'SHOPPING APP',//
        description: 'XYZ',//
        handler: async function (response) {
            console.log(response, "34")
            order.paymentInfo = {
                status:'succeeded',
                id: response.razorpay_payment_id
            },
           
           
            dispatch(orderCompleted())
            dispatch(createOrder(order))
            console.log(order,'2')
    
            navigate('/order/success')
            const config={
              headers:{
                  'x-auth-token':localStorage.getItem("token"),
                  'Content-type':"application/json"
  
              }
          }
            
            const {data} =await axios.post('https://e-commerce-dk.onrender.com/api/v1/verifyorder', { response: response },config
            
            )   
        }

    }
    const rzp =  new Razorpay(options);
    rzp.open();
}

//4718 6091 0820 4366

  const handlePayment = async(amount)=> {
    amount = Math.round( orderInfo.totalPrice);
   try {
       const _pay = { amount: amount}
       const config={
        headers:{
            'x-auth-token':localStorage.getItem("token"),
            'Content-type':"application/json"

        }
    }
       const {data}= await axios.post('https://e-commerce-dk.onrender.com/api/v1/ordercreate', _pay,config
              
       )
       console.log(data)
       if(data){
             handleOpenRazorpay(data.data)
       }
   } catch (error) {
       console.log(error)
   }
}



  return (


    <div className="row wrapper"> 
    <div style={{borderRadius:'30px',padding:'3rem'}}>
        
            <h1 className="mb-3" style={{textAlign:'center',fontWeight:"bold",marginBottom:"10px"}}>confirm payment</h1>
            
            <div className='razerpay' >
                <img src='/images/products/razorpay.png' alt='Razerpay company' />
  
                
            </div   >
            <div  style={{margin:'20px',display:'grid',placeItems:"center"}}>
            <Button
                id="rzp-button1"
                type="submit"
                className="btn"
               
             
                onClick={()=>handlePayment(Number(orderInfo.totalPrice))}
                >
                Pay - { `$${orderInfo && orderInfo.totalPrice}` }
            </Button>
            </div>
           <h3>Demo Card No: 4718 6091 0820 4366</h3>
       
    </div>
    
  </div>


  
   
  
  )
}