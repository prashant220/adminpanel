import React, { useState, useEffect } from "react";

import "./styles.css";

import { DrawerWordDetail } from "../index";
import { useDispatch, connect } from "react-redux";
import { getWordDetail } from "../../../store/features/word/wordActions";
import { Row, Col, Card, Button, Modal, success } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import wordRequests from "../../../services/helpers/wordquery";

const { confirm } = Modal;

export default function WordPreview(props) {
  const dispatch = useDispatch();
  const { wordInfo, refetchDataOnMutation } = props;

  let [wordDetailDrawerlVisible, setWordDetailDrawerVisible] = useState(false);

  let reFetchDataOnUpdation = () => {
    dispatch(getWordDetail(wordInfo.identifier));
  };

  // console.log(wordInfo);

  // deletion operation methods and popups

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted Word.",
    });
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete Word",
    });
  }
  function showConfirmDeleteWord() {
    const queryData = {
      identifier: wordInfo.identifier,
    };
    confirm({
      title: "Are you sure you want to delete this Word?",
      icon: <ExclamationCircleOutlined />,
      content: "Once deleted , it cannot be reverted",
      okText: "Delete Word",
      onOk() {
        console.log("OK");
        //send the delete request

        wordRequests
          .deleteSherpaWord(queryData)
          .then((res) => {
            if (res.status === "success") {
              showSuccessDeleteOp();
              refetchDataOnMutation();
              // successDelete();
            } else {
              showFailDeleteOp();
              //  failed
            }
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <>
      {wordInfo.wordDetail && (
        <div className="wordpreview__container">
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title={wordInfo.wordDetail.wordEntryInDevanagariSherpa}
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => setWordDetailDrawerVisible(true)}
                >
                  View / Edit{" "}
                </Button>
                <Button
                  type="dashed"
                  danger
                  className="mar-l-10"
                  onClick={showConfirmDeleteWord}
                >
                  Delete
                </Button>
              </>
            }
          >
            <Row>
              <Col span={6}>
                <b>Nepali (Devanagiri):</b>
                <p>{wordInfo.wordDetail.wordEntryInDevanagari}</p>
              </Col>
              <Col span={6}>
                <b>Nepali (Roman):</b>
                <p>{wordInfo.wordDetail.wordEntryInRoman}</p>
              </Col>
              <Col span={6}>
                <b>English:</b>
                <p>{wordInfo.wordDetail.wordEntryInEnglish}</p>
              </Col>

              <Col span={6}>
                <b>Sherpa (Devanagiri):</b>
                <p>{wordInfo.wordDetail.wordEntryInDevanagariSherpa}</p>
              </Col>

              <Col span={6}>
                <b>Sherpa (Romanized):</b>
                <p>{wordInfo.wordDetail.wordEntryInRomanizedSherpa}</p>
              </Col>

              <Col span={6}>
                <b>Sherpa ( Sambhota ):</b>
                <p>{wordInfo.wordDetail.sambhotaSherpaScript}</p>
              </Col>
            </Row>
          </Card>

          {wordDetailDrawerlVisible && wordInfo && (
            <DrawerWordDetail
              wordInfo={wordInfo}
              wordDetailDrawerlVisible={wordDetailDrawerlVisible}
              setWordDetailDrawerVisible={setWordDetailDrawerVisible}
              reFetchDataOnMutation={reFetchDataOnUpdation}
            />
          )}
        </div>
      )}
    </>
  );
}
