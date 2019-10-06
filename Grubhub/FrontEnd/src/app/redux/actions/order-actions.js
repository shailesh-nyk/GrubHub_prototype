import { SETCARTCOUNT, ORDERSUCCESS, CUSTOMERORDERS, RESTAURANTORDERS } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

export const setCartCount = () => {
  return { 
      type: SETCARTCOUNT
  };
}

const orderSuccess = () => {
  return { 
    type: ORDERSUCCESS
};
}
const getCustomerOrdersDispatcher = (payload) => {
    return {
        type: CUSTOMERORDERS,
        payload
    }
}
const getRestaurantOrdersDispatcher = (payload) => {
    return {
        type: RESTAURANTORDERS,
        payload
    }
}


export const placeOrder = (payload) => {
  return dispatch => {
      dispatch(startLoader());
      axios.post(config.api_host + '/order/', payload)
      .then(resp => {
              dispatch(stopLoader());
              if(resp.status === 200 && resp.data.success) {
                  dispatch(orderSuccess());
                  dispatch(setMessage({
                      msg: "Successfully placed your order",
                      name: 'success'
                  }))
              } else {
                  dispatch(setMessage({
                      msg: "We couldn't place your order. Please try again",
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

export const getCustomerOrders = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/order/customer', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200 && resp.data.success) {
                    dispatch(getCustomerOrdersDispatcher(resp.data.msgDesc));
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't get your order history. Please try again",
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

  export const getRestaurantOrders = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/order/restaurant', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200 && resp.data.success) {
                    dispatch(getRestaurantOrdersDispatcher(resp.data.msgDesc));
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't get your order history. Please try again",
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

  export const updateOrderStatus = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.put(config.api_host + '/order/', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(getRestaurantOrders({
                    rest_id: payload.rest_id
                }))
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                }))
              } else {
                dispatch(setMessage({
                    msg: resp.data.msg,
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
    }; 
}