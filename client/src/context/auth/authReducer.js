import {
  REGISTER_USER,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOAD_USER_FAIL,
  LOGIN_USER,
  LOGIN_FAILED,
  LOGOUT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        loading: false
      };
    }
    case LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: action.payload
      };
    }
    case LOGIN_USER: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null,
        token: null
      };
    }
    case LOGIN_FAILED:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: action.payload
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
      };
    }
    default:
      return state;
  }
};
