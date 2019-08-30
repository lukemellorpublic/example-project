import { SHOW_ERROR, DISMISS_ERROR } from "../actions/constants";

const initialState = {
  currentError: null,
  openPopup: false
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, openPopup: true, currentError: action.payload };
    case DISMISS_ERROR:
      return { ...state, openPopup: false };
    default:
      return state;
  }
};

export default errorReducer;
