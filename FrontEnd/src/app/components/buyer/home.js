import React from 'react';
import { connect } from 'react-redux';
import { searchByItem } from './../../redux/actions/search-actions';
import config from './../../../app-config';
import { selectRestaurant } from './../../redux/actions/menu-actions';
import { Redirect } from 'react-router-dom';

class BuyerHome extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            redirectToOrder: false
        }
    }
    render() {
        if(this.state.redirectToOrder) {
            return <Redirect to='/buyer/order'/>
        }
        return ( 
           <div>
               <div className='g-search-container'>
                    <form onSubmit={(e) => this.searchByItem(e)}>
                        <div className='g-search-bar'>
                                <div className='g-search-input'>
                                    <input className="form-control" type="text" placeholder="Enter your craving" 
                                        onChange={(e) => this.setState({searchKey: e.target.value})} required/>
                                    <span className="fa fa-search"></span>
                                </div>
                                <button className="btn btn-primary" type="submit">Find Food</button>
                        </div>
                    </form>
               </div>
               <div className="g-results-container">
                   {
                       this.props.restaurants.map((rest, index) => {
                           return (
                            <div key={index} className="card" style={{width: "18rem"}}>
                                <img src={config.base + rest.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className="card-title">{rest.rest_name}</h4>
                                    <p className="card-text">
                                        Cuisine: {rest.cuisine}  <br/>
                                        {rest.address} <br/>
                                        {rest.zipcode} 
                                    </p>
                                    <button value={JSON.stringify(rest)} className="btn btn-primary card-button" onClick={(e) => this.goToOrders(e.target.value)}>Order Food</button>
                                </div>
                            </div>
                           )
                       })
                   }
               </div>
           </div>
        )
    }
    searchByItem(e) {
        e.preventDefault();
        this.props.searchByItem({
            searchKey: this.state.searchKey
        })
    }
    goToOrders(val) {
        this.props.setRestaurant(JSON.parse(val));
        this.setState({
            redirectToOrder: true
        })
    }
}
const mapStateToProps = state => {
    return {
       restaurants: state.searchReducer.resultRestaurants
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      searchByItem: payload => dispatch(searchByItem(payload)),
      setRestaurant: payload => dispatch(selectRestaurant(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerHome);