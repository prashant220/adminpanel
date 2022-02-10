import React from "react";

import "./styles.css";

import { Tabs } from "antd";
import ArticleAdd from "../articleadd/ArticleAdd";
import ArticleList from "../articlelist/ArticleList";

const { TabPane } = Tabs;

export default function ArticleTabs() {
  return (
    <div className="articletabs__container">
      <Tabs type="card">
        <TabPane tab="Add Article" key="1">
          <ArticleAdd />
        </TabPane>
        <TabPane tab="List Article" key="2">
          <ArticleList />
        </TabPane>
      </Tabs>
    </div>
  );
}
