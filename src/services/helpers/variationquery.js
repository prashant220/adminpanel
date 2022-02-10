import api from "../api";
import to from "await-to-js";

const variationRequests = {
  getDetailsOfWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getDetailsOfWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Word",
        wordEntry: "नाङ  dfdf ",
      },
    };
    //
    const { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntry: queryData.wordEntry,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },

  // updateWord: async (queryData) => {
  //   //   this works for updation as well
  //   let a = {
  //     "@context": "http://semantro.com/",
  //     "@type": "DictionaryMutation",
  //     actionName: "addWord",
  //     data: {
  //       "@context": "http://semantro.com/",
  //       "@type": "Word",
  //       identifier: "4a5e799e4c6c4f47-85afcee1e0fafaf8",
  //       wordEntry: "nang",
  //       ipa: "/nan/",
  //       name: "नाङ",
  //     },
  //   };

  //   const { data } = a;
  //   let queryFormat = {
  //     ...a,
  //     data: {
  //       ...data,
  //       identifier: queryData.identifier,
  //       wordEntry: queryData.wordEntry,
  //       ipa: queryData.ipa,
  //       name: queryData.name,
  //     },
  //   };
  //   let [error, response] = await to(api.POSTUSER_MUTATE_WORD(queryFormat));
  //   if (response.status === "fail") {
  //     throw { ...response };
  //   } else {
  //     return response;
  //   }
  // },
  addWord: async (queryData) => {
    //   this works for updation as well
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Word",
        wordEntry: "nang",
        ipa: "/nan/",
        name: "नाङ",
        source: "",
      },
    };

    const { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntry: queryData.wordEntry,
        ipa: queryData.ipa,
        name: queryData.name,
        source: queryData.source,
      },
    };

    let audio = queryData.audio ? queryData.audio : null;
    let image = null;

    let [error, response] = await to(
      api.POSTUSER_MUTATE_WORD(queryFormat, image, audio)
    );
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default variationRequests;
