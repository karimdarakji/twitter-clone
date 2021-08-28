/* eslint-disable import/no-anonymous-default-export */
import {LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS} from '../actions'

const initialState = {
    user: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return  {
                ...state,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state, message: action.payload
            }
        case LOGIN_USER_ERROR:
            return {
                ...state, message: action.payload
            }

        case REGISTER_USER:
            return  {
                ...state,
                message: ''
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state, 
                user: action.payload,
                isOpen: true,
                message: ''
            }
        case REGISTER_USER_ERROR:
            return {
                ...state, message: action.payload
            }
        default:
            return state;
    }
}