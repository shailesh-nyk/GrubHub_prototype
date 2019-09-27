import { SEARCHBYITEMFAILED, SEARCHBYITEM } from "../actions/action-types";

const initialState = {
    isSearched: false,
    resultRestaurants: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCHBYITEM: {
          return {
             ...state,
             isSearched: true,
             resultRestaurants: action.payload
          };
      }
      case SEARCHBYITEMFAILED: {
         return {
            ...state,
            isSearched: true,
            resultRestaurants: []
         };
      }
      default:
        return state;
    }
  }
  export default searchReducer;