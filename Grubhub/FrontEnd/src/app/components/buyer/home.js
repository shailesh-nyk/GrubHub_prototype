import React from 'react';
import { connect } from 'react-redux';
import { searchByItem, getCuisineList, clearSearch } from './../../redux/actions/search-actions';
import config from './../../../app-config';
import { selectRestaurant } from './../../redux/actions/menu-actions';
import { Redirect } from 'react-router-dom';

class BuyerHome extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            redirectToOrder: false,
            filteredList: [],
            filterCuisineStr: '',
            filterLocstr: 'all'
        }
    }
    componentDidMount() {
        this.props.clearSearch();
        this.props.getCuisines();
    }
    componentWillReceiveProps(next) {
        this.setState({
            filteredList: next.restaurants
        })
    }
    render() {
        if(this.state.redirectToOrder) {
            return <Redirect to='/buyer/order'/>
        }
        return ( 
           <div>
               <div className='g-search-container g-box-shadow2'>
                    <form onSubmit={(e) => this.searchByItem(e)}>
                        <div className='g-search-bar'>
                                <div className='g-search-input'>
                                    <input className="form-control" type="text" placeholder="Enter your craving" 
                                        onChange={(e) => this.setState({searchKey: e.target.value})}/>
                                    <span className="fa fa-search"></span>
                                </div>
                                <button className="btn btn-primary" type="submit">Find Food</button>
                        </div>
                    </form>
               </div>
               {!this.props.isSearched ? (
                   <div className="g-secondary-text" style={{padding: "40px" ,textAlign: "center"}}>Search an item to see results</div>
                  ) : (
                    this.props.restaurants.length > 0 ? (
                    <div> <div className="g-filter">
                     <div className='g-input-field'>
                             <div className='g-input-control'>
                                 <select className="form-control" onChange = {(e) => this.setCuisineFilter(e)} value={this.state.filterCuisineStr}>
                                     <option value="">All Cuisines</option>
                                     {this.props.cuisine.map(item => {
                                         return (
                                             <option value={item.cuisine}>{item.cuisine.toUpperCase()}</option>
                                         )
                                     })}
                                 </select>
                             </div>
                         </div>
                         <div className='g-input-field'>
                             <div className='g-input-control'>
                                 <select className="form-control" onChange = {(e) => this.setLocFilter(e)} value={this.state.filterLocstr}>
                                     <option value="all">All Locations</option>
                                     <option value="near">Near Me</option>
                                 </select>
                             </div>
                         </div>
                    </div>
                    <div className="g-results-container">
                        { this.state.filteredList.length > 0 ? (
                            this.state.filteredList.map((rest, index) => {
                                return (
                                 <div key={index} className="card g-box-shadow1" style={{width: "18rem"}}>
                                     <img src={config.base + rest.image} className="card-img-top" alt="..." />
                                     <div className="card-body">
                                         <h4 className="card-title">{rest.rest_name}</h4>
                                         <p className="card-text">
                                             Cuisine: {rest.cuisine.toUpperCase()}  <br/>
                                             {rest.address} <br/>
                                             {rest.zipcode} 
                                         </p>
                                         <button value={JSON.stringify(rest)} className="btn btn-primary card-button" onClick={(e) => this.goToOrders(e.target.value)}>Order Food</button>
                                     </div>
                                 </div>
                                )
                            })) : (
                                <div className="g-secondary-text" style={{padding: "40px" ,textAlign: "center"}}>No results found. Try a different filter!</div>
                            )
                        }
                    </div> </div>
               ): (
                   <div className="g-secondary-text" style={{padding: "40px" ,textAlign: "center"}}>No results found</div>
               )
            )}
        </div>)
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
    setLocFilter(e) {
        let locFilter = e.target.value;
        let cuisineFilter = this.state.filterCuisineStr;
        let loc = parseInt(JSON.parse(localStorage.getItem('user1')).zipcode);
        let filteredList = this.props.restaurants;
        if(locFilter === 'near') {
            if(cuisineFilter === '') {
                filteredList = this.props.restaurants.filter(x => parseInt(x.zipcode) > loc - 100 && parseInt(x.zipcode) < loc + 100);
            } else {
                filteredList = this.props.restaurants.filter(x => parseInt(x.zipcode) > loc - 100 && parseInt(x.zipcode) < loc + 100 && x.cuisine.includes(cuisineFilter));
            }
        } else {
            if(cuisineFilter === '') {
                filteredList = this.props.restaurants;
            } else {
                filteredList = this.props.restaurants.filter(x => x.cuisine.includes(cuisineFilter));
            }
        }
        this.setState({
            filterLocstr: locFilter,
            filteredList: filteredList
        })
    }
    setCuisineFilter(e) {
        let cuisineFilter = e.target.value;
        let locFilter = this.state.filterLocstr;
        let loc = parseInt(JSON.parse(localStorage.getItem('user1')).zipcode);
        let filteredList = this.props.restaurants;
        if(cuisineFilter === '') {
            if(locFilter === 'all') {
                filteredList = this.props.restaurants;
            } else {
                filteredList = this.props.restaurants.filter(x => parseInt(x.zipcode) > loc - 100 && parseInt(x.zipcode) < loc + 100);
            }
        } else {
            if(locFilter === 'all') {
                filteredList = this.props.restaurants.filter(x => x.cuisine.includes(cuisineFilter))
            } else {
                filteredList = this.props.restaurants.filter(x => parseInt(x.zipcode) > loc - 100 && parseInt(x.zipcode) < loc + 100 && x.cuisine.includes(cuisineFilter));
            }
        }
        this.setState({
            filterCuisineStr: cuisineFilter,
            filteredList: filteredList
        })
    }
}
const mapStateToProps = state => {
    return {
       restaurants: state.searchReducer.resultRestaurants,
       cuisine: state.searchReducer.cuisine,
       isSearched: state.searchReducer.isSearched
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      searchByItem: payload => dispatch(searchByItem(payload)),
      clearSearch: () => dispatch(clearSearch()),
      setRestaurant: payload => dispatch(selectRestaurant(payload)),
      getCuisines: () => dispatch(getCuisineList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerHome);