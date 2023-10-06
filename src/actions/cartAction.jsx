import { addCartItemRequest, addCartItemSuccess } from "../components/slices/cartSlice"
import axios from 'axios'



export const addCartItem=(id,quantity)=>async(dispatch)=>{

    try {
        dispatch(addCartItemRequest())
        const {data}=await axios.get(`https://e-commerce-dk.onrender.com/api/v1/products/${id}`)
        dispatch(addCartItemSuccess({
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            images:data.product.images[0].images,
            stock:data.product.stock,
            quantity

        }))
        
    } catch (error) {
        console.log(error)
        
    }

}