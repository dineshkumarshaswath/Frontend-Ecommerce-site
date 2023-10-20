import { createOrderFail, createOrderRequest, createOrderSuccess,
     orderDetailFail,
     orderDetailSuccess,orderDetailRequest,
     userOrdersFail, userOrdersRequest, userOrdersSuccess, adminOrdersRequest, adminOrdersSuccess, adminOrdersFail, deleteOrdersRequest, deleteOrdersSuccess, deleteOrdersFail, updateOrdersRequest, updateOrdersSuccess, updateOrdersFail } from "../components/slices/orderSlice"
import axios from 'axios'



export const createOrder= (order) =>async(dispatch) =>{
    try {
        dispatch(createOrderRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token"),
                'Content-type':"application/json"

            }
        }
        const {data}= await axios.post("https://e-commerce-dk.onrender.com/api/v1/order/new",order,config)
        dispatch(createOrderSuccess(data))

        
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
        
    }
    
}



export const userOrder = (id)=>async(dispatch) =>{
    try {
        dispatch(userOrdersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}= await axios.get("https://e-commerce-dk.onrender.com/api/v1/myorders",config)
      
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
        const {data}= await axios.get(`https://e-commerce-dk.onrender.com/api/v1/order/${id}`,config)
        dispatch(orderDetailSuccess(data))
       

        
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
        
    }
    
}


export const adminOrders =async(dispatch) =>{
    try {
        dispatch(adminOrdersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}=  await axios.get("https://e-commerce-dk.onrender.com/api/v1/admin/orders",config)
      
        dispatch(adminOrdersSuccess(data))
        

        
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
        
    }
    
}


export const deleteOrder = (id)=>async(dispatch) =>{
    try {
        dispatch(deleteOrdersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        await axios.delete(`https://e-commerce-dk.onrender.com/api/v1/admin/order/${id}`,config)
        dispatch(deleteOrdersSuccess())
       

        
    } catch (error) {
        dispatch(deleteOrdersFail(error.response.data.message))
        
    }
    
}



export const updateOrder = (id,orderData)=>async(dispatch) =>{
    try {
        dispatch(updateOrdersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const {data}= await axios.put(`https://e-commerce-dk.onrender.com/api/v1/admin/order/${id}`,orderData,config)
        dispatch(updateOrdersSuccess(data))
       

        
    } catch (error) {
        dispatch(updateOrdersFail(error.response.data.message))
        
    }
    
}



