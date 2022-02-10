import React from "react";
import "./styles.css";

import { Modal, Row, Col } from "antd";

import { Player } from "../index";
import { Link } from "react-router-dom";

import VariationPreview from "../variationpreview/VariationPreview";

export default function WordPreviewModal(props) {
  const { modalVisible, onOk, onCancel, wordInfo } = props;
  return (
    <div>
      <Modal
        visible={modalVisible}
        title={`${wordInfo.wordEntryInDevanagariSherpa}`}
        onOk={onOk}
        onCancel={onCancel}
        footer={[]}
        width={`80%`}
      >
        <>
          {wordInfo && (
            <div className={`wordpreviewmodal__container`}>
              <Row>
                <Col span={24}>
                  <div className="wordpreviewmodal__title-row">
                    <p className="wordpreviewmodal__title">
                      {wordInfo.wordEntryInDevanagariSherpa}
                    </p>
                    <span className="wordpreviewmodal__pos">
                      [
                      {wordInfo.pos &&
                        wordInfo.pos.itemListElement.length > 0 &&
                        wordInfo.pos.itemListElement.map((item) => (
                          <span key={item}>{item} </span>
                        ))}
                      ]
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 18 }}
                  xl={{ span: 18 }}
                  xxl={{ span: 18 }}
                  className="wordpreviewmodal__details__left"
                >
                  {/* <div className="wordpreviewmodal__details_definition">
                <span className="wordpreviewmodal__details_definition-title">
                  Meaning:
                </span>
                <span className="wordpreviewmodal__details_definition-text">
                  {wordInfo.wordMeaningInDevanagari
                    ? wordInfo.wordMeaningInDevanagari
                    : "N/A"}
                </span>
              </div> */}

                  <div className="wordpreviewmodal__details__translations">
                    {/* <p className="wordpreviewmodal__details__translations-title">
                  translations
                </p> */}

                    <div className="wordpreviewmodal__details__translation-row">
                      <span className="wordpreviewmodal__details__translation-row-title">
                        Sherpa:
                      </span>
                      <div className="wordpreviewmodal__details__translation-row-detail">
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          {wordInfo.wordEntryInRomanizedSherpa && (
                            <p className="wordpreviewmodal__detail-meaning-hl">
                              {wordInfo.wordEntryInRomanizedSherpa}{" "}
                            </p>
                          )}
                          {wordInfo.wordEntryInDevanagariSherpa && (
                            <p className="wordpreviewmodal__detail-meaning-hl">
                              {wordInfo.wordEntryInDevanagariSherpa}
                            </p>
                          )}
                          {wordInfo.sambhotaSherpaScript && (
                            <p className="wordpreviewmodal__detail-meaning-hl">
                              {wordInfo.sambhotaSherpaScript}
                            </p>
                          )}
                          {wordInfo.ipa && (
                            <p className="wordpreviewmodal__detail-meaning-hl">
                              / {wordInfo.ipa} /
                            </p>
                          )}

                          <span className="wordpreviewmodal__play-icon">
                            {wordInfo.wordAudioInSambhota ? (
                              <Player url={wordInfo.wordAudioInSambhota} />
                            ) : (
                              <Player passive={true} />
                            )}
                          </span>
                        </p>
                        {/* <div>
                      <span className="color-maroon">meaning :</span>{" "}
                      {wordInfo.wordMeaningInDevanagari
                        ? wordInfo.wordMeaningInDevanagari
                        : "N/A"}
                    </div> */}

                        <div className="flex-row">
                          <span className="color-maroon">Variations :</span>{" "}
                          <div className="mar-l-10 flex-col">
                            {wordInfo.variationInSambhota &&
                            wordInfo.variationInSambhota.itemListElement
                              .length > 0
                              ? wordInfo.variationInSambhota.itemListElement.map(
                                  (item) => (
                                    <VariationPreview
                                      variationKeyword={item}
                                      key={item}
                                    />
                                  )
                                )
                              : "N/A"}
                          </div>
                        </div>
                        <div className="flex-row">
                          <span className="color-maroon">Honorific :</span>{" "}
                          <div className="mar-l-10 flex-col">
                            {wordInfo.exampleUsage &&
                            wordInfo.exampleUsage.itemListElement.length > 0
                              ? wordInfo.exampleUsage.itemListElement.map(
                                  (item) => (
                                    <VariationPreview
                                      variationKeyword={item}
                                      key={item}
                                    />
                                  )
                                )
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  */}
                    <div className="wordpreviewmodal__details_definition">
                      <span className="wordpreviewmodal__details_definition-title color-maroon">
                        Meaning:
                      </span>
                      <span className="wordpreviewmodal__details_definition-text">
                        {wordInfo.wordMeaningInDevanagari
                          ? wordInfo.wordMeaningInDevanagari
                          : "N/A"}
                      </span>
                    </div>

                    {/* <div className="wordpreviewmodal__details__translations-details"> */}
                    <div className="wordpreviewmodal__details__translation-row">
                      <span className="wordpreviewmodal__details__translation-row-title">
                        English:
                      </span>
                      <span className="wordpreviewmodal__details__translation-row-detail">
                        <p className="wordpreviewmodal__detail-meaning-hl">
                          {wordInfo.wordEntryInEnglish
                            ? wordInfo.wordEntryInEnglish
                            : "N/A"}
                        </p>
                      </span>
                    </div>

                    <div className="wordpreviewmodal__details__translation-row">
                      <span className="wordpreviewmodal__details__translation-row-title">
                        Nepali:
                      </span>
                      <span className="wordpreviewmodal__details__translation-row-detail">
                        <p className="wordpreviewmodal__detail-meaning-hl">
                          {wordInfo.wordEntryInDevanagari
                            ? wordInfo.wordEntryInDevanagari
                            : "N/A"}
                        </p>
                      </span>
                    </div>

                    {
                      wordInfo.pos &&
                      wordInfo.pos.itemListElement.length > 0 &&
                      wordInfo.pos.itemListElement.map(
                          (item) => {

                            if(item === "verb"){ 
                              //this item is verb and render this
                              return (
                              <div className="wordpreviewmodal__details__translation-rowx">
                                <span className="wordpreviewmodal__details__translation-row-title">
                                  Verb Form
                                </span>
                                <div className="wordpreviewmodal__details__translation-row-detail">
                                  <p className="wordpreview__detail-meaning-hl-">
                                  {
                                    wordInfo.definition &&
                                    wordInfo.definition.itemListElement.length > 0 ?
                                    wordInfo.definition.itemListElement.map(item => {return (<p>{item}</p>)})
                                      : "N/A"
                                  }
                                  </p>
                                </div>
                              </div>)
                            }
                          }
                        )
                    }
                    {/*  */}
                    {/* end   */}
                    {/* </div> */}
                  </div>
                </Col>

                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 6 }}
                  xl={{ span: 6 }}
                  xxl={{ span: 6 }}
                >
                  <div className="wordpreviewmodal__details__rightimg">
                    {wordInfo.wordPicture ? (
                      <img src={wordInfo.wordPicture} />
                    ) : null}
                  </div>
                </Col>
              </Row>

              <div>
                <Row>
                  <Col span={24}></Col>
                </Row>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
}
