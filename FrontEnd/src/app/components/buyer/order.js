import React from 'react';
import { connect } from 'react-redux';
import config from './../../../app-config';
import { getSections, getItems } from './../../redux/actions/menu-actions';
import { setCartCount } from './../../redux/actions/order-actions';

class BuyerOrder extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            display_items: null,
            total: 0
        }
    }
    componentDidMount() {
        let params = {
            rest_id: this.props.selectedOrderRest.id
        }
        this.props.getSections(params);
        this.props.getItems(params);
    }
    componentWillReceiveProps(next) {
        if(next.itemsFetched && next.sectionsFetched) {
            let obj = {};
            let itemsArr = next.items.map(x => x);
            itemsArr.forEach(item => {
                item['count'] = 0 ;
            })
            next.sections.forEach( section => {
                    obj[section.section_name] = itemsArr.filter(item => item.section === section.section_id);
            })
            this.setState({
                display_items: Object.assign({}, obj),
            })
        }
    }
    render() {
        let array = [];
        if(this.state.display_items) {
            array.push(
                <div className='g-order-rest-title'>
                   <img src={config.base  + this.props.selectedOrderRest.image}/>
                   <div>
                       <span style={{fontSize: '38px'}}> {this.props.selectedOrderRest.rest_name} </span>  
                       <span style={{fontSize: '17px'}}> {this.props.selectedOrderRest.address}, <br/> {this.props.selectedOrderRest.zipcode} </span>
                   </div>
                </div>
            )
            Object.keys(this.state.display_items).forEach( key => {
                if(this.state.display_items[key].length > 0) {
                    array.push(
                    <div className="g-section-head">
                         {key.toUpperCase()}
                    </div>
                    )
                    this.state.display_items[key].forEach( item => {
                        array.push(
                            <div className="g-menu-row">
                                <div className="g-menu-image">
                                     <img className="g-image" src={config.base + item.image} alt="NO PHOTO"/>
                                </div>
                                <div className="g-menu-desc">
                                    <div className="g-menu-desc-title">{item.name}</div>
                                    <div className="g-menu-desc-details">{item.description}</div>
                                </div>
                                <div className="g-menu-price">
                                     Price<br/>
                                     <b>${item.price}</b>
                                </div>
                                <div className="g-menu-quantity">
                                     <span> Quantity</span>
                                     <div className="g-qty">
                                        <span className="minus" id={key + ':' + item.item_id} onClick={(e) => this.decCount(e.target.id)}>-</span>
                                        <span className="count">{item.count}</span>
                                        <span className="plus" id={key + ':' + item.item_id} onClick={(e) => this.incCount(e.target.id)}>+</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
            });
            if(this.state.total > 0) {
                array.push(
                    <div className="g-section-head" style={{textAlign: "end" , paddingRight: "68px"}}>
                        <button className="btn btn-success"  style={{marginRight: "24px"}} 
                        onClick={() => this.addToCart()}> ADD TO CART</button>
                        <span style={{width: "120px"}}>TOTAL: ${this.state.total}</span>
                    </div> 
                )
            } else {
                array.push(
                    <div className="g-section-head" style={{textAlign: "end", paddingRight: "68px"}}>
                        <span style={{width: "120px"}}>TOTAL: ${this.state.total}</span>
                    </div> 
                )
            }
        }
        return array;
    }
    addToCart() {
        let itemsAdded = {
            rest_id: this.props.selectedOrderRest.id,
            total: this.state.total,
            items: [],
        };
        Object.keys(this.state.display_items).forEach(key => { 
            if(this.state.display_items[key].length > 0) {
                this.state.display_items[key].forEach(item => { 
                    if(item.count > 0) {
                        itemsAdded.items.push(item)
                    }
                })
            } 
        })
        localStorage.setItem('cart', JSON.stringify(itemsAdded));
        this.props.setCartCount(itemsAdded.items.length);
    }
    decCount(val) {
        let sec,id;
        [sec,id] = val.split(':'); 
        let disp = Object.assign({}, this.state.display_items);
        let total = this.state.total;
        Object.keys(disp).forEach(key => {
            if(key === sec) {
                disp[key] = disp[key].map(item => {
                    if(item.item_id === parseInt(id) && item.count > 0) {
                        item.count --;
                        total-= parseFloat(item.price);
                    }
                    return item;
               });
            }
        })
        this.setState({
            display_items: Object.assign({}, disp),
            total: total
        })
    }
    incCount(val) {
        let sec,id;
        [sec,id] = val.split(':'); 
        let disp = Object.assign({}, this.state.display_items);
        let total = this.state.total;
        Object.keys(disp).forEach(key => {
            if(key === sec) {
                disp[key] = disp[key].map(item => {
                    if(item.item_id === parseInt(id)) {
                        item.count ++;
                        total+= parseFloat(item.price);
                    }
                    return item;
               });
            }
        })
        this.setState({
            display_items: Object.assign({}, disp),
            total: total
        })
    }
}
const mapStateToProps = state => {
    return {
        sections: state.menuReducer.sections,
        items: state.menuReducer.items,
        selectedOrderRest: state.menuReducer.selectedOrderRest,
        sectionsFetched: state.menuReducer.sectionsFetched,
        itemsFetched: state.menuReducer.itemsFetched
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        getSections: payload => dispatch(getSections(payload)),
        getItems: payload => dispatch(getItems(payload)),
        setCartCount: payload => dispatch(setCartCount(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder);