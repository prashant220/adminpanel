import React, { useState, useEffect } from "react";
import "./styles.css";

import { withRouter } from "react-router-dom";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
const { SubMenu } = Menu;

function NavMain(props) {
  let [mainMenuSelectedItem, setmainMenuSelectedItem] = useState("1");
  // console.log(props);
  // const linkUrl = props.location.pathname;

  let updateMenuBasedOnRoute = () => {
    let pathValues = {
      "/": "1",
      "/word": "2",
      "/sentence": "3",
      "/transliteration": "4",
      "/video": "5",
      "/article": "6",
      "/feedbacks": "7",
      "/donations": "8",
      "/listusers":"9"
    };
    let currentPath = props.location.pathname;

    for (const [key, value] of Object.entries(pathValues)) {
      //console.log(currentPath, key)
      if (currentPath === key) {
        setmainMenuSelectedItem(value);
      } else {
        //console.log("milena")
      }
    }
  };

  useEffect(() => {
    updateMenuBasedOnRoute();
  }, [props.location.pathname]);

  return (
    <div className="navmain__container">
      <Menu
        style={{
          margin: "20px 0px 0px 0px",
        }}
        // defaultSelectedKeys={["1"]}
        selectedKeys={mainMenuSelectedItem}
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to="/" />
          Dashboard
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/word" />
          Word
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/sentence" />
          Sentence
        </Menu.Item>

        {/* <Menu.Item key="4">
          <Link to="/transliteration" />
          Transliteration
        </Menu.Item> */}

        <Menu.Item key="5">
          <Link to="/video" />
          Video
        </Menu.Item>

        <Menu.Item key="6">
          <Link to="/article" />
          Article
        </Menu.Item>

        <Menu.Item key="7">
          <Link to="/feedbacks" />
          Feedbacks
        </Menu.Item>

        <Menu.Item key="8">
          <Link to="/donations" />
          Donations
        </Menu.Item>
        <Menu.Item key="9">
          <Link to="/listusers" />
          List Users
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(NavMain);
