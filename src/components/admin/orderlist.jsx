import { Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Loader from '../layout/Loader'
import Sidebar from './sidebar'
import {MDBDataTable} from 'mdbreact'
import {toast} from 'react-toastify' 

import { deleteOrder ,adminOrders as adminOrderAction} from '../../actions/orderAction'
import { clearError, clearOrderDeleted } from '../slices/orderSlice'


export default function Orderlist(){
    const {adminOrders=[],loading=true, error,isOrderDeleted}=useSelector(state=>state.orderState)
    
    const dispatch=useDispatch()
   const setOrders =()=>{
     
    const data={
        columns:[
            {
                label:'ID',
                field:'id',
                sort:"asc"
            },
            {
                label:'Number of Items',
                field:'noOfItmes',
                sort:"asc"
            },
            {
                label:'Amount',
                field:'amount',
                sort:"asc"
            },
            {
                label:'Status',
                field:'status',
                sort:"asc"
            },
            {
                label:'Action',
                field:'actions',
                sort:"asc"
            }
        ],
        rows:[]
    }
    adminOrders.forEach(order=>{
        data.rows.push({
            id:order._id,
            noOfItmes:order.orderItems.length,
            amount:`$${order.totalPrice}`,
            status:<p style={{color:order.orderStatus.includes('Processing')? 'red' : "green"}} >{order.orderStatus}</p>,
            actions:(
                <Fragment>
                   
                    <Link to={`/admin/order/${order._id}`} className='btn btn-primary' ><i className='fa fa-pencil'></i></Link>
                <Button className='btn btn-danger py-1 px-2 ml-2' onClick={(e)=>deleteHandler(e, order._id)}>
                    <i className='fa fa-trash'></i>
                </Button>
                </Fragment>

            )
        })
    })

     return data

   }

   const deleteHandler=(e,id)=>{
    e.target.disabled=true
    dispatch(deleteOrder(id))
    
   }

   useEffect(()=>{

    if (error ) {
        toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "error",
          onOpen: () => { dispatch(clearError()) }
        })
  
        return
      }

    


       if(isOrderDeleted){
      toast('order deleted successfully ',{
        type:"success",
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearOrderDeleted())
    })
   
    
    return 

     }



      dispatch(adminOrderAction)
   },[dispatch,error,isOrderDeleted])


    return(
        <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
            <h1 className="my-4">Order List</h1>
          <Fragment>
            {loading ? <Loader/>:
            <MDBDataTable
             data={setOrders()}
             bordered
             striped 
             hover
             className='px-3'

            />
            
            }
          </Fragment>

        </div>



    </div>
    )
}