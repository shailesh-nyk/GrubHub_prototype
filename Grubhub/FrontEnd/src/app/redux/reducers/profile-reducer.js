import { GETBUYER, UPDATEBUYER, GETSELLER, UPDATESELLER,
UPDATEBUYERIMAGE, UPDATESELLERIMAGE } from "../actions/action-types";

const initialState = {
    user: {},
    seller: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETBUYER: {
      return {
          ...state,
          user: action.payload
      };
    }
    case UPDATEBUYER: {
        return {
            ...state,
            user: action.payload.user
        }; 
    }
    case UPDATEBUYERIMAGE: {
        return {
            ...state,
            user: {
                ...state.user,
                image: action.payload.imgurl
            }
        }; 
    }
    case GETSELLER: {
        return {
            ...state,
            seller: action.payload
        };
      }
      case UPDATESELLER: {
          return {
              ...state,
              seller: action.payload.user,
              statusUpdateSeller: {msg: action.payload.msg , name: action.payload.name}
          }; 
      }
      case UPDATESELLERIMAGE: {
        return {
            ...state,
            seller: {
                ...state.seller,
                image: action.payload.imgurl
            }
        }; 
    }
    default:
      return state;
  }
}

export default profileReducer;
