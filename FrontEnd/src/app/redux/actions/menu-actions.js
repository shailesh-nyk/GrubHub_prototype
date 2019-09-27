import { GETSECTIONS , GETITEMS, RELOADMENU, SELECTRESTAURANT } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

const getSectionsDispatcher = (payload) => {
  return { 
      type: GETSECTIONS, payload
  };
}

const getItemsDispatcher = (payload) => {
    return { 
        type: GETITEMS, payload
    };
}
const reloadMenu = () => {
    return { 
        type: RELOADMENU
    };
}

export const getSections = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/seller/sections', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200) {
                    dispatch(getSectionsDispatcher(resp.data.msgDesc))
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't fetch the menu sections. Please reload the page",
                        name: 'warning'
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

export const getItems = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/seller/menu', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200) {
                    dispatch(getItemsDispatcher(resp.data.msgDesc))
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't fetch the menu items. Please reload the page",
                        name: 'warning'
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

export const addSection = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/seller/sections', payload)
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200 && resp.data.success) {
                    dispatch(setMessage({
                        msg: "Successfully added new section to your menu",
                        name: 'success'
                    }))
                    dispatch(reloadMenu());
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't add new section. Please try again",
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
}

export const addItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/seller/menu', payload)
        .then(resp => {
                if(resp.data.success) {
                    const data = new FormData();
                    data.append('file', payload.image, resp.data.msgDesc.toString());
                    axios.post(config.api_host + '/uploads/item', data)
                    .then(resp => {
                        dispatch(stopLoader())
                        if(resp.data.success){
                            dispatch(setMessage({
                                msg: "Successfully added new item to your menu",
                                name: 'success'
                            }))
                            dispatch(reloadMenu());
                         } else {
                            dispatch(setMessage({
                                msg: "We couldn't add new item. Please try again",
                                name: 'danger'
                            })) 
                         } 
                    }) 
                    .catch(err => {
                        dispatch(stopLoader())
                        dispatch(setMessage({
                            msg: "Something went wrong",
                            name: 'danger'
                        })) 
                    })
                } else {
                    dispatch(stopLoader())
                    dispatch(setMessage({
                        msg: "We couldn't add new item. Please try again",
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
}

export const selectRestaurant = (payload) => {
    return { 
        type: SELECTRESTAURANT , payload
    };
}