/* eslint-disable no-unused-vars */

import axios from "axios";
import { isEqual, isFunction } from "lodash";
import { callToast } from "../components/common/Toast/toastHelper";
import constants from "../constants";
import { logoutUser } from "../store/actions/authAction";

// TODO: add Toast element
// import toast from "react-hot-toast";
const pathExtractor = (request_path, params) => {
  const request_type = request_path.slice(0, request_path.indexOf("/"));
  const psuedo_path = request_path.slice(request_path.indexOf("/") + 1);

  var path = psuedo_path;
  for (const key in params) {
    path = psuedo_path.replaceAll(key, params[key]);
  }
  return { request_type, path };
};

/**
 *
 * @param {object} Object containing the following properties.
 *   @param {string}            api              api path 'get/api/categories'.
 *   @param {string}            actionBase       action type base 'GET_USERS'.
 *   @param {object}            actionBody       actionBody to be passed to the api path.
 *   @param {function}          callback         callback function to be called after the api call is completed.
 *   @param {string}            successToast     Toast message to be displayed on success.
 *   @param {bool || string}    failureToast     Toast message to be displayed on failure.
 * @return  {function}          action creator function to make API call and dispatching the response.
 */

export const actionFactory = ({
  api,
  actionBase,
  actionBody = {},
  callback = () => {},
  successToast = null,
  failureToast = null,
  initialization = () => {},
  blobResponseType = false,
  sendEmptyToken = false,
  multipartReq = false,
}) => {
  const REQUEST = `${actionBase}_REQUEST`;
  const SUCCESS = `${actionBase}_SUCCESS`;
  const FAILURE = `${actionBase}_FAILURE`;
  const PARAM_DEBUG = `${actionBase}_REQ_PARAM_DEBUG`;

  return function (dispatch, getState) {
    let p;
    if (isFunction(actionBody)) {
      p = actionBody(getState);
    } else {
      p = { ...actionBody };
    }
    initialization(p, dispatch, getState);
    dispatch({
      type: REQUEST,
      payload: p,
    });
    dispatch({
      type: PARAM_DEBUG,
      payload: {
        obj: p,
        // json: JSON.stringify(p),
      },
    });

    const token = sendEmptyToken ? "" : sessionStorage.getItem("Token");
    const { request_type, path } = pathExtractor(api, p);

    let contentType = "application/json";
    let reqBody = p.body;

    // multipartReq handling here
    if (multipartReq) {
      contentType = "multipart/form-data";
      const formData = new FormData();
      if (reqBody["file_data"]) {
        // reqBody has a file_data, file_data which is array of files
        for (const file of reqBody["file_data"]) {
          formData.append("file_data", file);
        }
      }
      // Append other fields
      for (const field in reqBody) {
        if (field !== "file_data") {
          formData.append(field, reqBody[field]);
        }
      }
      reqBody = formData;
    }
    /////

    const respPromise = axios({
      method: request_type,
      url: path,
      data: reqBody,
      headers: {
        "Content-Type": contentType,
        Authorization: `${token}`,
      },
      params: p.params,
      responseType: blobResponseType ? "blob" : "",
    });

    respPromise
      .then((resp) => {
        dispatch({
          type: SUCCESS,
          payload: resp.data,
        });

        if (successToast) {
          //TODO: successToast is needed
          callToast(
            {
              title: constants.SUCCESS,
              description: successToast,
            },
            constants.SUCCESS_TOAST,
          );
        }

        return resp.data;
      })
      .catch((err) => {
        dispatch({
          type: FAILURE,
          payload: err.message,
        });

        if (typeof failureToast === "boolean" && failureToast) {
          // TODO: show some failureToast
          // toast.error(err?.response?.data?.status?.status_message);
          callToast(
            {
              tittle: constants.ERROR,
              description:
                typeof err?.response?.data?.status?.status_message === "string"
                  ? err?.response?.data?.status?.status_message
                  : JSON.stringify(err?.response?.data?.status?.status_message),
            },
            constants.ERROR_TOAST,
          );
          if (
            isEqual(
              err?.response?.data?.status?.status_message,
              "Token Expired",
            ) ||
            err?.response?.status === 401
          ) {
            sessionStorage.removeItem("Token");
            sessionStorage.removeItem("picture");
            dispatch(logoutUser());
          }
        }

        if (typeof failureToast === "string") {
          // toast.error(failureToast)
          callToast(
            {
              tittle: constants.ERROR,
              description: failureToast,
            },
            constants.ERROR_TOAST,
          );
        }
      });

    callback(respPromise, dispatch, getState);
  };
};
