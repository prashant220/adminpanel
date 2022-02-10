import React, { useState, useEffect } from "react";

import { Form, Button, Input, Row, Col } from "antd";

import articleRequests from "../../../../../services/helpers/articlequery";

import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

function ArticleAdd(props) {
  const articleAddForm = React.createRef();

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleResetArticleAdding = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };

  const handleAddArticleSubmit = (e) => {
    setIsLoading(true);

    let queryData = {
      articleSection: e.contentUrl,
      articleBody: e.description,
    };

    // console.log(queryData);
    articleRequests
      .addNewsArticle(queryData)
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
          <h3>successfully added article !!!</h3>
          <Button
            onClick={handleResetArticleAdding}
            type="primary"
            size="large"
          >
            Click to add another article
          </Button>
        </>
      ) : (
        <div>
          <Form
            layout="vertical"
            onFinish={handleAddArticleSubmit}
            ref={articleAddForm}
          >
            {" "}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="article Url"
                  name="contentUrl"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="article Url Here" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="article Description"
                  name="description"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="article Captoion Here" />
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
                ADD ARTICLE
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

export default withRouter(connect(mapStateToProps)(ArticleAdd));
