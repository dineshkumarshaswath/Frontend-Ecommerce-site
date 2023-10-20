import { createSlice } from "@reduxjs/toolkit";


const orderSlice=createSlice({
    name:"order",
    initialState:{
        orderDetail:{},
        userOrders:[],
        adminOrders:[],
        isOrderDeleted:false,
        isOrderUpdated:false,
        loading:false
    },
    reducers:{
        createOrderRequest(state,action){
           return {
            ...state,
            loading:true
        } 
        },
        createOrderSuccess(state,action){
            return{
            ...state,
            loading:false,
            orderDetail:action.payload.order
            }
        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{

                ...state,
                error:null
            }
        },
        userOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                userOrders:action.payload.order
            }
        },
        userOrdersFail(state,action){
            return{
                ...state,
                loading:false,
              error:action.payload
            }
        },
        orderDetailRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDetailSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }
        },
        orderDetailFail(state,action){
            return{
                ...state,
                loading:false,
              error:action.payload
            }
        },
        adminOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders:action.payload.order
            }
        },
        adminOrdersFail(state,action){
            return{
                ...state,
                loading:false,
              error:action.payload
            }
        },
        deleteOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                isOrderDeleted:true
               
            }
        },
        deleteOrdersFail(state,action){
            return{
                ...state,
                loading:false,
              error:action.payload
            }
        },
        updateOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                isOrderUpdated:true
               
            }
        },
        updateOrdersFail(state,action){
            return{
                ...state,
                loading:false,
              error:action.payload
            }
        },
        clearOrderDeleted(state,action){
            return{
                ...state,
                isOrderDeleted:false

            }
        },
        clearOrderUpdated(state,action){
            return{
                ...state,
                isOrderUpdated:false

            }
        }
        

    }
})


const{actions,reducer}=orderSlice
 export const {createOrderSuccess,createOrderRequest,createOrderFail,clearError,
userOrdersFail,userOrdersRequest,
userOrdersSuccess,orderDetailFail,orderDetailRequest,
orderDetailSuccess,adminOrdersFail,adminOrdersRequest,adminOrdersSuccess,
deleteOrdersFail,deleteOrdersRequest,deleteOrdersSuccess,updateOrdersFail,
updateOrdersRequest,updateOrdersSuccess,clearOrderDeleted,clearOrderUpdated
}=actions

export default reducer

