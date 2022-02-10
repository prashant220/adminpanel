import api from "../api";
import to from "await-to-js";

const sentenceRequests = {
  deleteSentence: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteSentence",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        identifier: "e24bcc522c724623-ba81d7c835c2410c",
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

  getDetailsOfSentence: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getDetailsOfSentence",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        identifier: "9166f562dce7490e-8283cefc580202bb",
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

  listSentenceByCategory: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listSentenceByCategory",
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        sentenceCategoryName: "honourable",
      },
    };

    let { data } = a;
    let { pageLimit } = a;

    let queryFormat = {
      ...a,
      pageLimit: {
        ...pageLimit,
        start: queryData.pagination.start,
        end: queryData.pagination.end,
      },
      data: {
        ...data,
        sentenceCategoryName: queryData.categoryName,
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

  countTotalSentenceByCategory: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countTotalSentenceByCategory",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        sentenceCategoryName: "respect",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,

      data: {
        ...data,
        sentenceCategoryName: queryData.categoryName,
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

  listAvailableSentenceCategory: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listAvailableSentenceCategory",
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

  updateSentence: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "updateSentence",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        identifier: "75b6901ad8ce4756-aaa14025d00c48fd",
        sentenceInSambhota: "ला तीवा",
        sentenceInRoman: "dunthak chikki ngima tiwa",
        sentenceInEnglish: "i drink water.",
        sentenceInDevanagari: "ङ क्षु थुङगु",
        sentenceCategoryName: "days/दिनहरु",
        text: "མཁན་པོ མཁན་པོ།མཁན་པོ།",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,

        sentenceInSambhota: queryData.sentenceInSambhota,
        sentenceInRoman: queryData.sentenceInRoman,
        text: queryData.text,

        sentenceInDevanagari: queryData.sentenceInDevanagari,
        sentenceInEnglish: queryData.sentenceInEnglish,

        sentenceCategoryName: queryData.sentenceCategoryName,
      },
    };

    let image = queryData.image ? queryData.image : null;
    let audio = queryData.audio ? queryData.audio : null;

    let [error, response] = await to(
      api.POSTUSER_MUTATE_WORD(queryFormat, image, audio)
    );
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },

  addSentence: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addSentence",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Sentence",
        sentenceInSambhota: "दुन्ठाक चीक्की ङीमातीवा",
        sentenceInRoman: "tiwa",
        sentenceInEnglish: "Months",
        sentenceInDevanagari: "महिनाहरू",
        sentenceCategoryName: "honourable/आदरणीय",
        text: "མཁན་པོ མཁན་པོ།མཁན་པོ།",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        sentenceInSambhota: queryData.sentenceInSambhota,
        sentenceInRoman: queryData.sentenceInRoman,
        text: queryData.text,

        sentenceInDevanagari: queryData.sentenceInDevanagari,
        sentenceInEnglish: queryData.sentenceInEnglish,

        sentenceCategoryName: queryData.sentenceCategoryName,
      },
    };

    let image = queryData.image ? queryData.image : null;
    let audio = queryData.audio ? queryData.audio : null;

    let [error, response] = await to(
      api.POSTUSER_MUTATE_WORD(queryFormat, image, audio)
    );
    // console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },

  updateSentenceCategory: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "updateSentenceCategory",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SentenceCategory",
        identifier: "4b8ff965f7dd4486-9dcd214e3c3f97f3",
        availableSentenceCategories: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["honourable", "respect1"],
        },
      },
    };

    let { data } = a;
    let { availableSentenceCategories } = data;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,

        availableSentenceCategories: {
          ...availableSentenceCategories,

          itemListElement: queryData.availableSentenceCategories &&
            queryData.availableSentenceCategories.length && [
              ...queryData.availableSentenceCategories,
            ],
        },
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

export default sentenceRequests;
