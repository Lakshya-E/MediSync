/* eslint-disable no-unused-vars */

import { actionFactory } from "../../libs/actionFactory.js";
import {
    ISCANCELLED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOAD_USER_DETAILS,
    REGISTER_USER,
    LOGIN_USER,
    SET_USER_AVATAR_COLOR,
    SET_ENABLED_APPS,
} from "../actionTypes/index.js";

export const registerUser = (body) => {
  return actionFactory({
    api: `post/api/user/register/`, // Adjust this endpoint as needed
    actionBase: REGISTER_USER,
    actionBody: {
      body: body, // body should contain { username, email, password, password2 }
    },
    failureToast: true,
    sendEmptyToken: true, // For signup, we usually don't need a token
    callback: (respPromise, dispatch, getState) => {
      respPromise
        .then((resp) => {
          console.log(resp)
          if (resp?.data?.status?.status_type === "SUCCESS") {
            // Assuming the API sends back a token on success
            sessionStorage.setItem("Token", "Token " + resp?.data?.data?.token);
            // dispatch(loadUserDetails()); // Load the user details after registration
          } else {
            dispatch({ type: LOGIN_FAIL });
            dispatch(logoutUser());
            dispatch(setIsCancelled(true));
          }
        })
        .catch((err) => {
          clearLocalStorage();
          dispatch(setIsCancelled(true));
          console.error("API error:", err);
          dispatch({ type: LOGIN_FAIL });
        });
    },
  });
};

export const loginWithUsernamePassword = (body) => {
    return actionFactory({
      api: "post/api/user/login", // Adjust this endpoint as needed
      actionBase: LOGIN_USER,
      actionBody: {
        body: body, // body should contain { username, password }
      },
      failureToast: true,
      sendEmptyToken: true, // Usually, we don't send a token for login (unless you're doing refresh token or similar)
      callback: (respPromise, dispatch, getState) => {
        respPromise
          .then((resp) => {
            if (resp?.data?.status?.status_type === "SUCCESS") {
              // On success, store the token in sessionStorage
              sessionStorage.setItem("Token", "Token " + resp?.data?.data?.token);
              dispatch(loadUserDetails()); // Load the user details after successful login
            } else {
              dispatch({ type: LOGIN_FAIL });
              dispatch(logoutUser());
              dispatch(setIsCancelled(true));
            }
          })
          .catch((err) => {
            clearLocalStorage();
            dispatch(setIsCancelled(true));
          });
      },
    });
};

const clearLocalStorage = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("picture");
};

export const logoutUser = (dispatch) => {
    clearLocalStorage();
    return actionFactory({
      api: "post/api/user/logout/",
      actionBase: LOGOUT,
      failureToast: true,
      callback: (respPromise, dispatch, getState) => {
        respPromise
          .then((resp) => {
            clearLocalStorage();
            window.location.replace("/#/login");
            // dispatch({ type: LOGOUT });
            // dispatch({ type: SET_ENABLED_APPS, payload: null });
            // dispatch(setApp(null));
          })
          .catch((err) => {});
      },
    });
};

export const loadUserDetails = () => {
    return actionFactory({
      api: "get/api/user/self/",
      failureToast: true,
      actionBase: LOAD_USER_DETAILS,
  
      callback: (respPromise, dispatch, getState) => {
        respPromise
          .then((resp) => {
            if (resp?.data?.status?.status_type === "SUCCESS") {
              const picture = sessionStorage.setItem(
                "picture",
                resp.data.data.extra_data.picture,
              );
              dispatch({
                type: LOGIN_SUCCESS,
                payload: { ...resp.data.data, picture },
              });
            }
          })
          .catch((err) => {
            if (
              err["response"]?.data?.status?.status_message === "Token Expired"
            ) {
              clearLocalStorage();
              window.location.replace("/login");
            }
            dispatch(setIsCancelled(true));
            clearLocalStorage();
            window.location.reload("/#/login");
          });
      },
    });
};

export const setIsCancelled = (payload) => ({
    type: ISCANCELLED,
    payload: payload,
});
