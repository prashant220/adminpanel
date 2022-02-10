import { createSlice } from "@reduxjs/toolkit";

export const sentenceSlice = createSlice({
  name: "sentence",
  initialState: {
    categories: {
      isLoading: false,

      error: null,
      isError: false,

      isSuccessfull: false,
      data: null,
    },
    sentenceList: {
      categoryName: null,
      isLoading: false,

      error: null,
      isError: false,

      isSuccessfull: false,
      data: [],
    },
  },
  reducers: {
    setListSentenceCategory: (state, action) => {
      let { sentenceList } = state;
      return {
        ...state,
        sentenceList: {
          ...sentenceList,
          categoryName: action.payload,
        },
      };
    },
    sentencesLoading: (state, action) => {
      let { sentenceList } = state;
      return {
        ...state,
        sentenceList: {
          ...sentenceList,
          isLoading: true,
        },
      };
    },
    sentencesLoadingFailed: (state, action) => {
      let { sentenceList } = state;
      return {
        ...state,
        sentenceList: {
          ...sentenceList,
          isLoading: false,
          error: action.payload,
          isFailed: true,
        },
      };
    },
    sentencesLoadingSuccess: (state, action) => {
      let { sentenceList } = state;
      return {
        ...state,
        sentenceList: {
          ...sentenceList,
          isLoading: false,

          error: null,
          isFailed: false,

          isSuccessfull: true,
          data: action.payload,
        },
      };
    },
    categoriesLoading: (state, action) => {
      let { categories } = state;
      return {
        ...state,
        categories: {
          ...categories,
          isLoading: true,
        },
      };
    },
    categoriesLoadingFailed: (state, action) => {
      let { categories } = state;
      return {
        ...state,
        categories: {
          ...categories,
          isLoading: false,
          error: action.payload,
          isFailed: true,
        },
      };
    },
    categoriesLoadingSuccess: (state, action) => {
      let { categories } = state;
      let { data } = categories;
      return {
        ...state,
        categories: {
          ...categories,
          isLoading: false,

          error: null,
          isFailed: false,

          isSuccessfull: true,
          data: {
            ...data,
            identifier: action.payload.identifier,
            list: action.payload.availableSentenceCategories.itemListElement,
          },
        },
      };
    },
  },
});

export const {
  categoriesLoading,
  categoriesLoadingFailed,
  categoriesLoadingSuccess,

  setListSentenceCategory,
  sentencesLoading,
  sentencesLoadingFailed,
  sentencesLoadingSuccess,
} = sentenceSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default sentenceSlice.reducer;
