import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../components/slices/productsSlice'
import { createReviewFail, createReviewRequest,
    createReviewSuccess,
     deleteProductFail,
     deleteProductRequest,
     deleteProductSuccess,
     deleteReviewFail,
     deleteReviewRequest,
     deleteReviewSuccess,
     newProductFail,
     newProductRequest,
     newProductSuccess,
     productFail,
      productRequest,
       productSuccess, 
       reviewsFail, 
       reviewsRequest, 
       reviewsSuccess, 
       updateProductFail, 
       updateProductRequest,
       updateProductSuccess} from '../components/slices/productSlice'

export const getProducts =(keyword,price,category,rating,currentPage)=>async (dispatch) =>{
     try {
        dispatch(productsRequest())
       

         let link=`https://e-commerce-dk.onrender.com/api/v1/products?page=${currentPage}`
         if(keyword){
               link+=`&keyword=${keyword}`
             
         }
         if(price){
            link +=`&price[gte]=${price[0]}&price[lte]=${price[1]}`
          
      }
      if(category){
         link +=`&category=${category}`
       
   }
      if(rating){
         link +=`&ratings=${rating}`
       
   }
       
            const {data}=await axios.get(link)
        dispatch(productsSuccess(data))
        
     } catch (error) {
        //handle error
        dispatch( productsFail(error.response.data.message))


        
     }
   


}

export const getProduct = id => async (dispatch) =>{
   try {
      dispatch(productRequest())
     
    const {data}=await axios.get(`https://e-commerce-dk.onrender.com/api/v1/products/${id}`)
      dispatch(productSuccess(data))
      
   } catch (error) {
      //handle error
      dispatch( productFail(error.response.data.message))


      
   }
 


}



export const createReview = reviewData => async (dispatch) => {
   try {
      dispatch(createReviewRequest())
      const config={
         headers:{
            'x-auth-token':localStorage.getItem("token"),
            'Content-type':'application/json'
         }
      }
     
    const { data }=await axios.put('https://e-commerce-dk.onrender.com/api/v1/product/review',reviewData,config)
      dispatch(createReviewSuccess(data))                                                                                          
      
   } catch (error) {
      //handle error
      dispatch( createReviewFail(error.response.data.message))


      
   }
 


}


export const getAdminProducts = async(dispatch)=>{
   try {
      dispatch(adminProductsRequest())
      const config={
         headers:{
            'x-auth-token':localStorage.getItem("token")
         }
      }
      const {data} =await axios.get(`https://e-commerce-dk.onrender.com/api/v1/admin/products`,config)

      dispatch(adminProductsSuccess(data))
      
   } catch (error) {
      dispatch(adminProductsFail(error.response.data.message))
      
   }
}



export const creatNewProduct = productData => async(dispatch)=>{
   try {
      dispatch(newProductRequest())
      const config={
         headers:{
            'x-auth-token':localStorage.getItem("token"),
             'Content-type':'multipart/form-data'
         }
      }
      const {data} =await axios.post(`https://e-commerce-dk.onrender.com/api/v1/products/new`,productData,config)

      dispatch(newProductSuccess(data))
      
   } catch (error) {
      dispatch(newProductFail(error.response.data.message))
      
   }
}


export const deleteProduct = id => async(dispatch)=>{
   try {
      dispatch(deleteProductRequest())
      const config={
         headers:{
            'x-auth-token':localStorage.getItem("token")
            
         }
      }
      
      await axios.delete(`https://e-commerce-dk.onrender.com/api/v1/admin/product/${id}`,config)

      dispatch(deleteProductSuccess())
      
   } catch (error) {
      dispatch(deleteProductFail(error.response.data.message))
      
   }
}


export const updateProduct = (id,productData) => async(dispatch)=>{
   try {
      dispatch(updateProductRequest())
      const config={
         headers:{
            'x-auth-token':localStorage.getItem("token"),
             'Content-type':'multipart/form-data'
         }
      }
      const {data} =await axios.put(`https://e-commerce-dk.onrender.com/api/v1/admin/product/${id}`,productData,config)

      dispatch(updateProductSuccess(data))
      
   } catch (error) {
      dispatch(updateProductFail(error.response.data.message))
      
   }
}


export const getReviews = id=> async (dispatch) =>{
   try {
      dispatch(reviewsRequest())
     // console.log(id,3)
       const config={ 
            'x-auth-token':localStorage.getItem("token"),
     
         }
      
     
   
      
   const {data}=await axios.get(`https://e-commerce-dk.onrender.com/api/v1/admin/allreviews`,{
      params: {
         id
      },
      headers: config
  })
     console.log(data,34)
   
   dispatch(reviewsSuccess(data))
      
   } catch (error) {
      //handle error
      dispatch( reviewsFail(error.response.data.message))


      
   }
 


}


export const deleteReview = (productId,id)=> async (dispatch) =>{
   try {
      dispatch(deleteReviewRequest())
       const config={
        
            'x-auth-token':localStorage.getItem("token")
             
         
      }
     
    await axios.delete(`https://e-commerce-dk.onrender.com/api/v1/admin/review`,{params:{productId,id},headers:config})
      dispatch(deleteReviewSuccess())
      
   } catch (error) {
      //handle error
      dispatch( deleteReviewFail(error.response.data.message))


      
   }
 


}


