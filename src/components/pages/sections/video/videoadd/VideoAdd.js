import React, { useState, useEffect } from "react";

import { Form, Button, Input, Row, Col } from "antd";

import videoRequests from "../../../../../services/helpers/videoquery";

import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

function SentenceAdd(props) {
  const videoAddForm = React.createRef();

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleResetVideoAdding = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);

    let queryData = {
      contentUrl: e.contentUrl,
      caption: e.caption,
    };

    // console.log(queryData);
    videoRequests
      .addVideoUrl(queryData)
      .then((res) => {
        if (res.status === "success") {
          setData(res);
          setIsSuccessfull(true);
        } else {
          setError(res);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <>
      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error.message}
          {"  "}refresh to add again
        </p>
      )}
      {isSuccessfull ? (
        <>
          <h3>successfully added video !!!</h3>
          <Button onClick={handleResetVideoAdding} type="primary" size="large">
            Click to add another video
          </Button>
        </>
      ) : (
        <div>
          <Form layout="vertical" onFinish={handleSubmit} ref={videoAddForm}>
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
              <Button
                type="primary"
                block
                icon={<PlusOutlined />}
                htmlType="submit"
                loading={isLoading}
              >
                ADD VIDEO
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

// connect  redux  store
const mapStateToProps = (state) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(SentenceAdd));
