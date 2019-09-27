import { LOGINBUYER , LOGINSELLER } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

const loginBuyerDispatcher = (payload) => {
  return { 
      type: LOGINBUYER, payload
  };
}
const loginSellerDispatcher = (payload) => {
    return { 
        type: LOGINSELLER , payload
    };
}

export const login = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/login', payload) 
            .then(resp => {
                dispatch(stopLoader());
                if(resp.data.success){
                    if(payload.option === '1') {
                        dispatch(loginBuyerDispatcher(resp.data))
                        dispatch(setMessage({
                            msg: resp.data.msg,
                            name: 'success'
                        }))
                    } else {
                        dispatch(loginSellerDispatcher(resp.data))
                        dispatch(setMessage({
                            msg: resp.data.msg,
                            name: 'success'
                        }))
                    }
                } else {
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'danger'
                    }))
                }
            }, err => {
                dispatch(stopLoader());
                dispatch(setMessage({
                    msg: "Something went wrong",
                    name: 'danger'
                }))
            });
    };
};
