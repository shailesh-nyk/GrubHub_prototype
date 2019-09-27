import { SEARCHBYITEM , SEARCHBYITEMFAILED } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

const searchByItemDispatcher = (payload) => {
  return { 
      type: SEARCHBYITEM, payload
  };
}
const searchByItemFailedDispatcher = (payload) => {
    return { 
        type: SEARCHBYITEMFAILED , payload
    };
}

export const searchByItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/search', { params: payload }) 
            .then(resp => {
                dispatch(stopLoader());
                if(resp.data.success){
                    dispatch(searchByItemDispatcher(resp.data.content))
                } else {
                    dispatch(searchByItemFailedDispatcher(resp.data.content))
                }
            }, err => {
                dispatch(stopLoader());
                dispatch(setMessage({
                    msg: "Oops! Something went wrong. Please try again",
                    name: 'danger'
                }))
            });
    };
};
