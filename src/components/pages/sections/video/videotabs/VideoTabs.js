import React from "react";

import "./styles.css";
import { Tabs } from "antd";

import VideoList from "../videolist/VideoList";
import VideoAdd from "../videoadd/VideoAdd";

const { TabPane } = Tabs;

export default function VideoTabs() {
  return (
    <div className="videotabs__container">
      <Tabs type="card">
        <TabPane tab="Add Video" key="1">
          <VideoAdd />
        </TabPane>
        <TabPane tab="List All Video" key="2">
          <VideoList />
        </TabPane>
      </Tabs>
    </div>
  );
}
