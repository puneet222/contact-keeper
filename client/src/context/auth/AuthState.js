import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";

import setHeaderToken from "../../utils/setHeaderToken";
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

const AuthState = props => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // authenticate user

  const authenticateUser = async formData => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    if (localStorage.token) {
      setHeaderToken(localStorage.token);
    }
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      console.log("ERROR : ", err);
      dispatch({
        type: LOGIN_FAILED,
        payload: err.response.data
      });
    }
  };

  // load user

  const loadUser = async () => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    if (localStorage.token) {
      setHeaderToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth", config);

      dispatch({
        type: LOAD_USER,
        payload: res.data
      });
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data
      });
    }
  };

  // register user

  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    }
  };

  // logout

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  // clear errors

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        error: state.error,
        loading: state.loading,
        authenticateUser,
        loadUser,
        registerUser,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
