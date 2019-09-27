import React from 'react';
import { getSeller, updateSeller, updateSellerImage } from './../../redux/actions/profile-action';
import { connect } from 'react-redux';
import config from './../../../app-config';

class SellerProfile extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: null
        }
    }
    componentDidMount() {
        let id = JSON.parse(localStorage.getItem('user2')).id;
        this.props.getSeller({
            id: id
        })
    }
    componentWillReceiveProps(next) {
        Object.keys(next.user).forEach(key => {
            let element = document.getElementById(key);
            if(element) {
                element.value = next.user[key];
            }
        })
    }
    render() {
        return ( 
           <div> 
            <h3 style={{textAlign: 'center'}}>Your account</h3>
            <div className="g-profile-row">
                <div className="g-profile-avatar"><img src={config.base + this.props.user.image} /></div> 
                <div className="g-profile-details-section">
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Name</span>
                        <span className='g-primary-text'>{this.props.user.name}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Email</span>
                        <span className='g-primary-text'>{this.props.user.email}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Password</span>
                        <span className='g-primary-text'>{this.maskPass(this.props.user.password)}</span>
                    </div>
                </div>
                <div className="g-profile-details-section">
                     <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Restaurant Name</span>
                        <span className='g-primary-text'>{this.props.user.rest_name}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Address</span>
                        <span className='g-primary-text'>{this.props.user.address}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Zipcode</span>
                        <span className='g-primary-text'>{this.props.user.zipcode}</span>
                    </div>
                </div>
                <a className="btn btn-primary" data-toggle="collapse" href="#editNameCollapse" role="button" aria-expanded="false"
                 aria-controls="editNameCollapse" style={{float: 'right'}}>
                     Edit
                </a>
            </div> 
            <div className="collapse" id="editNameCollapse">
                <div className="card card-body">
                        <form onSubmit={(e) => this.updateProfile(e)}>
                             <div className='g-input-field'>
                                <div className='g-input-label'>Upload/Change picture:</div>
                                <div className='g-input-control'>
                                   <input type="file" accept="image/*" name="file"
                                    onChange={(e) => this.setState({selectedImg: e.target.files[0]})}/>
                                    <button className='btn btn-success btn-small' type='button' onClick={() => this.uploadImage()}>Upload</button>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Full Name:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="name" placeholder="Enter full name" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Email:</div>
                                <div className='g-input-control'>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email address" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Password:</div>
                                <div className='g-input-control'>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Restaurant Name:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="rest_name" placeholder="Enter restaurant name" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Cuisine:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="cuisine" placeholder="Enter cuisine" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Address:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="address" placeholder="Enter address" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Zipcode:</div>
                                <div className='g-input-control'>
                                    <input type="number" className="form-control" id="zipcode" placeholder="Enter zipcode" required/>
                                </div>
                            </div>
                            <div className='g-action-panel'>
                                 <button className="btn btn-outline-primary" data-toggle="collapse" href="#editNameCollapse" type="button" aria-expanded="false"
                                    aria-controls="editNameCollapse">
                                        CANCEL
                                </button>   
                                <button className="btn btn-primary" type="submit">UPDATE</button>
                            </div>
                        </form>    
                </div>
            </div>
            </div>
        )
    }
    maskPass(pass = '') {
        let str = '';
        for(let i = 0 ; i < pass.length ; i++) 
            str += '*'
        return str;
    }
    updateProfile(e) {
        e.preventDefault();
        let user = {
        };
        Object.keys(this.props.user).forEach(key => {
            let element = document.getElementById(key);
            if(element) {
                user[key] = element.value;
            } else {
                user[key] = this.props.user[key]
            }
        })
        this.props.updateSeller(user);
    }
    uploadImage() {
        const data = new FormData();
        data.append('file', this.state.selectedImg, this.props.user.id);
        this.props.uploadPicture(data);
    }
}
const mapStateToProps = state => {
    return {
       user: state.profileReducer.seller
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      getSeller: payload => dispatch(getSeller(payload)),
      updateSeller: payload => dispatch(updateSeller(payload)),
      uploadPicture: payload => dispatch(updateSellerImage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);