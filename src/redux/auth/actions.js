import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    /* LOGOUT_USER
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    UPDATE_AUTH_USER  */
  } from '../actions';

  /* LOGIN */
  
  export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user
  });
  export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  export const loginUserError = (message) => ({
    type: LOGIN_USER_ERROR,
    payload: message
  }); 

  /* REGISTER */

  export const registerUser = (user) => ({
    type: REGISTER_USER,
    payload: user,
  });
  export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
  export const registerUserError = (message) => ({
    type: REGISTER_USER_ERROR,
    payload: message
  });
  
  
 /*  export const updateUser = (data) => ({
    type: UPDATE_AUTH_USER,
    payload: data
  });
  
  export const forgotPassword = (forgotUserMail, history) => ({
    type: FORGOT_PASSWORD,
    payload: { forgotUserMail, history },
  });
  export const forgotPasswordSuccess = (forgotUserMail) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: forgotUserMail,
  });
  export const forgotPasswordError = (message) => ({
    type: FORGOT_PASSWORD_ERROR,
    payload: { message },
  });
  
  export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
    type: RESET_PASSWORD,
    payload: { resetPasswordCode, newPassword, history },
  });
  export const resetPasswordSuccess = (newPassword) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: newPassword,
  });
  export const resetPasswordError = (message) => ({
    type: RESET_PASSWORD_ERROR,
    payload: { message },
  });
  
  
  export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
  }); */
  