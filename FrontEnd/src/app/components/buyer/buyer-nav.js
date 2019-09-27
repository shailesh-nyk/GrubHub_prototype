import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { connect } from 'react-redux';
import CartModal from './cart';

class BuyerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user1')),
            logOut: false
        }
    }   
    render() {
        return ( 
            <div className='g-seller-navbar'>
                <img src={logo} alt="logo" style={{height : '80%'}}/>
                <span style={{flex : '1'}}></span>
                <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdownMenu" aria-haspopup="true" aria-expanded="true"
                      onClick={() => {let ele = document.getElementById('dropdownMenu1'); ele.style.display = ele.style.display === 'none' ? 'block': 'none' }}
                      >
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id='dropdownMenu1'>
                         <Link to="/buyer/profile" className="dropdown-item">My Profile</Link>
                         <button className="dropdown-item">Logout</button>
                     </div>
                 </div>
                 <div className="fa fa-shopping-cart g-cart-nav" data-toggle="modal" data-target="#cartModal">
                     <span>{this.props.cart_count}</span>
                 </div>
                <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="cartModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cartModalTitle">Yours</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
    }
    logOut() {
        localStorage.removeItem('user1');
    }
}
const mapStateToProps = state => {
    return {
        cart_count: state.orderReducer.cart_count,
    }   
}

export default connect(mapStateToProps)(BuyerNav);