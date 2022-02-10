import React, { useState } from "react";

import "./styles.css";

import { Input, Spin, Button } from "antd";
import { Link, withRouter } from "react-router-dom";

import { searchTransliterateKeyword } from "../../../../../store/features/transliterate/transliterateActions";
import { useDispatch, connect } from "react-redux";

import TransliterationPreview from "../../../../UIcomponents/transliterationpreview/TransliterationPreview";

function TransliterationSearch(props) {
  const { transliterate } = props;

  let [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const onSearch = () => {
    if (searchKeyword !== "") {
      let wordEntry = searchKeyword;

      dispatch(searchTransliterateKeyword(wordEntry));
    }
  };

  return (
    <div>
      <div className="transliterationsearch__search-container">
        <Input
          placeholder="Enter your text here"
          onChange={(e) => setSearchKeyword(e.target.value)}
          onPressEnter={() => {
            onSearch();
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            onSearch();
          }}
        >
          Search
        </Button>
      </div>

      {transliterate.isLoadingTransliterateSearch && <Spin />}
      {transliterate.isLoadingTransliterateDetail && <Spin />}

      {transliterate.transliterateList &&
        transliterate.transliterateList.length === 0 && <p>No results</p>}
      {transliterate.transliterateList &&
      transliterate.transliterateList.length > 0
        ? transliterate.transliterateList.map((transliterateItem) => {
            return (
              <TransliterationPreview
                key={transliterateItem.identifier}
                transliterateInfo={transliterateItem}
                searchKeyword={searchKeyword}
              />
            );
          })
        : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    transliterate: state.transliterate,
  };
};

export default withRouter(connect(mapStateToProps)(TransliterationSearch));
