import { createSlice } from "@reduxjs/toolkit";

export const transliterateSlice = createSlice({
  name: "transliterate",
  initialState: {
    transliterateList: null,
    isLoadingTransliterateSearch: false,
    errorTransliterateSearch: null,

    isLoadingTransliterateDetail: false,
    errorGetTransliterateDetail: null,
  },

  reducers: {
    setTransliterateDetailError: (state, action) => {
      return {
        ...state,
        isLoadingTransliterateDetail: false,
        errorGetTransliterateDetail: action.payload,
      };
    },
    setIsLoadingTransliterateDetail: (state, action) => {
      return {
        ...state,
        isLoadingTransliterateDetail: true,
      };
    },
    setTransliterateDetail: (state, action) => {
      return {
        ...state,
        transliterateList: state.transliterateList.map((transliterate) => {
          if (transliterate.identifier === action.payload.transliterateID) {
            return {
              ...transliterate,
              transliterateDetail: action.payload.transliterateDetail,
            };
          }
          return transliterate;
        }),
        isLoadingTransliterateDetail: false,
      };
    },
    setIsLoadingTransliterateSearch: (state, action) => {
      return {
        ...state,
        isLoadingTransliterateSearch: true,
      };
    },
    setTransliterateSearchResult: (state, action) => {
      return {
        ...state,
        transliterateList: action.payload,
        isLoadingTransliterateSearch: false,
      };
    },
    setTransliterateSearchResultError: (state, action) => {
      return {
        ...state,
        errorTransliterateSearch: action.payload,
        isLoadingTransliterateSearch: false,
      };
    },
  },
});

export const {
  setIsLoadingTransliterateSearch,
  setTransliterateSearchResult,
  setTransliterateSearchResultError,

  setTransliterateDetailError,
  setIsLoadingTransliterateDetail,
  setTransliterateDetail,
} = transliterateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default transliterateSlice.reducer;
