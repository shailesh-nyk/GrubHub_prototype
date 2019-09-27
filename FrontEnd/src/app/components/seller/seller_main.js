import React from 'react';
import axios from 'axios';
import config from '../../../app-config';
import { Redirect, Switch, Route } from 'react-router-dom';
import SellerHome from './home';
import SellerNav from './seller-nav';
import SellerProfile from './profile';
import Menu from './menu';

class SellerMain extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
    }
    render() {
        // if(!localStorage.getItem('user2')) {
        //     return <Redirect to='/'/>
        // }
        if(this.state.showMenu) {
            return <Redirect to='/seller/menu' />
        }
        return ( 
            <div className='g-seller-main'>
                <div className='g-seller-nav'>
                    <SellerNav showMenu={this.showMenu}/>
                </div>
               <div className='g-seller-content'>
                    <Switch>
                        <Route path="/seller/home" component={SellerHome}/>
                        <Route path="/seller/profile" component={SellerProfile}/>
                        <Route path="/seller/menu" component={Menu}/>
                    </Switch>
               </div>
            </div>
        )
    }
    showMenu() {
        this.setState({
            showMenu: true
        })
    }
}
export default SellerMain;