import api from "../api";
import to from "await-to-js";

const videoRequests = {
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
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  listVideoUrl: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listVideoUrl",
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
  deleteVideoUrl: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteVideoUrl",
      data: {
        "@context": "http://semantro.com/",
        "@type": "VideoObject",
        identifier: "05c5f55f170c44b5-b4a319f9666a53ea",
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
  addVideoUrl: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addVideoUrl",
      data: {
        "@context": "http://semantro.com/",
        "@type": "VideoObject",
        contentUrl: "https://www.youtube.com/watch?v=ilOm-yjraXc",
        caption: "LEARN SHERPA LANGUAGE 2020 [ CONSONANTS, VOWELS & NUMBERS ]",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        contentUrl: queryData.contentUrl,
        caption: queryData.caption,
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

export default videoRequests;
