import {
  categoriesLoading,
  categoriesLoadingFailed,
  categoriesLoadingSuccess,
  setListSentenceCategory,
  sentencesLoading,
  sentencesLoadingFailed,
  sentencesLoadingSuccess,
} from "./sentenceSlice";

import sentenceRequests from "../../../services/helpers/sentencequery";

import to from "await-to-js";
// import api from "../../services/api";
// import axios from "axios";

// export const countTotalSentenceByCategory = (queryData) => async (dispatch) => {
//   let [err, response] = await to(
//     sentenceRequests.countTotalSentenceByCategory(queryData)
//   );
//   if (err) return dispatch(sentencesLoadingFailed(err));
//   dispatch(sentencesLoadingSuccess(response.itemListElement));
// };

export const listSentenceByCategory = (queryData) => async (dispatch) => {
  dispatch(sentencesLoading());
  dispatch(setListSentenceCategory(queryData.categoryName));

  let [err, response] = await to(
    sentenceRequests.listSentenceByCategory(queryData)
  );

  if (err) return dispatch(sentencesLoadingFailed(err));
  dispatch(sentencesLoadingSuccess(response.itemListElement));
};

export const listAllCategories = () => async (dispatch) => {
  dispatch(categoriesLoading());

  let [err, response] = await to(
    sentenceRequests.listAvailableSentenceCategory()
  );

  if (err) return dispatch(categoriesLoadingFailed(err));
  dispatch(categoriesLoadingSuccess(response));
};
