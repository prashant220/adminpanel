import React from "react";

import "./styles.css";
import { Tabs } from "antd";

import FeedbackList from "../feedbacklist/FeedbackList";
const { TabPane } = Tabs;

export default function FeedbackTabs() {
  return (
    <div>
      <Tabs type="card">
        <TabPane tab="All Feedbacks" key="1">
          <FeedbackList />
        </TabPane>
      </Tabs>
    </div>
  );
}
