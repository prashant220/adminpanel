import React, { useState, useEffect } from "react";

import "./styles.css";

import { useDispatch, connect } from "react-redux";
import { Row, Col, Card, Button, Modal } from "antd";
import {
  DrawerSentenceDetail,
  DrawerSentenceEdit,
} from "../../UIcomponents/index";

import { listSentenceByCategory } from "../../../store/features/sentence/sentenceActions";

import sentenceRequests from "../../../services/helpers/sentencequery";

export default function SentencePreview(props) {
  const dispatch = useDispatch();

  const { sentenceID, refreshAllSentences } = props;

  let [sentenceDetails, setSentenceDetails] = useState({
    isLoading: true,

    isFailed: false,
    error: null,

    isSuccess: false,
    data: null,
  });

  let [deleteSentenceModalVisible, setDeleteSentenceModalVisible] =
    useState(false);

  let [viewDetailsdrawerVisible, setViewDetailsDrawerVisible] = useState(false);
  let [editSentencedrawerVisible, setEditSentencedrawerVisible] =
    useState(false);

  useEffect(() => {
    fetchDetailsOfSentence();
  }, []);

  let closeDeleteSentenceModal = () => {
    setDeleteSentenceModalVisible(false);
  };

  let fetchDetailsOfSentence = () => {
    let queryData = {
      identifier: sentenceID,
    };
    sentenceRequests
      .getDetailsOfSentence(queryData)
      .then((res) => {
        if (res) {
          // console.log(res);
          setSentenceDetails({
            ...sentenceDetails,
            isSuccess: true,
            data: res,

            isLoading: false,
          });
        }
      })
      .catch((err) => {
        setSentenceDetails({
          ...sentenceDetails,
          isFailed: true,
          error: err,

          isLoading: false,
        });
      });
  };

  return (
    <div>
      {sentenceDetails.isLoading && <p>LOADING...</p>}

      {sentenceDetails.isSuccess && sentenceDetails.data && (
        <>
          <div className="sentencepreview__container">
            <div className="sentencepreview__text">
              {sentenceDetails.data.sentenceInDevanagari}
            </div>
            <div className="sentencepreview__action">
              <Button
                type="dashed"
                size="small"
                onClick={() => setViewDetailsDrawerVisible(true)}
              >
                Details
              </Button>
              <Button
                className="mar-l-10"
                type="primary"
                size="small"
                onClick={() => setEditSentencedrawerVisible(true)}
              >
                Edit{" "}
              </Button>

              <Button
                type="dashed"
                size="small"
                danger
                className="mar-l-10"
                onClick={() => setDeleteSentenceModalVisible(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          {viewDetailsdrawerVisible && (
            <DrawerSentenceDetail
              drawerVisible={viewDetailsdrawerVisible}
              closeDrawer={setViewDetailsDrawerVisible}
              sentenceDetails={sentenceDetails.data}
              identifier={sentenceID}
            />
          )}
          {editSentencedrawerVisible && (
            <DrawerSentenceEdit
              drawerVisible={editSentencedrawerVisible}
              closeDrawer={setEditSentencedrawerVisible}
              sentenceDetails={sentenceDetails.data}
              identifier={sentenceID}
              refreshAllSentences={refreshAllSentences}
            />
          )}
          {deleteSentenceModalVisible && (
            <DeleteSentenceModal
              modalVisible={deleteSentenceModalVisible}
              onClose={closeDeleteSentenceModal}
              identifier={sentenceID}
              refreshAllSentences={refreshAllSentences}
            />
          )}
        </>
      )}
    </div>
  );
}

function DeleteSentenceModal(props) {
  const dispatch = useDispatch();

  const { modalVisible, onClose, identifier, refreshAllSentences } = props;

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted.",
    });
    onClose();
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete",
    });
  }
  function onConfirmDelete() {
    const queryData = {
      identifier: identifier,
    };

    sentenceRequests
      .deleteSentence(queryData)
      .then((res) => {
        if (res.status === "success") {
          showSuccessDeleteOp();
          refreshAllSentences();
        } else {
          showFailDeleteOp();
          //  failed
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      visible={modalVisible}
      title="Delete Sentence"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <p>Once deleted it cannot be restored.</p>
      <Button type="primary" size="large" danger onClick={onConfirmDelete}>
        DELETE SENTENCE
      </Button>
    </Modal>
  );
}
