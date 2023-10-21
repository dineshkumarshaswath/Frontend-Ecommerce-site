import {
    loginRequest,
    loginFail,
    loginSuccess,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logOutSuccess,
    logOutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '.././components/slices/authSlice'
import axios from 'axios'
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, userSuccess, usersFail, usersRequest, usersSuccess } from '../components/slices/userSlice'
import { deleteOrdersFail } from '../components/slices/orderSlice'


export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
       
        const { data } = await axios.post("https://e-commerce-dk.onrender.com/api/v1/login", { email, password })
         
        localStorage.setItem('token',data.token)
        dispatch(loginSuccess(data))


    } catch (error) {
        //error handling
        dispatch(loginFail(error.response.data.message))


    }
}

export const clearAuthError = (dispatch) => {
    dispatch(clearError())


}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config={
            headers:{
                'Content-type':"multipart/form-data"
            }
        }

        const { data } = await axios.post("https://e-commerce-dk.onrender.com/api/v1/register", 
        userData,config)
        localStorage.setItem('token',data.token)

        dispatch(registerSuccess(data))


    } catch (error) {
        //error handling
        dispatch(registerFail(error.response.data.message))


    }
}


export const loadUser =  async (dispatch) => {

    try {
        dispatch(loadUserRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
       
        const { data } = await axios.get("https://e-commerce-dk.onrender.com/api/v1/myprofile",config)
       // localStorage.setItem('token',data.token)

        dispatch(loadUserSuccess(data))


    } catch (error) {
        //error handling
        dispatch(loadUserFail(error.response.data.message))


    }
}

export const logout =   (dispatch) => {

    try {
       
        localStorage.removeItem('token')


        dispatch(logOutSuccess())


    } catch (error) {
        //error handling
        dispatch(logOutFail(error.response.data.message))


    }
}


export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token"),
                'Content-type':"multipart/form-data"
            }
        }

        const { data } = await axios.put("https://e-commerce-dk.onrender.com/api/v1/user/updatemyprofile", 
        userData,config)
        

        dispatch(updateProfileSuccess(data))


    } catch (error) {
        //error handling
        dispatch(updateProfileFail(error.response.data.message))


    }
}


export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token"),
                'Content-type':"application/json"
            }
        }

        await axios.put("https://e-commerce-dk.onrender.com/api/v1/user/changepassword", 
        formData,config)
        

        dispatch(updatePasswordSuccess())


    } catch (error) {
        //error handling
        dispatch(updatePasswordFail(error.response.data.message))


    }
}

export const forgotPasswordhandler = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config={
            headers:{
               'Content-type':"application/json"
            }
        }

         const {data} = await axios.post("https://e-commerce-dk.onrender.com/api/v1/forgot",formData,config)
        

        dispatch(forgotPasswordSuccess(data))


    } catch (error) {
        //error handling
        dispatch(forgotPasswordFail(error.response.data.message))


    }
}


export const resetPasswordhandler = (formData,token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config={
            headers:{
               
                'Content-type':"application/json"
            }
        }

         const {data} = await axios.post(`https://e-commerce-dk.onrender.com/api/v1/password/reset/${token}`, 
        formData,config)
        localStorage.setItem('token',data.token)
        

        dispatch(resetPasswordSuccess(data))


    } catch (error) {
        //error handling
        dispatch(resetPasswordFail(error.response.data.message))


    }
}



export const getUsers =  async (dispatch) => {

    try {
        dispatch(usersRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
       
        const { data } = await axios.get("https://e-commerce-dk.onrender.com/api/v1/admin/users",config)
       // localStorage.setItem('token',data.token)

        dispatch(usersSuccess(data))


    } catch (error) {
        //error handling
        dispatch(usersFail(error.response.data.message))


    }
}


export const getUser = id=> async (dispatch) => {

    try {
        dispatch(userRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
       
        const { data } = await axios.get(`https://e-commerce-dk.onrender.com/api/v1/admin/user/${id}`,config)
       // localStorage.setItem('token',data.token)

        dispatch(userSuccess(data))


    } catch (error) {
        //error handling
        dispatch(userFail(error.response.data.message))


    }
}


export const deleteUser = id=> async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token")
            }
        }
       
         await axios.delete(`https://e-commerce-dk.onrender.com/api/v1/admin/user/${id}`,config)
       // localStorage.setItem('token',data.token)

        dispatch(deleteUserSuccess())


    } catch (error) {
        //error handling
        dispatch(deleteUserFail(error.response.data.message))


    }
}


export const updateUser = (id,formData)=> async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("token"),
                'Content-type':'application/json'
            }
        }
       
         await axios.put(`https://e-commerce-dk.onrender.com/api/v1/admin/user/${id}`,formData,config)
       // localStorage.setItem('token',data.token)

        dispatch(updateUserSuccess())


    } catch (error) {
        //error handling
        dispatch(updateUserFail(error.response.data.message))


    }
}



