import React, { useEffect } from "react";

import "./styles.css";

import { Tabs } from "antd";
import SentenceAdd from "../sentenceadd/SentenceAdd";
import ListSentence from "../listsentence/ListSentence";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { listAllCategories } from "../../../../../store/features/sentence/sentenceActions";
import SentenceAndCategory from "../addsentencecategory/SentenceAndCategory";

const { TabPane } = Tabs;

function SentenceTabs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAllCategories());
  }, []);

  //dispatch loading all categories here and make sure you use it everywhere

  return (
    <div className="wordtabs__container">
      <Tabs type="card">
        <TabPane tab="List Sentence" key="1">
          <ListSentence />
        </TabPane>
        <TabPane tab="Sentence Category" key="2">
          <SentenceAndCategory />
        </TabPane>
        <TabPane tab="Add Sentence" key="3">
          <SentenceAdd />
        </TabPane>
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log('state', state);
  return {};
};

export default withRouter(connect(mapStateToProps)(SentenceTabs));
