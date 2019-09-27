import React from 'react';
import axios from 'axios';
import config from '../../../app-config';
import { Redirect, Switch, Route } from 'react-router-dom';

class AddSectionModal extends React.Component { 
    componentDidMount(){
            window.$('#add-section-modal').modal('show');
            window.$('#add-section-modal').on('hidden.bs.modal', this.props.handleHideModal);
    }
    render(){
        return (
          <div>MODAL</div>
        )
    }
}
export default AddSectionModal;