import axios from "axios";
import to from "await-to-js";

import { store } from "../store/store";
var fs = require("fs");

const getToken = () => {
  // token fetching here...
  return store.getState().auth.token;
};

// API CONSTANTS ( URLs)
// export const QUERY_END_POINT =
//   "http://3.131.241.221/semantro-web-interface/query";

let getApiEndpoint = async () => {
  let a = await fetch("apiConstants.json")
    .then((data) => data.json())
    .catch((error) => console.log(error))
    .then((config) => {
      const endpoints = { ...config };
      return endpoints;
      // console.log(endpoints);
    });
  return a;
};

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("interceptor error", error);
    if (error.response && error.response.status === 401) {
      console.log("401 error", error.response.data);
      throw error.response.data;
    }
    if (error.response && error.response.status === 400) {
      console.log("400 error", error.response.data);
      throw error.response.data;
    }
    if (error.response && error.response.status === 404) {
      console.log("404 error", error.response.data);
      throw error.response.data;
    }
    if (error.response && error.response.status === 177) {
      console.log("177 error", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
);

const api = {
  POSTUSER_MUTATE: async (resource) => {
    const token = await getToken();
    let { MUTATION_END_POINT } = await getApiEndpoint();

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(resource));

    try {
      return await axios({
        method: "POST",
        url: MUTATION_END_POINT,
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: token,
        },
        data: requestData,
      });
    } catch (error) {
      throw await error;
    }
  },

  POSTUSER_MUTATE_WORD: async (resource, image, audio) => {
    const token = await getToken();
    let { MUTATION_END_POINT } = await getApiEndpoint();

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(resource));

    image && requestData.append("file", image);
    audio && requestData.append("audio", audio);

    try {
      return await axios({
        method: "POST",
        url: MUTATION_END_POINT,
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: token,
        },
        data: requestData,
        
      });
    } catch (error) {
      throw await error;
    }
  },

  LOGIN: async (resource) => {
    let { LOGIN_END_POINT } = await getApiEndpoint();

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(resource));

    try {
      return await axios({
        method: "POST",
        url: LOGIN_END_POINT,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: requestData,
      });
    } catch (error) {
      throw await error;
    }
  },

  POSTUSER_QUERY: async (resource) => {
    const token = await getToken();
    let { QUERY_END_POINT } = await getApiEndpoint();

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(resource));

    try {
      return await axios({
        method: "POST",
        url: QUERY_END_POINT,
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: token,
        },
        data: requestData,
      });
    } catch (error) {
      throw await error;
    }
  },

  // public query
  POSTPUBLIC_QUERY: async (resource) => {
    let { QUERY_END_POINT } = await getApiEndpoint();

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(resource));

    try {
      return await axios({
        method: "POST",
        url: QUERY_END_POINT,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: requestData,
      });
    } catch (error) {
      throw await error;
    }
  },
};

export default api;
