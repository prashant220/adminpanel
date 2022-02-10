import React, { useState, useEffect } from "react";

import "./styles.css";

import { Row, Col, Spin, Pagination, Button, Modal, Form, Input } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import ReactPlayer from "react-player";

import videoRequests from "../../../../../services/helpers/videoquery";

import { useQuery } from "react-query";

function VideoList(props) {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let queryDatavideolist = {
    start: pagination.start,
    end: pagination.end,
  };

  const videoListCount = useQuery(["countTotalVideoUrl"], () =>
    videoRequests.countTotalVideoUrl()
  );

  const videolist = useQuery(["listVideoUrl", [queryDatavideolist]], () =>
    videoRequests.listVideoUrl(queryDatavideolist)
  );

  useEffect(() => {
    setPagination({
      ...pagination,
      total: videoListCount.data && videoListCount.data.value,
    });
  }, [videoListCount.data]);

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
    videoListCount.refetch();
    videolist.refetch();
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

      {videoListCount.data && (
        <div className="wordlist__wordcount">
          <p>Total Videos : {videoListCount.data.value}</p>
          <p>/</p>
          <p>Page: {pagination.currentPage}</p>
        </div>
      )}

      {videolist.isFetching && <Spin />}
      <Row gutter={[12, 12]}>
        {videolist.data &&
          videolist.data.itemListElement.length > 0 &&
          videolist.data.itemListElement.map((item) => {
            return (
              <Col span={8} key={item.identifier}>
                <PreviewForvideolist
                  videoInfo={item}
                  videolistQuery={videolist}
                />
              </Col>
            );
          })}
      </Row>
      <div style={{ margin: "10px" }}></div>
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={handlePagination}
      />
    </div>
  );
}

function PreviewForvideolist(props) {
  const { videoInfo, videolistQuery } = props;

  let [editVideoListItemModal, setEditVideoListItemModal] = useState(false);
  let [deleteVideoListItemModal, setDeleteVideoListItemModal] = useState(false);

  let closeEditVideoModal = () => {
    setEditVideoListItemModal(false);
  };
  let closeDeleteVideoModal = () => {
    setDeleteVideoListItemModal(false);
  };

  return (
    <div className="wordpreviewforvideolist__container">
      <div>
        <ReactPlayer url={videoInfo.contentUrl} width={"100%"} height={200} />
        <p className="wordpreviewforvideolist__video-title">
          {videoInfo.caption}
        </p>
      </div>
      <div className="wordpreviewforvideolist__actions">
        <Button
          danger
          size="small"
          onClick={() => setDeleteVideoListItemModal(true)}
        >
          delete
        </Button>
        {/* <Button
          className="mar-l-10"
          onClick={() => setEditVideoListItemModal(true)}
        >
          Edit
        </Button> */}

        {editVideoListItemModal && (
          <EditVideoListItemModal
            modalVisible={editVideoListItemModal}
            onClose={closeEditVideoModal}
            videoInfo={videoInfo}
            videolistQuery={videolistQuery}
          />
        )}
        {deleteVideoListItemModal && (
          <DeleteVideoListItemModal
            modalVisible={deleteVideoListItemModal}
            onClose={closeDeleteVideoModal}
            videoInfo={videoInfo}
            videolistQuery={videolistQuery}
          />
        )}
      </div>
    </div>
  );
}

function EditVideoListItemModal(props) {
  const videoEditForm = React.createRef();

  const { modalVisible, onClose, videoInfo, videolistQuery } = props;

  function showSuccessOp() {
    Modal.success({
      title: "Successfully Updated Video.",
    });
    onClose();
  }
  function showFailOp() {
    Modal.error({
      title: "Failed To Update Video",
    });
  }

  const handleAddVideoSubmit = (e) => {
    let queryData = {
      identifier: videoInfo.identifier,
    };

    console.log(queryData);
  };

  return (
    <Modal
      visible={modalVisible}
      title="Title"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <Form
        layout="vertical"
        onFinish={handleAddVideoSubmit}
        ref={videoEditForm}
      >
        {" "}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Video Url"
              name="contentUrl"
              extra=""
              rules={[
                {
                  required: true,
                  message: "Please fill  this field",
                },
              ]}
            >
              <Input placeholder="Video Url Here" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Video Caption"
              name="caption"
              extra=""
              rules={[
                {
                  required: true,
                  message: "Please fill  this field",
                },
              ]}
            >
              <Input placeholder="Video Captoion Here" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            UPDATE Video
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function DeleteVideoListItemModal(props) {
  const { modalVisible, onClose, videoInfo, videolistQuery } = props;

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted Video.",
    });
    onClose();
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete Video",
    });
  }
  function onConfirmDelete() {
    const queryData = {
      identifier: videoInfo.identifier,
    };
    videoRequests
      .deleteVideoUrl(queryData)
      .then((res) => {
        if (res.status === "success") {
          showSuccessDeleteOp();
          videolistQuery.refetch();
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
      title="Delete Video"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <p>Once deleted it cannot be restored.</p>
      <Button type="primary" size="large" danger onClick={onConfirmDelete}>
        DELETE VIDEO
      </Button>
    </Modal>
  );
}

export default VideoList;
