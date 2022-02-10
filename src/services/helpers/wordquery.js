import api from "../api";
import to from "await-to-js";
import React,{useState} from 'react';

const wordRequests = {
  
  deleteSherpaWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteSherpaWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        identifier: "5a517388a03c4e53-93c7afdb210f06ce",
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
  getDetailsOfSherpaWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getDetailsOfSherpaWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        identifier: "b650c41c27f04acf-ae832f31dce28cc8",
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
  searchEnglishWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "searchEnglishWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        wordEntry: "h",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntry: queryData.keyword,
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
  searchNepaliWord: async (queryData) => {
  
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "searchNepaliWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        wordEntry: "gh",
      },
    };

    let { data } = a;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntry: queryData.keyword,
    
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

//TAG
searchByTag: async (queryData) => {
  console.log(queryData.keyword)
 
let a = {
  "@context": "http://semantro.com/",
  "@type": "DictionarySearch",
  actionName: "listSherpaWordsByTag",
  pageLimit: {
    "@context": "http://semantro.com/",
    "@type": "PageProperty",
    start: 0,
    end: 10,
  },
  data: {
    "@context": "http://semantro.com/",
    "@type": "SherpaWord",
    tag: "Domestic Animals",
  },
};

let { data } = a;
let { pageLimit } = a;

let queryFormat = {
  ...a,
  data: {
    ...data,
    tag: queryData.tag,
 
  },
  
  pageLimit: {
    ...pageLimit,
    start: queryData.pagination.start,
    end: queryData.pagination.end,
  },

};
console.log(queryData.tag)
let [error, response] = await to(api.POSTPUBLIC_QUERY(queryFormat));
console.log( response);

if (response.status === "fail") {
  throw { ...response };
} else {
  return response;
}
},
//

  updateWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "updateSherpaWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        identifier: "b650c41c27f04acf-ae832f31dce28cc8",
        wordEntryInDevanagariSherpa: "खाङ्बा12",
        wordEntryInRoman: "ghar",
        wordEntryInEnglish: "Home",
        wordEntryInDevanagari: "घर",
        sambhotaSherpaScript: "fdgdg",
        wordMeaningInDevanagari: "बासस्थान",
        exampleUsage: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["please", "good"],
        },
        variationInSambhota: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["नाङ"],
        },
        ipa: "khŋba",
        pos: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["noun"],
        },
        register: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["tapalejung"],
        },
        mapTier: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["easy"],
        },
        tag: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["third", "five"],
        },
        definition : {
          "@context" : "http://semantro.com",
          "@type" : [ "ItemList", "Any" ],
          "itemListElement" : [ "साइ/sai/sai/खादै/eating", "सनी/seni/seni/खाएर/eaten", "साउ/sau/sau/खानछ/eat or eats" ]
        },
      },
    };

    let { data } = a;
    let { variationInSambhota, pos, register, mapTier, tag, exampleUsage } =
      data;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,

        wordEntryInDevanagariSherpa: queryData.wordEntryInDevanagariSherpa,
        wordEntryInRoman: queryData.wordEntryInRoman,
        wordEntryInEnglish: queryData.wordEntryInEnglish,
        wordEntryInDevanagari: queryData.wordEntryInDevanagari,
        sambhotaSherpaScript: queryData.sambhotaSherpaScript,
        wordMeaningInDevanagari: queryData.wordMeaningInDevanagari,

        exampleUsage: {
          ...exampleUsage,
          itemListElement: queryData.exampleUsage,
        },

        variationInSambhota: {
          ...variationInSambhota,
          itemListElement: queryData.variationInSambhota,
        },

        ipa: queryData.ipa,
        pos: {
          ...pos,
          itemListElement: queryData.pos,
        },
        register: {
          ...register,
          itemListElement: queryData.register &&
            queryData.register.length && [...queryData.register],
        },
        mapTier: {
          ...mapTier,
          itemListElement: queryData.mapTier,
        },
        tag: {
          ...tag,
          itemListElement: queryData.tag &&
            queryData.tag.length && [...queryData.tag],
        },
        definition: {
          ...tag,
          itemListElement: queryData.definition &&
            queryData.definition.length && [...queryData.definition],
        },
      },
    };

    let image = queryData.image ? queryData.image : null;
    let audio = queryData.audio ? queryData.audio : null;

    // console.log(queryFormat, image, audio);

    let [error, response] = await to(
      api.POSTUSER_MUTATE_WORD(queryFormat, image, audio)
    );
    // console.log(error, response);

    // if (error) throw { ...error };
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },

  addWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addSherpaWord",
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
        wordEntryInDevanagariSherpa: "खाq",
        wordEntryInRoman: "ghar",
        wordEntryInEnglish: "House",
        wordEntryInRomanizedSherpa: "khanbaaaa111",
        wordEntryInDevanagari: "घर",
        sambhotaSherpaScript: "fdgdg",
        wordMeaningInDevanagari: "बासस्थान",
        exampleUsage: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["please", "good"],
        },
        variationInSambhota: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["नाङ"],
        },
        ipa: "khŋba",
        pos: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["noun"],
        },
        register: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["tapalejung"],
        },
        mapTier: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["easy"],
        },
        tag: {
          "@context": "http://schema.org/",
          "@type": ["ItemList", "Text"],
          itemListElement: ["first", "second"],
        },
        definition : {
          "@context" : "http://semantro.com",
          "@type" : [ "ItemList", "Any" ],
          "itemListElement" : [ "साइ/sai/sai/खादै/eating", "सनी/seni/seni/खाएर/eaten", "साउ/sau/sau/खानछ/eat or eats" ]
        },
      },
    };

    let { data } = a;
    let { variationInSambhota, pos, register, mapTier, tag, exampleUsage } =
      data;

    let queryFormat = {
      ...a,
      data: {
        ...data,
        wordEntryInDevanagariSherpa: queryData.wordEntryInDevanagariSherpa,
        wordEntryInRoman: queryData.wordEntryInRoman,
        wordEntryInEnglish: queryData.wordEntryInEnglish,
        wordEntryInRomanizedSherpa: queryData.wordEntryInRomanizedSherpa,
        wordEntryInDevanagari: queryData.wordEntryInDevanagari,
        sambhotaSherpaScript: queryData.sambhotaSherpaScript,
        wordMeaningInDevanagari: queryData.wordMeaningInDevanagari,

        exampleUsage: {
          ...exampleUsage,
          itemListElement: queryData.exampleUsage,
        },

        variationInSambhota: {
          ...variationInSambhota,
          itemListElement: queryData.variationInSambhota,
        },

        ipa: queryData.ipa,
        pos: {
          ...pos,
          itemListElement: queryData.pos && [queryData.pos],
        },
        register: {
          ...register,
          itemListElement: queryData.register &&
            queryData.register.length && [...queryData.register],
        },
        mapTier: {
          ...mapTier,
          itemListElement: queryData.mapTier && [queryData.mapTier],
        },
        tag: {
          ...tag,
          itemListElement: queryData.tag &&
            queryData.tag.length && [...queryData.tag],
        },
        definition: {
          ...tag,
          itemListElement: queryData.definition &&
            queryData.definition.length && [...queryData.definition],
        },
      },
    };

    let image = queryData.image ? queryData.image : null;
    let audio = queryData.audio ? queryData.audio : null;

    // console.log(queryFormat, image, audio);

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
  listTotalSherpaWord: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listTotalSherpaWord",
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
      data: {
        "@context": "http://semantro.com/",
        "@type": "SherpaWord",
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
      data: {
        ...data,
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

export default wordRequests;
