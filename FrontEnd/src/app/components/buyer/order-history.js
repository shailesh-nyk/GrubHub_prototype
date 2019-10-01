import React from 'react';
import config from '../../../app-config';
import { connect } from 'react-redux';
import { getCustomerOrders } from './../../redux/actions/order-actions';

class BuyerOrderHistory extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            activeOrders: [],
            pastOrders: []
        }
    }
    componentDidMount() {
        let id = JSON.parse(localStorage.getItem('user1')).id;
        this.props.getCustomerOrders({
            cust_id: id
        })
    }
    refresh() {
        let id = JSON.parse(localStorage.getItem('user1')).id;
        this.props.getCustomerOrders({
            cust_id: id
        })
    }
    componentWillReceiveProps(next) {
        let activeOrders = next.customer_orders.filter(x=> x.status !== 'delivered' && x.status !== 'cancelled' )
        let pastOrders = next.customer_orders.filter(x=> x.status === 'delivered' || x.status === 'cancelled' )
        this.setState({
            activeOrders: activeOrders,
            pastOrders: pastOrders
        })
    }
    render() {
        return ( 
            <div className="accordion" id="accordionOrders">
            <div className="card">
              <div className="card-header" id="active-orders" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Active Orders
              </div>
              <span className="g-icon g-order-refresh fa fa-refresh" onClick={(e) => this.refresh(e)}></span>
              <div id="collapseOne" className="collapse show" aria-labelledby="active-orders" data-parent="#accordionOrders">
                 { this.state.activeOrders.length > 0 ? 
                       ( <div className="card-body">
                        <div className="accordion" id="accordionActiveOrders">
                        {
                            this.state.activeOrders.map(order => {
                                return(
                                <div className="card">
                                    <div className="card-header g-order-header" id={"active-order" + order.order_id} data-toggle="collapse" data-target={"#collapse"+ order.order_id} aria-expanded="true" aria-controls={"collapse"+ order.order_id }>
                                        <div> <span className="g-secondary-text">Order ID </span> <b>{order.order_id}</b> </div> 
                                        <div style={{flex: '2'}}> <span className="g-secondary-text">From </span> <b>{order.rest_name}</b> </div> 
                                        <div> <span className="g-secondary-text"> On: </span> <b>{order.date}</b> </div>
                                        <div> <span className="g-secondary-text">At: </span> <b>{order.time}</b></div>
                                        <div><span className={"g-status "+ order.status}> {order.status.toUpperCase()}</span></div>
                                    </div>
                                    <div id={"collapse"+ order.order_id } className="collapse" aria-labelledby={"active-order" + order.order_id} data-parent="#accordionActiveOrders">
                                        <div className="card-body">
                                            {order.itemList.map( item => {
                                                return(
                                                <div className="g-menu-row">
                                                    <div className="g-menu-image">
                                                        <img className="g-image" src={config.base + item.img} alt="NO PHOTO"/>
                                                    </div>
                                                    <div className="g-menu-desc">
                                                        <div className="g-menu-desc-title">{item.name}</div>
                                                        <div className="g-menu-desc-details">{item.desc}</div>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Quantity<br/>
                                                        <b>{item.qty}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Price<br/>
                                                        <b>${item.price}</b>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            <div className="g-menu-row" style={{borderTop: "1px solid"}}>
                                                    <div className="g-menu-image"></div>
                                                    <div className="g-menu-desc">
                                                        Restaurant address<br/>
                                                        <b>{order.address}, {order.zipcode}</b>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Contact <br/>
                                                        <b>{order.phone}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Total<br/>
                                                        <b>${order.total}</b>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>
                       </div> ) : (
                            <div className="card-body g-secondary-text g-null-info"> You have no active orders </div>
                       )
                 }
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                     Past Orders
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionOrders">
              { this.state.pastOrders.length > 0 ? 
                       ( <div className="card-body">
                        <div className="accordion" id="accordionPastOrders">
                        {
                            this.state.pastOrders.map(order => {
                                return(
                                <div className="card">
                                    <div className="card-header g-order-header" id={"active-order" + order.order_id} data-toggle="collapse" data-target={"#collapse"+ order.order_id} aria-expanded="true" aria-controls={"collapse"+ order.order_id }>
                                        <div> <span className="g-secondary-text">Order ID </span> <b>{order.order_id}</b> </div> 
                                        <div style={{flex: '2'}}> <span className="g-secondary-text">From </span> <b>{order.rest_name}</b> </div> 
                                        <div> <span className="g-secondary-text"> On: </span> <b>{order.date}</b> </div>
                                        <div> <span className="g-secondary-text">At: </span> <b>{order.time}</b></div>
                                        <div><span className={"g-status "+ order.status}> {order.status.toUpperCase()}</span></div>
                                    </div>
                                    <div id={"collapse"+ order.order_id } className="collapse" aria-labelledby={"active-order" + order.order_id} data-parent="#accordionPastOrders">
                                        <div className="card-body">
                                            {order.itemList.map( item => {
                                                return(
                                                <div className="g-menu-row">
                                                    <div className="g-menu-image">
                                                        <img className="g-image" src={config.base + item.img} alt="NO PHOTO"/>
                                                    </div>
                                                    <div className="g-menu-desc">
                                                        <div className="g-menu-desc-title">{item.name}</div>
                                                        <div className="g-menu-desc-details">{item.desc}</div>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Quantity<br/>
                                                        <b>{item.qty}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Price<br/>
                                                        <b>${item.price}</b>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            <div className="g-menu-row" style={{borderTop: "1px solid"}}>
                                                    <div className="g-menu-image"></div>
                                                    <div className="g-menu-desc">
                                                        Restaurant address<br/>
                                                        <b>{order.address}, {order.zipcode}</b>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Contact <br/>
                                                        <b>{order.phone}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Total<br/>
                                                        <b>${order.total}</b>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>
                       </div> ) : (
                            <div className="card-body g-secondary-text g-null-info"> You have no past orders </div>
                       )
                 }
              </div>
            </div>
          </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        customer_orders: state.orderReducer.customer_orders
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        getCustomerOrders: payload => dispatch(getCustomerOrders(payload)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrderHistory);