 import { SETCARTCOUNT } from "../actions/action-types";

const initialState = {
    cart_count: 0
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SETCARTCOUNT: {
          debugger;
          return {
             ...state,
             cart_count: action.payload
          };
      }
      default:
        return state;
    }
  }
  export default orderReducer;