import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo2 from '../../../assets/images/logo2.png';
import logo3 from '../../../assets/images/logo3.png';
import { connect } from 'react-redux';
import { placeOrder } from '../../redux/actions/order-actions';
import { logOutBuyer } from './../../redux/actions/login-action';

class BuyerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user1')),
            logOut: false,
            cart: [],
            cart_total: 0,
            order_successful: false
        }
    }
    componentDidMount() {
        this.setCart();
    }   
    componentWillReceiveProps(next) {
        if(next.order_successful) {
            localStorage.setItem('cart', null);
            this.setCart();
            this.setState({
                order_successful: true
            })
        } else {
            this.setCart();
        }
    }
    render() {
        if(!this.props.isAuthenticatedBuyer) {
            return <Redirect to='/'/>
        }
        if(this.state.order_successful) {
            return <Redirect to='/buyer/orderhistory'/>
        }
        let cart_rows;
        let footer = null;
        if(this.state.cart.length > 0) {
            cart_rows = (
                <div>
                { 
                    this.state.cart.map((item,index) => {
                        return (
                            <div>
                                <div key={index} className='g-cart-row'>
                                    <div style={{ flex: "2" }}>{item.name}</div>
                                    <div>x {item.count}</div>
                                    <div>${item.count * item.price}</div>
                                    <div id={item.item_id} className="fa fa-trash-o g-icon" onClick={(e) => this.deleteItem(e.target.id)}></div>
                                </div>
                            </div>
                        )
                    }) 
                }
                <div style={{marginTop:"38px", textAlign: "end"}}>
                                Total: ${this.state.cart_total}
                </div>
            </div>
            )
            footer = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success" onClick={()=> this.placeOrder()} data-dismiss="modal">Place Order</button>
                </div>
            )
        } else {
            cart_rows = (<div className="g-secondary-text" style={{textAlign: "center", fontStyle: "italic"}}>You have no items in your cart</div>);
        }
        return ( 
            <div className='g-seller-navbar'>
                <Link to="/buyer/home" className='g-nav-logo'>
                    <img src={logo3} alt="logo"/>
                    <img src={logo2} alt="logo"/>
                </Link>
                <span style={{flex : '1'}}></span>
                <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdownMenu" aria-haspopup="true" aria-expanded="true"
                      onClick={() => {let ele = document.getElementById('dropdownMenu1'); ele.style.display = ele.style.display === 'none' ? 'block': 'none' }}
                      >
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id='dropdownMenu1'>
                         <Link to="/buyer/profile" className="dropdown-item">My Profile</Link>
                         <Link to="/buyer/orderhistory" className="dropdown-item">My Orders</Link>
                         <button className="dropdown-item" onClick={() => this.logOut()}>Logout</button>
                     </div>
                 </div>
                 <div className="fa fa-shopping-cart g-cart-nav" data-toggle="modal" data-target="#cartModal" onClick={() => this.setCart()}>
                     <span>{this.state.cart.length}</span>
                 </div>

                 {/* CART MODAL  */}
                <div style={{color: "black"}} className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="cartModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cartModalTitle">Your order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {cart_rows}
                            </div>
                           {footer}
                        </div>
                    </div>
                </div>
            </div>
         )
    }
    setCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart && this.state.user.id === cart.cust_id) {
            this.setState({
                cart: cart.items,
                cart_total: cart.total
            })
        }
    }
    deleteItem(id) {
        let cart =  JSON.parse(localStorage.getItem('cart'));
        let selectedItem = cart.items.find(item => item.item_id === parseInt(id));
        cart.total -= selectedItem.count * selectedItem.price;
        cart.items = cart.items.filter(item => item.item_id !== parseInt(id));
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setCart();
    }
    logOut() {
        this.props.logOutBuyer();
    }
    placeOrder() {
        this.props.placeOrder({
            cust_id: this.state.user.id,
            items: this.state.cart,
            rest_id: JSON.parse(localStorage.getItem('cart')).rest_id
        })
    }
}
const mapStateToProps = state => {
    return {
        cart_change_trigger: state.orderReducer.cart_change,
        order_successful: state.orderReducer.order_successful,
        isAuthenticatedBuyer: state.loginReducer.isAuthenticatedBuyer
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      placeOrder: payload => dispatch(placeOrder(payload)),
      logOutBuyer: () => dispatch(logOutBuyer())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerNav);
