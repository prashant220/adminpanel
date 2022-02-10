import React from "react";

import "./styles.css";
import { Tabs } from "antd";

import DonationList from "../donationlist/DonationList";
import DonationAdd from "../donationadd/DonationAdd";

const { TabPane } = Tabs;

export default function DonationTabs() {
  return (
    <div className="donationtabs__container">
      <Tabs type="card">
        <TabPane tab="List All Donations" key="1">
          <DonationList />
        </TabPane>
        <TabPane tab="Add New Donation" key="2">
          <DonationAdd />
        </TabPane>
      </Tabs>
    </div>
  );
}
