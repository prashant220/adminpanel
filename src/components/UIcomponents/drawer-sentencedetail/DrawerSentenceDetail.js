import React, { useState, useEffect } from "react";

import "./styles.css";

import { Drawer, Row, Col } from "antd";
import ReactAudioPlayer from "react-audio-player";

export default function DrawerSentenceDetail(props) {
  const { sentenceDetails, drawerVisible, closeDrawer } = props;

  let onClose = () => {
    closeDrawer(false);
  };
  return (
    <div>
      <Drawer
        title="Sentence Detail"
        width={720}
        onClose={onClose}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          ></div>
        }
      >
        <Row>
          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">
                Sherpa (devanagiri):
              </p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.sentenceInSambhota}
              </p>
            </div>
          </Col>
          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">
                Sherpa (Roman):
              </p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.sentenceInRoman}
              </p>
            </div>
          </Col>
          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">
                Sherpa (Sambhota):
              </p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.text}
              </p>
            </div>
          </Col>

          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">Nepali :</p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.sentenceInDevanagari}
              </p>
            </div>
          </Col>

          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">English:</p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.sentenceInEnglish}
              </p>
            </div>
          </Col>
          <Col span={24}>
            <div className="drawersentencedetail__sentence-container">
              <p className="drawersentencedetail__sentence-title">
                Category Name:{" "}
              </p>
              <p className="drawersentencedetail__sentence-text">
                {sentenceDetails.sentenceCategoryName}
              </p>
            </div>
          </Col>

          <Col span={24}>
            <p className="drawersentencedetail__sentence-title">Audio:</p>
            <br />
            <ReactAudioPlayer
              src={sentenceDetails.sentenceAudioInSherpa}
              autoPlay={false}
              controls
            />
          </Col>

          <Col span={24}>
            <p className="drawersentencedetail__sentence-title">Image:</p>
            <br />
            {sentenceDetails.sentencePicture ? (
              <img
                src={sentenceDetails.sentencePicture}
                alt=""
                style={{
                  width: "50%",
                }}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
