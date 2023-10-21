import { Fragment, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams,Link } from "react-router-dom";

import { toast } from "react-toastify";
import{getUser,updateUser} from '../../actions/userAction'
import{clearError,clearUserUpdated} from '.././slices/userSlice'





export default function Updateuser() {

  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[role,setRole]=useState("")

  const{user={},loading,error,isUserUpdated}=useSelector(state=>state.userState)
  const{user:authUser}=useSelector(state=>state.authState)


    const { id:userId } = useParams()


    const navigate = useNavigate()
    const dispatch = useDispatch()




    const submitHander = (e) => {
        e.preventDefault()
        const formData=new FormData()
        formData.append('name',name)
        formData.append('email',email)
        formData.append('role',role)

        dispatch(updateUser(userId, formData))

    }



    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated successfully ', {
                type: "success",
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })


            return

        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => dispatch(clearError())
            })
            return
        }

        dispatch(getUser(userId))

    }, [isUserUpdated, error, dispatch])

    useEffect(() => {
        if (user._id) {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)



        }



    }, [user])





    return (
        <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <Fragment>
            <h1 className="my-4">Update User</h1>
            <div className="wrapper my-5">
              <form  onSubmit={submitHander} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-4">Update Product</h1>
  
                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="price_field">Email</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
  
  
                <div className="form-group">
                  <label htmlFor="category_field">Role</label>
                  <select disabled={user._id === authUser._id?true:false} className="form-control" id="category_field"
                    onChange={e => setRole(e.target.value)}
                    value={role}>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                    
  
                  </select>
                </div>
               
              
  
                <button
                  id="login_button"
                  type="submit"
                  
                  
                  className="btn btn-block py-3"
                >
                 Update User
                </button>
  
              </form>
            </div>
  
          </Fragment>
  
        </div>
  
  
  
      </div>


    )
}