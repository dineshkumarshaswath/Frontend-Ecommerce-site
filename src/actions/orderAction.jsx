import { createOrderFail, createOrderRequest, createOrderSuccess,
     orderDetailFail,
     orderDetailSuccess,
     userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../components/slices/orderSlice"
import axios from 'axios'



export const createOrder= order=>async(dispatch) =>{
    try {
        dispatch(createOrderRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}= await axios.post("https://e-commerce-dk.onrender.com/api/v1/order/new",order,config)
        dispatch(createOrderSuccess())

        
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
        
    }
    
}



export const userOrder = async(dispatch) =>{
    try {
        dispatch(userOrdersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}= await axios.post("https://e-commerce-dk.onrender.com/api/v1/myorders",config)
        dispatch(userOrdersSuccess(data))

        
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
        
    }
    
}



export const orderDetail = (id)=>async(dispatch) =>{
    try {
        dispatch(orderDetailRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}= await axios.post(`https://e-commerce-dk.onrender.com/api/v1/order/${id}`,config)
        dispatch(orderDetailSuccess(data))

        
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
        
    }
    
}





