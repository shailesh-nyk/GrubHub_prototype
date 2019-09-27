import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

class SellerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user2')),
            logOut: true
        }
    }
    render() {
        // if(this.state.logOut) {
        //     return <Redirect to='/'/>
        // }
        return ( 
           <div className='g-seller-navbar'>
               <img src={logo} alt="logo" style={{height : '80%'}}/>
               <span style={{flex : '1'}}></span>
               <Link to="/seller/menu" className="btn btn-outline-primary g-menu-button">MENU</Link>
               <span style={{flex : '1'}}></span>
               <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdownMenu" aria-haspopup="true" aria-expanded="true"
                      onClick={() => {let ele = document.getElementById('dropdownMenu1'); ele.style.display = ele.style.display === 'none' ? 'block': 'none' }}
                      >
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id='dropdownMenu1'>
                         <Link to="/seller/profile" className="dropdown-item">My Profile</Link>
                         <button className="dropdown-item">Logout</button>
                     </div>
                </div>
           </div>
        )
    }
    logOut() {
        // localStorage.removeItem('user2');
        // this.setState({
        //     logOut: true
        // })
    }
}
export default SellerNav;