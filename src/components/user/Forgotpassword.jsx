import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, forgotPasswordhandler,   } from "../../actions/userAction"
import { toast } from "react-toastify"


export default function ForgotPassword(){

    const {message,error} =useSelector(state=>state.authState)

    const[email,setEmail]=useState('')
    const dispatch=useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('email',email)
        dispatch(forgotPasswordhandler(formData))

    }


    useEffect(()=>{
        if(message){
            toast('Email successfully sent',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER
            })
            setEmail("")
            return

        }

        
            if(error){
                toast(error,{
                 position:toast.POSITION.BOTTOM_CENTER,
                 type:"error",
                 onOpen:()=>{dispatch(clearAuthError)}
             })
                return 
             }
            

    },[error,message,dispatch])

    return(

        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler}  className="shadow-lg">
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Send Email
            </button>

            </form>
        </div>
    </div>

    )
}