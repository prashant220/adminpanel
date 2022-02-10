import React, { useState, useEffect } from "react";

import {
  Drawer,
  Form,
  Button,
  Upload,
  Input,
  Row,
  Col,
  Tag,
  Select,
} from "antd";
import ReactAudioPlayer from "react-audio-player";

import { InboxOutlined } from "@ant-design/icons";

import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import sentenceRequests from "../../../services/helpers/sentencequery";

const { Dragger } = Upload;
const { Option } = Select;

function DrawerSentenceEdit(props) {
  const sentenceUpdateForm = React.createRef();

  const {
    sentenceDetails,
    drawerVisible,
    closeDrawer,
    sentenceCategories,
    identifier,
  } = props;

  let [formDataCategories, setFormDataCategories] = useState([]);

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  //
  let [sentenceImage, setSentenceImage] = useState(null);
  let [sentenceAudio, setSentenceAudio] = useState(null);

  let onClose = () => {
    closeDrawer(false);
    // refreshAllSentences();
    //refetch the details
  };

  useEffect(() => {
    formatSentenceCategoryData();
  }, []);

  useEffect(() => {
    sentenceDetails &&
      sentenceUpdateForm.current.setFieldsValue({
        sentenceInSambhota: sentenceDetails.sentenceInSambhota,
        sentenceInRoman: sentenceDetails.sentenceInRoman,
        sentenceInEnglish: sentenceDetails.sentenceInEnglish,
        sentenceInDevanagari: sentenceDetails.sentenceInDevanagari,
        sentenceCategoryName: sentenceDetails.sentenceCategoryName,
        sentenceInSherpaSambhota: sentenceDetails.text,
      });
  }, []);

  const formatSentenceCategoryData = () => {
    let x = [];
    sentenceCategories.list.map((item) => {
      return (x = [...x, { value: item }]);
    });
    // console.log(x);
    setFormDataCategories(x);
  };

  let handleEditSentenceSubmit = (e) => {
    // console.log(e);

    setIsLoading(true);

    let queryData = {
      identifier: identifier,

      sentenceInSambhota: e.sentenceInSambhota,
      sentenceInRoman: e.sentenceInRoman,
      text: e.sentenceInSherpaSambhota,

      sentenceInEnglish: e.sentenceInEnglish,
      sentenceInDevanagari: e.sentenceInDevanagari,

      sentenceCategoryName: e.sentenceCategoryName,

      image: sentenceImage,
      audio: sentenceAudio,
    };

    console.log(queryData);

    sentenceRequests
      .updateSentence(queryData)
      .then((res) => {
        setData(res);
        setIsSuccessfull(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const onImageChange = (e) => {
    if (!e) return;
    setSentenceImage(e.fileList[0].originFileObj);
  };
  const onAudioChange = (e) => {
    if (!e) return;
    setSentenceAudio(e.fileList[0].originFileObj);
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
    <div>
      <Drawer
        title="Edit Sentence"
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
        {error && <p>{error.message}</p>}
        {isSuccessfull ? (
          <p>Successfully updated the word</p>
        ) : (
          <Form
            layout="vertical"
            onFinish={handleEditSentenceSubmit}
            ref={sentenceUpdateForm}
          >
            {" "}
            <Row gutter={16}>
              <Col span={24}>
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

              <Col span={24}>
                <Form.Item
                  label="Sherpa (Roman)"
                  name="sentenceInRoman"
                  // extra="eg: ma paani piuchu"
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="" disabled={true} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Sherpa (Sambhota )"
                  name="sentenceInSherpaSambhota"
                  extra="eg. མཁན་པོ མཁན་པོ།མཁན་པོ།"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="English"
                  name="sentenceInEnglish"
                  extra="eg. i drink water"
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

              <Col span={24}>
                <Form.Item
                  label="Nepali"
                  name="sentenceInDevanagari"
                  extra="eg. म पानी पिउछु ।"
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

              <Col span={24}>
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
                    // defaultValue={listAllCategoriesQueryResult.data[0]}
                    style={{ width: "100%" }}
                    loading={!formDataCategories}
                    options={formDataCategories}
                    showSearch
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p className="drawersentencedetail__sentence-title">
                  Current Audio:
                </p>
                <br />
                <ReactAudioPlayer
                  src={sentenceDetails.sentenceAudioInSherpa}
                  autoPlay={false}
                  controls
                />
              </Col>

              <Col span={12}>
                <p>Select Audio:</p>
                <Dragger
                  multiple={false}
                  name="Audio"
                  onChange={onAudioChange}
                  customRequest={dummyRequest}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Support for a single file.</p>
                </Dragger>
              </Col>

              <Col span={12} style={{ margin: "60px 0px" }}>
                <p className="drawersentencedetail__sentence-title">
                  Current Image:
                </p>
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

              <Col span={12} style={{ margin: "60px 0px" }}>
                <p>Select Image:</p>
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
                  width={`100%`}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  // multiple={false}
                  //showUploadList={true}
                  //beforeUpload={beforeUpload}
                  onChange={onImageChange}
                  customRequest={dummyRequest}
                >
                  {uploadButton}
                </Upload>
              </Col>
            </Row>
            <Row gutter={12} style={{ margin: "20px 0px" }}></Row>
            <Form.Item>
              <Button
                type="primary"
                block
                // icon={<PlusOutlined />}
                htmlType="submit"
                loading={isLoading}
              >
                UPDATE SENTENCE
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
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

export default withRouter(connect(mapStateToProps)(DrawerSentenceEdit));
