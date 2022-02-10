import api from "../api";
import to from "await-to-js";

const statRequests = {
  countTotalSentence: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalSentence",
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
  countTotalSherpaWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalSherpaWord",
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
  countTotalTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalTransliteration",
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
  countTotalAvailableSentenceCategory: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalAvailableSentenceCategory",
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
  countTotalVideoUrl: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalVideoUrl",
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
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default statRequests;
