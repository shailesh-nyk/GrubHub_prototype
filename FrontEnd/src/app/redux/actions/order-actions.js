import { SETCARTCOUNT } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

export const setCartCount = (payload) => {
  return { 
      type: SETCARTCOUNT, payload
  };
}