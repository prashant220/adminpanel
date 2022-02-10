import {
  login,
  loginFailed,
  loginLoadingStart,
  loginLoadingEnd,
  clearAuth,
} from "./authSlice";
import axios from "axios";
import authRequests from "../../../services/helpers/authquery";
import { Route, Redirect, withRouter } from "react-router-dom";
import to from "await-to-js";
// import api from "../../services/api";
// import axios from "axios";

export const logOut = (history) => async (dispatch) => {
  dispatch(clearAuth());
  localStorage.removeItem("persist:auth");
  //any routing if needed
  history.push("/login");
};

export const logIn = (credentials, history) => async (dispatch) => {
  dispatch(loginLoadingStart());
  let [err, response] = await to(authRequests.loginAdminUser(credentials));
  dispatch(loginLoadingEnd());

  if (err) return dispatch(loginFailed(err));
  dispatch(login({ response, credentials }));

  //any routing if needed
  history.push("/");
};

export const checkIfUserIsAuthenticated =
  (history) => async (dispatch, getState) => {
    let state = getState();
    var data = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getUserType",
    
      data: {
        "@context": "http://semantro.com/", 
        "@type": "User",
        userName: state.auth.user,
      },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("data", JSON.stringify(data))
    axios({
      method: "post",
      url: "https://jambulingsherpa.org/sherpadictionary-web-interface/query",
  
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        accessToken: state.auth.token,
      },
    })
      .then((response) => {
    
      console.log(response.roleName)
      if (response.roleName!=="ADMIN") {
        // console.log("session expired");
        // clear  everything on auth and local storage  too
        dispatch(clearAuth());
        localStorage.removeItem("persist:auth");

        //any routing if needed
        <Redirect to="/login" />
    
      } else {
        // console.log("session valid");
      }
       
      })
  
      .catch((error) => {
        console.log(error);
      });
   
    let qd = {
      userName: state.auth.user,
    };
    // let [err, response] = await to(authRequests.getUserDetail(qd));

    // check if the  repose status
    // console.log(err, response);
  
  };