import React from 'react';
import axios from 'axios';
import config from '../../../app-config';
import { Redirect, Switch, Route } from 'react-router-dom';
import BuyerNav from './buyer-nav';
import BuyerHome from './home';
import BuyerProfile from './profile';
import BuyerOrder from './order';

class BuyerMain extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        // alert('main loaded')
        // if(!localStorage.getItem('user1')) {s
        //     return <Redirect to='/login'/>
        // }
        return ( 
            <div className='g-buyer-main'>
                <div className='g-buyer-nav'>
                    <BuyerNav/>
                </div>
               <div className='g-buyer-content'>
                    <Switch>
                            <Route path="/buyer/home" component={BuyerHome}/>
                            <Route path="/buyer/profile" component={BuyerProfile}/>
                            <Route path="/buyer/order" component={BuyerOrder}/>
                    </Switch>
               </div>
            </div>
        )
    }
}
export default BuyerMain;