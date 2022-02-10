import api from "../api";
import to from "await-to-js";

const statRequests = {
  deleteComment: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteComment",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Comment",
        identifier: "a42a3c8b6f354137-b99563ce207b7475",
      },
    };

    let { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },

  listUserComments: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listUserComments",
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
    };

    let { pageLimit } = a;
    let queryFormat = {
      ...a,
      pageLimit: {
        ...pageLimit,
        start: queryData.pagination.start,
        end: queryData.pagination.end,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  countUserComments: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countUserComments",
    };
    let queryFormat = {
      ...a,
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  listPreviousComments: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listPreviousComments",
      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        userName: "SAchingiri619@gmail.com",
      },
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
    };
    const { data, pageLimit } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        userName: queryData.userName,
      },
      pageLimit: {
        ...pageLimit,
        start: queryData.pagination.start,
        end: queryData.pagination.end,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default statRequests;
