import {
  setIsLoadingTransliterateSearch,
  setTransliterateSearchResult,
  setTransliterateSearchResultError,
  setTransliterateDetailError,
  setIsLoadingTransliterateDetail,
  setTransliterateDetail,
} from "./transliterateSlice";
import to from "await-to-js";

import transliterateRequests from "../../../services/helpers/transliterationquery";

export const searchTransliterateKeyword = (keyword) => async (dispatch) => {
  dispatch(setIsLoadingTransliterateSearch());

  let queryData = {
    wordEntry: keyword,
  };
  let [err, response] = await to(
    transliterateRequests.searchTransliteration(queryData)
  );

  if (err) return dispatch(setTransliterateSearchResultError(err));

  response &&
    response.itemListElement &&
    dispatch(setTransliterateSearchResult(response.itemListElement));

  response &&
    response.itemListElement &&
    response.itemListElement.length > 0 &&
    response.itemListElement.map((item) =>
      dispatch(getTransliterateDetail(item.identifier))
    );
};

export const getTransliterateDetail = (identifier) => async (dispatch) => {
  dispatch(setIsLoadingTransliterateDetail());

  let queryData = {
    identifier: identifier,
  };
  let [err, response] = await to(
    transliterateRequests.getDetailsOfTransliteration(queryData)
  );

  if (err) return dispatch(setTransliterateDetailError(err));

  let payLoadData = {
    transliterateDetail: response,
    transliterateID: queryData.identifier,
  };
  dispatch(setTransliterateDetail(payLoadData));
};
