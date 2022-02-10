import React, { useState, useEffect } from "react";

import { Form, Button, Upload, Input, Row, Col, Select, Tag } from "antd";

import sentenceRequests from "../../../../../services/helpers/sentencequery";
import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { PlusOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;

function SentenceAdd(props) {
  const sentenceAddForm = React.createRef();

  const { sentenceCategories, preSelectedCategory } = props;

  let [formDataCategories, setFormDataCategories] = useState([]);

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleResetSentenceAdding = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };

  const handleAddSentenceSubmit = (e) => {
    // console.log(e);
    setIsLoading(true);

    let queryData = {
      sentenceInSambhota: e.sentenceInSambhota,
      sentenceInRoman: e.sentenceInRoman,
      text: e.sentenceInSherpaSambhota,

      sentenceInEnglish: e.sentenceInEnglish,
      sentenceInDevanagari: e.sentenceInDevanagari,

      sentenceCategoryName: preSelectedCategory
        ? preSelectedCategory
        : e.sentenceCategoryName,

      image: e.image && e.image.fileList[0].originFileObj,
      audio: e.audio && e.audio.fileList[0].originFileObj,
    };

    // console.log(queryData);
    sentenceRequests
      .addSentence(queryData)
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

  useEffect(() => {
    sentenceCategories.list && formatSentenceCategoryData();
  }, []);

  const formatSentenceCategoryData = () => {
    let x = [];
    sentenceCategories.list.map((item) => {
      return (x = [...x, { value: item }]);
    });
    // console.log(x);
    setFormDataCategories(x);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {isSuccessfull ? (
        <>
          <h3>successfully added sentence !!!</h3>
          <Button
            onClick={handleResetSentenceAdding}
            type="primary"
            size="large"
          >
            Click to add another sentence
          </Button>
        </>
      ) : (
        <div>
          <Form
            layout="vertical"
            onFinish={handleAddSentenceSubmit}
          // ref={sentenceAddForm}
          >
            {" "}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Sherpa (Devanagiri)"
                  name="sentenceInSambhota"
                  extra="eg: दुन्ठाक चीक्की ङीमातीवा"
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Sherpa (Roman)"
                  name="sentenceInRoman"
                  extra="eg. tiwa"
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Sherpa (Sambhota )"
                  name="sentenceInSherpaSambhota"
                  extra="eg. མཁན་པོ མཁན་པོ།མཁན་པོ།"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="English"
                  name="sentenceInEnglish"
                  extra="eg. Months"
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nepali"
                  name="sentenceInDevanagari"
                  extra="eg: महिनाहरू"
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>

              <Col span={12}>
                {preSelectedCategory ? (
                  <>
                    <p>Selected Category :</p>
                    <p>{preSelectedCategory}</p>
                  </>
                ) : (
                  <Form.Item
                    label="Category"
                    name="sentenceCategoryName"
                    rules={[
                      {
                        required: true,
                        message: "Please fill  this field",
                      },
                    ]}
                  >
                    <Select
                      // mode="multiple"
                      showArrow
                      tagRender={tagRender}
                      style={{ width: "100%" }}
                      loading={!formDataCategories}
                      options={formDataCategories}
                      showSearch
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Select Audio File" name="audio">
                  <Dragger
                    multiple={false}
                    name="Image"
                    customRequest={dummyRequest}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p>Click to add audio</p>
                    {/* <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p> */}
                    {/* <p className="ant-upload-hint">
                      Support for a single file.
                    </p> */}
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Select Image File" name="image">
                  {/* <Dragger multiple="false" name="image">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single file.
                    </p>
                  </Dragger> */}
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    // multiple={false}
                    //showUploadList={true}
                    //beforeUpload={beforeUpload}
                    //onChange={handleChange}
                    customRequest={dummyRequest}
                  >
                    {uploadButton}
                  </Upload>
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
                ADD SENTENCE
              </Button>
            </Form.Item>
          </Form>

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
        </div>
      )}
    </>
  );
}

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag
      color="green"
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

// connect  redux  store
const mapStateToProps = (state) => {
  return {
    sentenceCategories: state.sentence.categories.data,
  };
};

export default withRouter(connect(mapStateToProps)(SentenceAdd));
