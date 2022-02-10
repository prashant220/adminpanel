import React, { useState, useEffect } from "react";

import "./styles.css";

import { Row, Col, Card, Pagination, Button, Spin, Modal } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import feedbackRequests from "../../../../../services/helpers/feedbackquery";

import { useQuery } from "react-query";
import { formatCountdown } from "antd/lib/statistic/utils";

function FeedbackList(props) {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let queryFeedbackList = {
    pagination: pagination,
  };

  const feedbackListCount = useQuery(["countUserComments"], () =>
    feedbackRequests.countUserComments()
  );

  const feedbackList = useQuery(["listUserComments", [queryFeedbackList]], () =>
    feedbackRequests.listUserComments(queryFeedbackList)
  );

  useEffect(() => {
    setPagination({
      ...pagination,
      total: feedbackListCount.data && feedbackListCount.data.value,
    });
  }, [feedbackListCount.data]);

  const handlePagination = (pageNumber) => {
    //newpagination values
    let ps = pageNumber * pagination.pageSize - pagination.pageSize;
    let pe = pageNumber * pagination.pageSize;
    setPagination({
      ...pagination,
      start: ps,
      end: pe,
      currentPage: pageNumber,
    });
  };

  const refreshAllData = () => {
    feedbackListCount.refetch();
    feedbackList.refetch();
  };

  return (
    <div className="videolist__container">
      <div className="refresh_button_container">
        <Button
          type="primary"
          icon={<RedoOutlined />}
          size="large"
          onClick={refreshAllData}
        >
          Refresh
        </Button>
      </div>

      {feedbackListCount.data && (
        <div className="wordlist__wordcount">
          <p>Total Feedbacks : {feedbackListCount.data.value}</p>
          <p>/</p>
          <p>Page: {pagination.currentPage}</p>
        </div>
      )}
      {feedbackList.isFetching && (
        <div>
          <Spin />
        </div>
      )}
      <Row>
        {feedbackList.data &&
          feedbackList.data.itemListElement.length > 0 &&
          feedbackList.data.itemListElement.map((item) => {
            return (
              <Col span={24} key={item.identifier}>
                <PreviewForFeedbacklist
                  feedbackInfo={item}
                  feedbackListQuery={feedbackList}
                />
              </Col>
            );
          })}

        <Pagination
          defaultCurrent={pagination.page}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onChange={handlePagination}
        />
      </Row>
    </div>
  );
}

function PreviewForFeedbacklist(props) {
  const { feedbackInfo, feedbackListQuery } = props;

  let [deleteFeedbackListItemModal, setDeleteFeedbackListItemModal] =
    useState(false);

  let closeDeleteFeedbackModal = () => {
    setDeleteFeedbackListItemModal(false);
  };

  return (
    <div className="previewforfeedbacklist__container">
      <Card>
        <div>
          <div className="previewfeedback__container">
            <p className="previewfeedback__description">
              {feedbackInfo.description}
            </p>
            <p>
              <span className="previewfeedback__name">{feedbackInfo.name}</span>{" "}
              <br />
              <span className="previewfeedback__person_info">
                {feedbackInfo.educationalUse}
              </span>
              <br />
              <span className="previewfeedback__person_info">
                {feedbackInfo.alternateName}
              </span>
            </p>
            {/* <p>
              <b>Email: </b>
              {feedbackInfo.educationalUse}
            </p>
            <p>
              <b>Address: </b>
              {feedbackInfo.alternateName}
            </p> */}

            <p className="previewfeedback__detail-1">
              {/* <b>Submitted On: </b> */}
              <span className="previewfeedback__type">
                {feedbackInfo.learningResourceType}
              </span>
            </p>
            <p className="previewfeedback__detail-1">
              {/* <b>Entry Name: </b> */}
              <span className="previewfeedback__type_name">
                {feedbackInfo.text}
              </span>
            </p>
            <p className="previewfeedback__detail-1">
              <b>Submitted On: </b>
              {feedbackInfo.dateCreated}{" "}
            </p>
          </div>
          <Button
            danger
            size="small"
            onClick={() => setDeleteFeedbackListItemModal(true)}
          >
            Delete
          </Button>
        </div>
        {deleteFeedbackListItemModal && (
          <DeleteFeedbackListItemModal
            modalVisible={deleteFeedbackListItemModal}
            onClose={closeDeleteFeedbackModal}
            feedbackInfo={feedbackInfo}
            feedbackListQuery={feedbackListQuery}
          />
        )}
      </Card>
    </div>
  );
}

function DeleteFeedbackListItemModal(props) {
  const { modalVisible, onClose, feedbackInfo, feedbackListQuery } = props;

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted Feedback.",
    });
    onClose();
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete Feedback",
    });
  }
  function onConfirmDelete() {
    const queryData = {
      identifier: feedbackInfo.identifier,
    };

    feedbackRequests
      .deleteComment(queryData)
      .then((res) => {
        if (res.status === "success") {
          showSuccessDeleteOp();
          feedbackListQuery.refetch();
          // successDelete();
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
      title="Delete Feedback"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <p>Once deleted it cannot be restored.</p>
      <Button type="primary" size="large" danger onClick={onConfirmDelete}>
        DELETE FEEDBACK
      </Button>
    </Modal>
  );
}

export default FeedbackList;
