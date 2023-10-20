import { Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { clearError } from '../slices/productsSlice'
import Loader from '../layout/Loader'
import Sidebar from './sidebar'
import {MDBDataTable} from 'mdbreact'
import {toast} from 'react-toastify' 
import {deleteProduct, getAdminProducts} from '../../actions/productsActions'
import { cleaerProductDeleted } from '../slices/productSlice'


export default function Productlist(){
    const {products=[],loading=true, error}=useSelector(state=>state.productsState)
    const {isProductDeleted,error:productError}=useSelector(state=>state.productState)
    const dispatch=useDispatch()
   const setProducts =()=>{
     
    const data={
        columns:[
            {
                label:'ID',
                field:'id',
                sort:"asc"
            },
            {
                label:'Name',
                field:'name',
                sort:"asc"
            },
            {
                label:'Price',
                field:'price',
                sort:"asc"
            },
            {
                label:'Stock',
                field:'stock',
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
    products.forEach(product=>{
        data.rows.push({
            id:product._id,
            name:product.name,
            price:`$${product.price}`,
            stock:product.stock,
            actions:(
                <Fragment>
                   
                    <Link to={`/admin/product/${product._id}`} className='btn btn-primary' ><i className='fa fa-pencil'></i></Link>
                <Button className='btn btn-danger py-1 px-2 ml-2' onClick={(e)=>deleteHandler(e, product._id)}>
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
    dispatch(deleteProduct(id))
    
   }

   useEffect(()=>{

    if (error || productError) {
        toast(error || productError, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "error",
          onOpen: () => { dispatch(clearError()) }
        })
  
        return
      }

    


       if(isProductDeleted){
      toast('Product deleted successfully ',{
        type:"success",
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(cleaerProductDeleted())
    })
   
    
    return 

     }



      dispatch(getAdminProducts)
   },[dispatch,error,isProductDeleted])


    return(
        <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
            <h1 className="my-4">Product List</h1>
          <Fragment>
            {loading ? <Loader/>:
            <MDBDataTable
             data={setProducts()}
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