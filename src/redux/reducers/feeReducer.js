import {
  GET_FEES,
  UPDATE_FEES,
  RETURN_FEES,
  SUBMIT_FEES,
  SUBMIT_FEES_COMPLETE
} from "../actions/constants";

const initialState = {
  fees: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEES:
      return { ...state, inProgress: true };
    case RETURN_FEES:
      return { fees: action.payload.fees.body, inProgress: false };
    case UPDATE_FEES:
      return { ...state, inProgress: true };
    case SUBMIT_FEES:
      return { ...state, inProgress: true };
    case SUBMIT_FEES_COMPLETE:
      return { ...state, inProgress: false };
    default:
      return state;
  }
};

export default authReducer;
