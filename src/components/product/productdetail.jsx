import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../../actions/productsActions"
import { useParams } from "react-router-dom"
import Loader from "../layout/Loader"
import { Carousel } from 'react-bootstrap'
import Metadata from "../layout/Metadata"
import { addCartItem } from "../../actions/cartAction"
import { Modal ,Button} from "react-bootstrap"


export default function ProductDetail() {
    const { id } = useParams()
    const { product, loading, error } = useSelector((state) => state.productState)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);
    const [comment,setComment]=useState('')

    const increaseQty = () => {
        const count = document.querySelector(".count")
        if (product.stock == 0 || count.valueAsNumber >= product.stock) {
            return
        }
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector(".count")
        if (count.valueAsNumber == 1) {
            return
        }
        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }


   

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rating,setRating]=useState(1)









    useEffect(() => {
        dispatch(getProduct(id))

    }, [dispatch, id])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <Metadata title={product.name} />
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image" key={product._id}>
                        <Carousel pause='hover'>
                            {product.images && product.images.map((image) => (
                                <Carousel.Item key={image.id}>
                                    <img className="d-block w-100" src={image.images} alt={product.name} height="500" width="500" />

                                </Carousel.Item>
                            ))}


                        </Carousel>

                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product #{product._id}</p>

                        <hr />

                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.noOfReviews} Reviews)</span>

                        <hr />

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <button type="button" id="cart_btn"
                            disabled={product.stock == 0 ? true : false}
                            onClick={() => dispatch(addCartItem(product._id, quantity))}
                            className="btn btn-primary d-inline ml-4">Add to Cart</button>

                        <hr />

                        <p>Status: <span className={product.stock > 0 ? 'greenColor' : "redColor"} id="stock_status">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p> {product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                        <button id="review_btn" onClick={handleShow}  type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                        </button>

                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">

                            

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Submit Review</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <ul className="stars" >
                                        {[1,2,3,4,5].map(star=>(
                                             <li  value={star}
                                              onClick={()=>setRating(star)}
                                                 className={`star ${star<=rating?'orange':""}`}
                                                 onMouseOver={(e)=>e.target.classList.add("yellow")}
                                                 onMouseOut={(e)=>e.target.classList.remove("yellow")}>
                                                <i className="fa fa-star"></i>
                                                </li>

                                        ))}
                                                   
                                                  
                                                </ul>

                                                <textarea name="review" id="review"  onChange={e=>setComment(e.target.value)}
                                                className="form-control mt-3">

                                                </textarea>
                                            
                                               <button aria-label="Close" disabled={loading} 
                                                className='btn my-3 float-right review-btn px-4 text-white'>Submit</button>

                                    </Modal.Body>
                                   
                                </Modal>

                            </div>

                        </div>

                    </div>
                </div>
            </Fragment>}

        </Fragment>





    )

}