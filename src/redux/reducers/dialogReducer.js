import { SHOW_DIALOG, CLOSE_DIALOG } from "../actions/constants";

const initialState = {
  open: false,
  title: "",
  content: "",
  delayedAction: null
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return { ...state, open: true, ...action.payload };
    case CLOSE_DIALOG:
      return { ...state, open: false, delayedAction: null };
    default:
      return state;
  }
};

export default dialogReducer;
