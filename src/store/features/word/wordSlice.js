import { createSlice } from "@reduxjs/toolkit";

export const wordSlice = createSlice({
  name: "auth",
  initialState: {
    wordList: [],
    isLoadingWordSearch: false,
    errorWordSearch: null,

    isLoadingWordDetail: false,
    errorGetWordDetail: null,
  },

  reducers: {
    setWordDetailError: (state, action) => {
      return {
        ...state,
        isLoadingWordDetail: false,
        errorGetWordDetail: action.payload,
      };
    },
    setIsLoadingWordDetail: (state, action) => {
      return {
        ...state,
        isLoadingWordDetail: true,
      };
    },
    setWordDetail: (state, action) => {
      return {
        ...state,
        wordList: state.wordList.map((word) => {
          if (word.identifier === action.payload.wordID) {
            return {
              ...word,
              wordDetail: action.payload.wordDetail,
            };
          }
          return word;
        }),
        isLoadingWordDetail: false,
      };
    },
    setIsLoadingWordSearch: (state, action) => {
      return {
        ...state,
        isLoadingWordSearch: true,
      };
    },
    setWordSearchResult: (state, action) => {
      return {
        ...state,
        wordList: action.payload,
        isLoadingWordSearch: false,
      };
    },
    setWordSearchResultError: (state, action) => {
      return {
        ...state,
        errorWordSearch: action.payload,
        isLoadingWordSearch: false,
      };
    },
  },
});

export const {
  setIsLoadingWordSearch,
  setWordSearchResult,
  setWordSearchResultError,

  setWordDetailError,
  setIsLoadingWordDetail,
  setWordDetail,
} = wordSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default wordSlice.reducer;
