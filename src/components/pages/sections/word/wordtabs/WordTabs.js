import React from "react";

import "./styles.css";

import WordAdd from "../wordadd/WordAdd";
import WordSearch from "../wordsearch/WordSearch";
import WordList from "../wordlist/WordList";

import { Tabs } from "antd";

const { TabPane } = Tabs;

export default function WordTabs() {
  return (
    <div className="wordtabs__container">
      <Tabs type="card">
        <TabPane tab="Search Word" key="1">
          <WordSearch />
        </TabPane>
        <TabPane tab="Add Word" key="2">
          <WordAdd />
        </TabPane>
        <TabPane tab="List All Words" key="w">
          <WordList />
        </TabPane>
      </Tabs>
    </div>
  );
}
