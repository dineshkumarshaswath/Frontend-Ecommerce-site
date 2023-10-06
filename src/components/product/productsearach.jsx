import React, { Fragment, useEffect, useState } from 'react'
import Metadata from '../layout/Metadata'
import { getProducts } from '../../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import Product from '../product/product'
import { toast } from 'react-toastify'
import Paginaton from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'






export default function Productsearch() {

    const { products, loading, error, productsCount,
        resPerPage } = useSelector((state) => state.productsState)
    const dispatch = useDispatch()
    const [currentPage, setCurrentpage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [pricechanged, setPricechanged] = useState(price)
    const [category, setCategory] = useState(null)
    const[rating,setRating]=useState(0)

    const categories = ['Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home']


    const { keyword } = useParams()

    const setCurrentpageno = (pageNo) => {
        setCurrentpage(pageNo)


    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }


        dispatch(getProducts(keyword, price,category,rating, currentPage))


    }, [error, dispatch, currentPage, keyword, pricechanged,category,rating])

    return (

        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <Metadata title={'Latest roducts'} />
                <h1 id="products_heading">Search Products</h1>
                <section id='products' className='container mt-5'>
                    <div className="row">
                        <div className='col-6 col-md-3 mb-5 mt-5'>
                            {/* price filter */}
                            <div className='px-5' onMouseUp={() => setPricechanged(price)}>
                                <Slider
                                    range={true}
                                    marks={{
                                        1: '$1',
                                        1000: "$1000"
                                    }}
                                    min={1}
                                    max={1000}
                                    defaultValue={price}
                                    onChange={(price) => {
                                        setPrice(price)
                                    }}

                                    handleRender={
                                        renderProps => {
                                            return (

                                                <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                                    <div {...renderProps.props}></div>
                                                </Tooltip>
                                            )
                                        }
                                    }

                                />

                            </div>

                            <hr className='my-5' />
                            {/* Category filter */}
                            <div className='mt-5'>
                                <h3>Categories</h3>
                                <ul className='pl-0'>
                                    {categories.map(category => (
                                        <li
                                          
                                            style={{ cursor: 'pointer', listStyleType: "none" }}
                                             key={category}
                                             onClick={()=>setCategory(category)}>
                                            {category}
                                            </li>
                                    ))}


                                </ul>

                            </div>
                            <hr/>
                             {/* Ratings filter */}
                             <div className='mt-5'>
                                <h4 className='mb-3'>Ratings</h4>
                                <ul className='pl-0'>
                                    {[5,4,3,2,1].map(rating => (
                                        <li
                                          
                                            style={{ cursor: 'pointer', listStyleType: "none" }}
                                             key={rating}
                                             onClick={()=>setRating(rating)}>
                                            <div className='rating-outer' >
                                                <div className='rating-inner' style={{width:`${rating/5*100}%`}} ></div>
                                            </div>
                                            </li>
                                    ))}


                                </ul>
                             </div>


                        </div>

                        <div className='col-6 col-md-9 '>
                            <div className='row'>
                                {products && products.map((product, idx) => (
                                    <Product col={4} key={product._id} product={product} />

                                ))}
                            </div>
                        </div>


                    </div>
                </section>
                {productsCount > 0 && productsCount > resPerPage ?
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

                    </div> : null}


            </Fragment>}

        </Fragment>


    )
}