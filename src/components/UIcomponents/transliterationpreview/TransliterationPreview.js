import React, { useState, useEffect } from "react";

import "./styles.css";

import { useDispatch, connect } from "react-redux";
import { Row, Col, Card, Button, Modal } from "antd";

import {
  getTransliterateDetail,
  searchTransliterateKeyword,
} from "../../../store/features/transliterate/transliterateActions";

import { DrawerTransliterateEdit } from "../index";

import transliterationRequests from "../../../services/helpers/transliterationquery";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export default function TransliterationPreview(props) {
  const { transliterateInfo, searchKeyword } = props;
  const dispatch = useDispatch();

  let [viewDetailsDrawerVisible, setViewDetailsDrawerVisible] = useState(false);
  let [editDrawerVisible, setEditDrawerVisible] = useState(false);

  let fetchDetails = () => {
    if (transliterateInfo.identifier) {
      dispatch(getTransliterateDetail(transliterateInfo.identifier));
    }
  };

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted.",
    });
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete",
    });
  }

  function showConfirmDelete() {
    const queryData = {
      identifier: transliterateInfo.identifier,
    };
    confirm({
      title: "Are you sure you want to delete this transliteration?",
      icon: <ExclamationCircleOutlined />,
      content: "Once deleted , it cannot be reverted",
      okText: "Delete Transliteration",
      onOk() {
        console.log("OK");
        //send the delete request

        transliterationRequests
          .deleteTransliteration(queryData)
          .then((res) => {
            if (res.status === "success") {
              showSuccessDeleteOp();
            } else {
              showFailDeleteOp();
              //  failed
            }
            dispatch(searchTransliterateKeyword(searchKeyword));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <div>
      <>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          hoverable
          title={transliterateInfo.wordEntry}
          extra={
            <>
              {/* <Button
                type="primary"
                onClick={() => setViewDetailsDrawerVisible(true)}
              >
                View Details
              </Button> */}
              <Button
                className="mar-l-10"
                type="primary"
                onClick={() => setEditDrawerVisible(true)}
              >
                Edit{" "}
              </Button>
              <Button
                type="dashed"
                danger
                className="mar-l-10"
                onClick={showConfirmDelete}
              >
                Delete
              </Button>
            </>
          }
        >
          <>
            <Row>
              <Col span={8}>
                <b> Roman</b>
                <p>
                  {transliterateInfo.transliterateDetail &&
                    transliterateInfo.transliterateDetail
                      .transliterationInRoman}
                </p>
              </Col>
              <Col span={8}>
                <b> Devanagiri</b>
                <p>
                  {transliterateInfo.transliterateDetail &&
                    transliterateInfo.transliterateDetail
                      .transliterationInDevanagari}
                </p>
              </Col>
              <Col span={8}>
                <b> Sambhota</b>
                <p>
                  {transliterateInfo.transliterateDetail &&
                    transliterateInfo.transliterateDetail
                      .transliterationInSambhota}
                </p>
              </Col>
            </Row>
          </>
        </Card>

        {/* {viewDetailsDrawerVisible && (
            <DrawerSentenceDetail
              drawerVisible={viewDetailsDrawerVisible}
              closeDrawer={setViewDetailsDrawerVisible}
              transliterateInfo={transliterateInfo}
            />
          )} */}
        {editDrawerVisible && (
          <DrawerTransliterateEdit
            drawerVisible={editDrawerVisible}
            closeDrawer={setEditDrawerVisible}
            transliterateInfo={transliterateInfo}
            fetchDetails={fetchDetails}
          />
        )}
      </>
    </div>
  );
}
