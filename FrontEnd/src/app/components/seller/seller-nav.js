import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo2 from '../../../assets/images/logo2.png';
import logo3 from '../../../assets/images/logo3.png';
import { connect } from 'react-redux';
import { logOutSeller } from './../../redux/actions/login-action';

class SellerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user2')),
        }
    }
    render() {
        if(!this.props.isAuthenticatedSeller) {
            return <Redirect to="/"/>
        }
        return ( 
           <div className='g-seller-navbar'>
                <Link to="/seller/home" className='g-nav-logo'>
                    <img src={logo3} alt="logo"/>
                    <img src={logo2} alt="logo"/>
                </Link>
               <span style={{flex : '1'}}></span>
               <Link to="/seller/menu" className="btn btn-outline-primary g-menu-button">MY MENU</Link>
               <span style={{flex : '1'}}></span>
               <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdownMenu" aria-haspopup="true" aria-expanded="true"
                      onClick={() => {let ele = document.getElementById('dropdownMenu1'); ele.style.display = ele.style.display === 'none' ? 'block': 'none' }}
                      >
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id='dropdownMenu1'>
                         <Link to="/seller/profile" className="dropdown-item">My Profile</Link>
                         <button className="dropdown-item" onClick={() => this.logOut()}>Logout</button>
                     </div>
                </div>
           </div>
        )
    }
    logOut() {
        this.props.logOutSeller();
    }
}
const mapDispatchToProps = dispatch => {
    return {
      logOutSeller: () => dispatch(logOutSeller()),
    };
}
const mapStateToProps = state => {
    return {
        isAuthenticatedSeller: state.loginReducer.isAuthenticatedSeller
    }   
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerNav);