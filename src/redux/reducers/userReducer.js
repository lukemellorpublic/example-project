import {
  USERS_LOADED,
  LOAD_USERS,
  CHANGE_USER_FORM,
  USER_RESET_FORM,
  SAVE_USER,
  EDIT_USER,
  USER_ERROR,
  REFRESH_USERS,
  USER_DELETED,
  USER_CONFIRMED
} from "../actions/constants";

const initialState = {
  form: {
    name: "",
    email: ""
  },
  newUserForm: {
    name: "",
    email: ""
  },
  data: [],
  errors: [],
  inProgress: false,
  creatingUser: false,
  response: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, inProgress: true, response: action.payload };
    case USERS_LOADED:
      return { ...state, data: action.payload, inProgress: false };
    case CHANGE_USER_FORM:
      return { ...state, form: action.payload };
    case SAVE_USER:
      return { ...state, creatingUser: true };
    case USER_RESET_FORM:
      return {
        ...state,
        form: { ...initialState.form, id: state.form.id },
        creatingUser: false
      };
    case REFRESH_USERS:
      return {
        ...state,
        currentUser: action.payload,
        response: action.payload
      };
    case USER_CONFIRMED:
      return {
        userConfirmed: action.payload
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case USER_DELETED:
      return {
        ...state,
        response: action.payload
      };
    case EDIT_USER:
      var user = state.data.filter(b => b.id === action.payload)[0];
      if (!user) return state;
      return { ...state, form: { ...user, branchId: user.branch.id } };
    default:
      return state;
  }
};

export default userReducer;
