import api from "../api";
import to from "await-to-js";

const transliterationRequests = {
  updateTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "updateTransliteration",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Transliteration",
        identifier: "f9385232f5ce43ef-b170fa0952352483",
        transliterationInDevanagari: "सचिन",
        transliterationInSambhota: "सचिन",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,
        transliterationInDevanagari: queryData.transliterationInDevanagari,
        transliterationInSambhota: queryData.transliterationInSambhota,
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

  getDetailsOfTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getDetailsOfTransliteration",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Transliteration",
        identifier: "f9385232f5ce43ef-b170fa0952352483",
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

  deleteTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteTransliteration",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Transliteration",
        identifier: "514d41aed70445d0-ab4e9ba150d4042e",
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

  searchTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "searchTransliteration",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Transliteration",
        wordEntry: "dz",
      },
    };

    let { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntry: queryData.wordEntry,
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

  addTransliteration: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addTransliteration",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Transliteration",
        transliterationInSambhota: "ङ क्षु थुङगु",
        transliterationInRoman: "sachin",
        transliterationInDevanagari: "सचिन गिरी",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        transliterationInSambhota: queryData.transliterationInSambhota,
        transliterationInRoman: queryData.transliterationInRoman,
        transliterationInDevanagari: queryData.transliterationInDevanagari,
      },
    };

    let [error, response] = await to(api.POSTUSER_MUTATE(queryFormat));
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default transliterationRequests;
