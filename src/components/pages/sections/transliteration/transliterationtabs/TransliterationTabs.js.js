import React from "react";

import "./styles.css";

import { Tabs } from "antd";
import AddTransliteration from "../addtransliteration/AddTransliteration";
import TransliterationSearch from "../transliterationsearch/TransliterationSearch";
import TransliterationList from "../trasliterationlist/TransliterationList";
const { TabPane } = Tabs;

export default function TransliterationTabs() {
  return (
    <div className="wordtabs__container">
      <Tabs type="card">
        <TabPane tab="Search Transliteration" key="1">
          <TransliterationSearch />
        </TabPane>
        <TabPane tab="Add Translation" key="2">
          <AddTransliteration />
        </TabPane>
        <TabPane tab="List All Transliteration" key="3">
          <TransliterationList />
        </TabPane>
      </Tabs>
    </div>
  );
}
