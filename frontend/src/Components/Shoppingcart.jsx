import { useDispatch, useSelector } from "react-redux"
import "../css/Shoppingcart.css"
import { incrementdecrement, removefromcart } from "../features/CartSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTruck, faTag } from '@fortawesome/free-solid-svg-icons'
import Navbardesktop from './Navbar-desktop'
import Footer from './Footer'

const Shoppingcart = () => {
    const items = useSelector((state) => state.cart)

   // console.log(items)
    const dispatch = useDispatch()
    const { cart, totalPrice } = items

    return (
        <>
            <Navbardesktop />
            <div className="shopping-cart-container">
                <div className="cart-wrapper">
                    <div className="cart-main">
                        <div className="cart-header">
                            <h2 className="cart-title">Shopping Cart</h2>
                            <span className="cart-items-count">{cart.length} items</span>
                        </div>

                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-main">
                                        <div className="item-image">
                                            <img src={item.imageURL} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <div className="item-category">{item.maincategory}</div>
                                            <div className="item-name">{item.name}</div>
                                        </div>
                                        <div className="item-quantity">
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => {
                                                    if(item.quantity > 1) {
                                                        dispatch(incrementdecrement({value: -1, id: item.id, price: item.new_price}))
                                                    }
                                                }}
                                            >-</button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => {
                                                    dispatch(incrementdecrement({value: +1, id: item.id, price: item.new_price}))
                                                }}
                                            >+</button>
                                        </div>
                                        <div className="item-price">
                                            €{item.new_price * item.quantity}
                                            <button 
                                                className="remove-btn"
                                                onClick={() => dispatch(removefromcart(item))}
                                            >×</button>
                                        </div>
                                    </div>
                                    <div className="item-specs">
                                        <span>Size: {item.selectedsize}</span>
                                        <span>Color: {item.selectedcolor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="back-to-shop">
                            <a href="#">
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Back to shop</span>
                            </a>
                        </div>
                    </div>

                    <div className="cart-summary">
                        <h2 className="summary-title">Summary</h2>
                        
                        <div className="summary-row">
                            <span>ITEMS - {cart.length}</span>
                            <span>€{totalPrice}</span>
                        </div>

                        <div className="summary-section">
                            <div className="section-header">
                                <FontAwesomeIcon icon={faTruck} />
                                <h3>SHIPPING</h3>
                            </div>
                            <select className="shipping-select">
                                <option>Standard Delivery - €5.00</option>
                            </select>
                        </div>

                        <div className="summary-section">
                            <div className="section-header">
                                <FontAwesomeIcon icon={faTag} />
                                <h3>PROMO CODE</h3>
                            </div>
                            <input 
                                type="text" 
                                className="promo-input" 
                                placeholder="Enter your code"
                            />
                        </div>

                        <div className="summary-total">
                            <span>TOTAL PRICE</span>
                            <span>€{totalPrice}</span>
                        </div>

                        <button className="checkout-btn">CHECKOUT</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Shoppingcart
