import api from "../api";
import to from "await-to-js";

const articleRequests = {
  countTotalNewsArticle: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalNewsArticle",
    };

    let queryFormat = {
      ...a,
    };

    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  listNewsArticle: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listNewsArticle",
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
    };

    let { data } = a;
    let { pageLimit } = a;

    let queryFormat = {
      ...a,
      pageLimit: {
        ...pageLimit,
        start: queryData.start,
        end: queryData.end,
      },
    };

    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  deleteNewsArticle: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteNewsArticle",
      data: {
        "@context": "http://semantro.com/",
        "@type": "NewsArticle",
        identifier: "7009b8b5da694460-bdf06f08a13fa2f7",
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
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  addNewsArticle: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addNewsArticle",
      data: {
        "@context": "http://semantro.com/",
        "@type": "NewsArticle",
        articleSection: "https://sherpalifeproject.com/en/1684-2/",
        articleBody: "Sherpa language learning",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        articleSection: queryData.articleSection,
        articleBody: queryData.articleBody,
      },
    };

    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default articleRequests;
