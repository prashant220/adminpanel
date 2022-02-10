import React, { useState } from "react";

import "./styles.css";
import { useHistory } from "react-router-dom";
import { Input, Space, Select, Spin } from "antd";
import { withRouter } from "react-router-dom";

import {
  searchEnglishWord,
  searchNepaliWord,
  searchByTag
} from "../../../../../store/features/word/wordActions";
import { useDispatch, connect } from "react-redux";
import { WordPreview } from "../../../../UIcomponents";

const { Search } = Input;
const { Option } = Select;

function WordSearch(props) {
  const { word } = props;

  const dispatch = useDispatch();

  let [selectedSearchLanguage, setSelectedSearchLanguage] = useState("en");
  let [searchString, setSearchString] = useState("");

  const onSearch = (e) => {
    setSearchString(e);

    if (selectedSearchLanguage === "ne") {
      dispatch(searchNepaliWord(e));
    } else if(selectedSearchLanguage==="en") {
      dispatch(searchEnglishWord(e));
    }
    else if(selectedSearchLanguage==="tag") {
      // dispatch(searchByTag(e));
      props.history.push({ 
        pathname: '/tags',
        state: e
       });
    }
  }
console.log(selectedSearchLanguage)
console.log(searchString)
  const refetchDataOnMutation = () => {
    if (selectedSearchLanguage === "ne") {
      dispatch(searchNepaliWord(searchString));
    } else if(selectedSearchLanguage==="en") {
      dispatch(searchEnglishWord(searchString));
    }
    else if(selectedSearchLanguage==="tag") {
      dispatch(searchByTag(searchString));
    }
  };

  const onLanguageSelectChange = (e) => {
    setSelectedSearchLanguage(e.value);
  };

  return (
    <div>
      <Space>
        <Select
          labelInValue
          defaultValue={{ value: "en" }}
          style={{ width: 120 }}
          onChange={onLanguageSelectChange}
        >
          <Option value="en">English</Option>
          <Option value="ne">Nepali</Option>
          <Option value="tag">Tag</Option>
 
        </Select>

        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          // size="large"
          onSearch={onSearch}
        />
      </Space>

      <div>
        {word.isLoadingWordSearch && <Spin />}
        {word.isLoadingWordDetail && <Spin />}
        {word.isLoadingWordDetail && <Spin />}
      </div>

      {word.wordList.length === "0" && <p>No Results</p>}

      {word.wordList && word.wordList.length > 0
        ? word.wordList.map((wordItem) => {
            return (
              <WordPreview
                key={wordItem.identifier}
                wordInfo={wordItem}
                refetchDataOnMutation={refetchDataOnMutation}
              />
            );
          })
        : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    word: state.word,
  };
};

export default withRouter(connect(mapStateToProps)(WordSearch));
