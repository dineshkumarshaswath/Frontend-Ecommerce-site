import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, updateProfile } from "../../actions/userAction"
import { toast } from "react-toastify"
import { clearUpdateProfile } from "../slices/authSlice"


export default function UpdateProfile(){

    const{error,user,isUpdated}=useSelector(state=>state.authState)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[avatar,setAvatar]=useState('/imges/products/avatar.png')
    const[avatarPreview,setAvatarpreview]=useState('')
    const dispatch=useDispatch()

    const onChangeAvatar=(e)=>{
        const reader= new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                setAvatarpreview(reader.result)
                setAvatar(e.target.files[0])

            }
        }
        reader.readAsDataURL(e.target.files[0])

    }

    const submitHandler=(e)=>{
        e.preventDefault()
        const formData= new FormData();
        formData.append("name",name)
        formData.append("email",email)
        formData.append("avatar",avatar)
        // console.log(formData.forEach(value=>value))

        dispatch(updateProfile(formData))


    }

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            if(user.avatar){
                setAvatarpreview(user.avatar)
            }
        }
        if(isUpdated){
            toast('profile successfully updated',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen:()=>dispatch(clearUpdateProfile())
            })
            
            return 
        }

        
            if(error){
                toast(error,{
                 position:toast.POSITION.BOTTOM_CENTER,
                 type:"error",
                 onOpen:()=>dispatch(clearAuthError())
             })
                return 
             }

        

    },[isUpdated,error,dispatch,user])



    return(
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChangeAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" 
                        >Update</button>
                    </form>
                </div>
            </div>

    )
}