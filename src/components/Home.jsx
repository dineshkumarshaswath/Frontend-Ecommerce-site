import React, { Fragment, useEffect,useState  } from 'react'
import Metadata from './layout/Metadata'
import { getProducts } from '../actions/productsActions'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './layout/Loader'
import Product from './product/product'
import { toast } from 'react-toastify'
import Paginaton from 'react-js-pagination'
import { Carousel } from 'react-bootstrap'







export default function Home() {
   
    const {products,loading,error,productsCount,resPerPage}=useSelector((state)=>state.productsState)
  const dispatch=useDispatch()
  const[currentPage,setCurrentpage]=useState(1)

  const setCurrentpageno =(pageNo)=>{
     setCurrentpage(pageNo)
    
  }

     useEffect(()=>{
      

        if(error){
           return  toast.error(error,{
                position:toast.POSITION.BOTTOM_CENTER
            })
        }
      
     
        dispatch(getProducts(null,null,null,null,currentPage))
        

     },[error,dispatch,currentPage])  

    return (
       
        <Fragment>
            {loading?<Loader/>:<Fragment>
             <Metadata title={'Latest roducts'}/>
            <h1 id="products_heading">Latest Products</h1>
           
                        <Carousel pause='hover'>
                            
                                <Carousel.Item >
                                    <img className="d-block w-100" src={'/images/products/carousel2.jpg'} alt={'carousel2'} />
                                   

                                </Carousel.Item>
                                <Carousel.Item>
                                <img className="d-block w-100" src={'/images/products/carousel5.jpg'} alt={'carousel5'} />
                                </Carousel.Item>
                                <Carousel.Item>
                                <img className="d-block w-100" src={'/images/products/carousel1.jpg'} alt={'carousel1'} />
                                </Carousel.Item>
                                <Carousel.Item>
                                <img className="d-block w-100" src={'/images/products/carousel4.jpg'} alt={'carousel4'} />
                                </Carousel.Item>

                        


                        </Carousel>

                   
            <section id='products' className='container mt-5'>
        <div className="row">
            { products && products.map((product,idx)=>(
               <Product  col={3} key={product._id} product={product}/>

            ))}
        
        </div>
        </section>
        {productsCount >0 && productsCount>resPerPage?
        <div className='d-flex justify-content-center mt-5'>
          

          <Paginaton 
            activePage={currentPage}
            onChange={setCurrentpageno}
            totalItemsCount={productsCount}
            itemsCountPerPage={resPerPage}
            nextPageText={'Next'}
            firstPageText={'first'}
            lastPageText={'last'}
            itemClass='page-item'
            linkClass='page-link'
  
          
          />
  
          </div>:null }
        

        </Fragment>}
         
        </Fragment>
      

    )
}