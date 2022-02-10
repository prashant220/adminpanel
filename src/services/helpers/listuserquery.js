import api from "../api";
import to from "await-to-js";

const userRequests = {
 
  listUserCounts: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listUsers",
      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        "alternateName": "USER"
      },
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        "start": 0,
        "end": 10
      }
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
  countUserLists: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countUsers",
      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        "alternateName": "USER"
      }
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
 
};

export default userRequests;
