/* eslint-disable no-unused-vars */
import {
    ISCANCELLED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_USER_AVATAR_COLOR,
} from "../actionTypes/index";
  
const initialState = {
isLoggedIn: null,
user: null,
isCancel: false,
user_avatar_color: null,
};
  
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_SUCCESS:
        return { ...state, isLoggedIn: true, user: { ...payload } };
      case LOGIN_FAIL:
        return { ...state, user: null };
      case LOGOUT:
        return { ...state, isLoggedIn: false, user: null };
      case ISCANCELLED:
        return { ...state, isCancel: payload };
      case SET_USER_AVATAR_COLOR:
        return { ...state, user_avatar_color: payload };
      default:
        return state;
    }
}
