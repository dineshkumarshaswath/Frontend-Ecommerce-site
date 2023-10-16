import React from 'react'
import  logo from '../../images/logo.png'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown,Image, DropdownButton} from 'react-bootstrap'
import { logout } from '../../actions/userAction'


export default function Header() {

    const {isAuthenticated,user}= useSelector(state=>state.authState)
    const { items:cartItems }=useSelector(state=>state.cartState)
     const dispatch=useDispatch()
      const navigate=useNavigate()

    const logoutHandler=()=>{
        dispatch(logout)
        navigate('/')

    }

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to={'/'}>  
                     <img style={{width:'70px',height:"60px",objectFit:"contain"}} src={logo} alt='DKShop' /></Link>
                 
                  
                    
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
               <Search/>
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ?
                (
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle  variant="default text-white pr-5" id='dropdown-basic'>
                            <figure className='avatar avatar-nav'>
                                <Image width='50px' src={user.avatar??'/images/products/avatar.png'}/>

                            </figure>
                            <span>{user.name}</span>

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                  
                        <Dropdown.Item className='text-dark' onClick={()=>navigate('/myprofile')}>Profile</Dropdown.Item>
                        <Dropdown.Item className='text-dark' onClick={()=>navigate('/orders')}>Orders</Dropdown.Item>
                         <Dropdown.Item className='text-danger' onClick={logoutHandler}>Log Out</Dropdown.Item>

                        </Dropdown.Menu>

                    </Dropdown>
                )
                : 
                 <Link  to={'/login'}  className="btn" id="login_btn" >Login</Link>}
              

               <Link to='/cart'><span id="cart" className="ml-3">Cart</span>
                <span className="ml-1" id="cart_count">{cartItems.length}</span></Link> 
            </div>
        </nav>
    )
}