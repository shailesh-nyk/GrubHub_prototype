import React from 'react';
import { connect } from 'react-redux';
import { getSections, getItems, addSection, addItem } from './../../redux/actions/menu-actions';
import config from '../../../app-config';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display_items: []
        }
    }

    componentDidMount() {
        let params = {
            rest_id: JSON.parse(localStorage.getItem('user2')).id
        }
        this.props.getSections(params);
        this.props.getItems(params);
    }
    componentWillReceiveProps(next) {
        if(next.itemsFetched && next.sectionsFetched) {
            let obj = {};
            next.sections.forEach( section => {
                    obj[section.section_name] = next.items.filter(item => item.section === section.section_id);
            })
            this.setState({
                display_items: Object.assign({}, obj)
            })
        } else {
            let params = {
                rest_id: JSON.parse(localStorage.getItem('user2')).id
            }
            this.props.getSections(params);
            this.props.getItems(params);
        }   
    }
    render() {
        let array = [];
        if(this.props.sections.length === 0) {
            array.push(
                <h3> YOU HAVE NO ITEMS IN YOUR MENU!!! GO AHEAD AND ADD SECTIONS AND ITEMS </h3>
            ) 
         }
        let addItemBtn = null;
        if(this.props.sections.length > 0 ) {
            addItemBtn = <button className="btn btn-warning btn-md" data-toggle="modal" data-target="#additemsModal">Add New Item</button>
        }
        array.push (
            <div>
                <div className="g-add-section">
                    <button className="btn btn-warning btn-md" data-toggle="modal" data-target="#addsectionModal">Add New Section</button>
                    {addItemBtn}
                </div> 
            </div>
        )
        array.push(
                <div className="modal fade" id="addsectionModal" tabIndex="-1" role="dialog" aria-labelledby="addsectionModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addsectionModalTitle">Add New Section</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={(e) => this.addNewSection(e)}>
                    <div className="modal-body">
                            <div className='g-input-field'>
                                <div className='g-input-label'>Section Name:</div> 
                                <div className='g-input-control'>
                                    <input onChange = {(e) => this.setState({newSection : e.target.value})} type="text" className="form-control"  
                                       placeholder="Enter name" required/>
                                </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success">Save changes</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            )
            array.push(
                <div className="modal fade" id="additemsModal" tabIndex="-1" role="dialog" aria-labelledby="additemsModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="additemsModalTitle">Add New Item</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={(e) => this.addNewItem(e)}>
                        <div className="modal-body">
                            <div className='g-input-field'>
                                <div className='g-input-label'>Name:</div> 
                                <div className='g-input-control'>
                                    <input id='item_name' type="text" className="form-control"  
                                        placeholder="Name your item" required />
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Description:</div> 
                                <div className='g-input-control'>
                                    <textarea id='item_desc' type="text" className="form-control"  
                                        placeholder="Add a clear and informative description for your customers" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Menu Section: </div> 
                                <div className='g-input-control'>
                                    <select className="form-control" id='item_section' value={this.state.option}>
                                        {this.props.sections.map( x => {
                                            return (
                                                <option value={x.section_id}>{x.section_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Price:</div> 
                                <div className='g-input-control'>
                                    <input id='item_price' type="number" step="0.01" className="form-control"  
                                        placeholder="Set a price for your item" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                    <div className='g-input-label'>Upload a picture:</div>
                                    <div className='g-input-control'>
                                         <input type="file" accept="image/*" name="file" id='item_img'/>
                                    </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success">Save changes</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            )
            if(this.props.sections.length > 0) {
                Object.keys(this.state.display_items).forEach( key => {
                    array.push(
                        <div className="g-section-head"> {key.toUpperCase()}
                               {/* <button className="btn btn-outline-success btn-sm">Add Item</button> */}
                        </div>
                    );
                    if(this.state.display_items[key].length > 0) {
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
                                </div>
                            )
                        })
                    } else {
                        array.push(
                            <div className="g-menu-row g-empty-alert-text"> You have no items in this section. Go on and add some!!!</div>
                        )
                    }
                });
            }
            return array
     }
 
    addNewSection(e) {
        e.preventDefault();
        this.props.addSection({
            rest_id: JSON.parse(localStorage.getItem('user2')).id,
            section_name: this.state.newSection.toLowerCase()
        })
    }
    addNewItem(e) {
        e.preventDefault();
        let req_body = {
            name: document.getElementById('item_name').value,
            desc: document.getElementById('item_desc').value,
            section: document.getElementById('item_section').value,
            price: document.getElementById('item_price').value,
            image: document.getElementById('item_img').files[0],
            rest_id: JSON.parse(localStorage.getItem('user2')).id
        }
        this.props.addItem(req_body);
    }
}
const mapStateToProps = state => {
    return {
       sections: state.menuReducer.sections,
       items: state.menuReducer.items,
       sectionsFetched: state.menuReducer.sectionsFetched,
       itemsFetched: state.menuReducer.itemsFetched
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      getSections: payload => dispatch(getSections(payload)),
      getItems: payload => dispatch(getItems(payload)),
      addSection: payload => dispatch(addSection(payload)),
      addItem: payload => dispatch(addItem(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);