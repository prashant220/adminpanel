import React from "react";

import "./styles.css";
import LogoLight from "../../../images/logo_light.png";

import { Row, Col, Button } from "antd";

import { Link, Route, withRouter } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import { logOut } from "../../../store/features/auth/authActions";
import { WelcomePage } from "../sections/welcome/welcomepage/WelcomePage";

import WordTabs from "../sections/word/wordtabs/WordTabs";
import SentenceTabs from "../sections/sentence/sentencetabs/SentenceTabs";
import TransliterationTabs from "../sections/transliteration/transliterationtabs/TransliterationTabs.js";
import ArticleTabs from "../sections/article/articletabs/ArticleTabs";
import VideoTabs from "../sections/video/videotabs/VideoTabs";

import NavMain from "../../UIcomponents/navmain/NavMain";
import DonationTabs from "../sections/donation/donationtabs/DonationTabs";
import FeedbackTabs from "../sections/feedback/feedbacktabs/FeedbackTabs";
import Tag from "../../../Tags/Tag";
import LiistUsers from "../ListUsers/LiistUsers";

function Dashboard(props) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut(props.history));
  };
  return (
    <div>
      <Row>
        <Col span={4}>
          <div className="dashboard__layout__left-container">
            <div className="dashboard__layout__left-logo">
              <Link to="/">
                <img src={LogoLight} />
              </Link>
            </div>

            <NavMain />

            {/* sitename */}
          </div>
        </Col>

        <Col span={20}>
          <Row>
            <Col span={24}>
              <div className="dashboard__layout__top-header">
                <Button onClick={handleLogOut} type="danger">
                  LOG OUT
                </Button>
              </div>
            </Col>
          </Row>

          <div className="dashboard__layout__right-container">
            <div className="dashboard__layout__right-container-content">
              {/* All Routes for pages */}
              <Route exact path="/" component={() => <WelcomePage />} />
              <Route exact path="/word" component={() => <WordTabs />} />
              <Route exact path="/tags" component={() => <Tag />} />
              <Route
                exact
                path="/sentence"
                component={() => <SentenceTabs />}
              />
              {/* <Route
                exact
                path="/transliteration"
                component={() => <TransliterationTabs />}
              /> */}
              <Route exact path="/video" component={() => <VideoTabs />} />
              <Route exact path="/article" component={() => <ArticleTabs />} />
              <Route
                exact
                path="/feedbacks"
                component={() => <FeedbackTabs />}
              />
              <Route
                exact
                path="/donations"
                component={() => <DonationTabs />}
              />
                  <Route
                exact
                path="/listusers"
                component={() => <LiistUsers />}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
