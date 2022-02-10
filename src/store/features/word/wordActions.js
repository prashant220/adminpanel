import {
  setIsLoadingWordSearch,
  setWordSearchResult,
  setWordSearchResultError,
  setWordDetailError,
  setIsLoadingWordDetail,
  setWordDetail,
} from "./wordSlice";
import to from "await-to-js";

import wordRequests from "../../../services/helpers/wordquery";

export const searchEnglishWord = (keyword) => async (dispatch) => {
  dispatch(setIsLoadingWordSearch());
console.log(keyword)
  let queryData = {
    keyword: keyword,
  };
  let [err, response] = await to(wordRequests.searchEnglishWord(queryData));

  if (err) return dispatch(setWordSearchResultError(err));

  response &&
    response.itemListElement &&
    dispatch(setWordSearchResult(response.itemListElement));

  response &&
    response.itemListElement &&
    response.itemListElement.length > 0 &&
    response.itemListElement.map((item) => {
      dispatch(getWordDetail(item.identifier));
    });
};

export const searchNepaliWord = (keyword) => async (dispatch) => {
  dispatch(setIsLoadingWordSearch());

  let queryData = {
    keyword: keyword,
  };
  let [err, response] = await to(wordRequests.searchNepaliWord(queryData));

  if (err) return dispatch(setWordSearchResultError(err));

  dispatch(setWordSearchResult(response.itemListElement));

  response.itemListElement &&
    response.itemListElement.length > 0 &&
    response.itemListElement.map((item) => {
      dispatch(getWordDetail(item.identifier));
    });
};

//Search by Tag

export const searchByTag = (keyword) => async (dispatch) => {
  dispatch(setIsLoadingWordSearch());
console.log(keyword)
  let queryData = {
     tag: keyword,
     
   };
   let [err, response] = await to(wordRequests.searchByTag(queryData));
    console.log(response,err)
  if (err) return dispatch(setWordSearchResultError(err));

  dispatch(setWordSearchResult(response.itemListElement));

  response.itemListElement &&
    response.itemListElement.length > 0 &&
    response.itemListElement.map((item) => {
      dispatch(getWordDetail(item.identifier));
    });
};



export const getWordDetail = (identifier) => async (dispatch) => {
  dispatch(setIsLoadingWordDetail());

  let queryData = {
    identifier: identifier,
  };
  let [err, response] = await to(
    wordRequests.getDetailsOfSherpaWord(queryData)
  );

  if (err) return dispatch(setWordDetailError(err));

  let payLoadData = {
    wordDetail: response,
    wordID: queryData.identifier,
  };
  dispatch(setWordDetail(payLoadData));
};
