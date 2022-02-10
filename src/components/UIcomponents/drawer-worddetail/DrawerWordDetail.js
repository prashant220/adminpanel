import React, { useState, useEffect } from "react";

import {
  Drawer,
  Form,
  Button,
  Upload,
  Input,
  Row,
  Col,
  Space,
  Select,
  Modal,
} from "antd";

import {
  MinusCircleOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import wordRequests from "../../../services/helpers/wordquery";
import variationRequests from "../../../services/helpers/variationquery";

import ReactAudioPlayer from "react-audio-player";

const { Dragger } = Upload;
const { Option } = Select;

export default function DrawerWordDetail(props) {
  const wordUpdateForm = React.createRef();
  const {
    wordDetailDrawerlVisible,
    wordInfo,
    setWordDetailDrawerVisible,
    reFetchDataOnMutation,
  } = props;

  let [editEnabled, setEditEnabled] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  //
  let [wordImage, setWordImage] = useState(null);
  let [wordAudio, setWordAudio] = useState(null);

  //
  // variation and honorific list
  let [newVariationList, setNewVariationList] = useState(null);
  let [newHonorificList, setNewHonorificList] = useState(null);
  //

  useEffect(() => {
    if (
      wordInfo.wordDetail.variationInSambhota &&
      wordInfo.wordDetail.variationInSambhota.itemListElement
    ) {
      setNewVariationList(
        wordInfo.wordDetail.variationInSambhota.itemListElement
      );
    } else {
      setNewVariationList([]);
    }
  }, [wordInfo.wordDetail]);

  useEffect(() => {
    if (
      wordInfo.wordDetail.exampleUsage &&
      wordInfo.wordDetail.exampleUsage.itemListElement
    ) {
      setNewHonorificList(wordInfo.wordDetail.exampleUsage.itemListElement);
    } else {
      setNewHonorificList([]);
    }
  }, [wordInfo.wordDetail]);

  // set form with values from  props
  useEffect(() => {
    console.log(wordInfo);
    let t_pos =
      wordInfo.wordDetail.pos && wordInfo.wordDetail.pos.itemListElement[0];
    let t_mapTier =
      wordInfo.wordDetail.mapTier &&
      wordInfo.wordDetail.mapTier.itemListElement[0];

    wordInfo &&
      wordUpdateForm.current.setFieldsValue({
        wordEntryInDevanagariSherpa:
          wordInfo.wordDetail.wordEntryInDevanagariSherpa,
        wordEntryInRoman: wordInfo.wordDetail.wordEntryInRoman,
        wordEntryInEnglish: wordInfo.wordDetail.wordEntryInEnglish,
        wordEntryInRomanizedSherpa:
          wordInfo.wordDetail.wordEntryInRomanizedSherpa,
        wordEntryInDevanagari: wordInfo.wordDetail.wordEntryInDevanagari,
        sambhotaSherpaScript: wordInfo.wordDetail.sambhotaSherpaScript,
        wordMeaningInDevanagari: wordInfo.wordDetail.wordMeaningInDevanagari,

        ipa: wordInfo.wordDetail.ipa,

        variationInSambhota:
          wordInfo.wordDetail.variationInSambhota &&
          wordInfo.wordDetail.variationInSambhota.itemListElement,

        pos: t_pos,

        verbForm: wordInfo.wordDetail.definition &&
          wordInfo.wordDetail.definition.itemListElement,

        register:
          wordInfo.wordDetail.register &&
          wordInfo.wordDetail.register.itemListElement,

        mapTier: t_mapTier,

        tag: wordInfo.wordDetail.tag && wordInfo.wordDetail.tag.itemListElement,

        exampleUsage:
          wordInfo.wordDetail.exampleUsage &&
          wordInfo.wordDetail.exampleUsage.itemListElement,

        // image: wordInfo.wordDetail.wordPicture,
        // audio: wordInfo.wordDetail.wordAudioInSambhota,
      });
  }, []);

  const handleAddWordSubmit = (e) => {
    let t_pos_itemListElement = [e.pos];
    let t_mapTier_itemListElement = [e.mapTier];

    setIsLoading(true);
    let queryData = {
      identifier: wordInfo.identifier,

      wordEntryInDevanagariSherpa: e.wordEntryInDevanagariSherpa,
      wordEntryInRoman: e.wordEntryInRoman,
      wordEntryInEnglish: e.wordEntryInEnglish,
      wordEntryInRomanizedSherpa: e.wordEntryInRomanizedSherpa,
      wordEntryInDevanagari: e.wordEntryInDevanagari,
      sambhotaSherpaScript: e.sambhotaSherpaScript,
      wordMeaningInDevanagari: e.wordMeaningInDevanagari,
      ipa: e.ipa,

      variationInSambhota: newVariationList,

      pos: t_pos_itemListElement,
      register: e.register,
      mapTier: t_mapTier_itemListElement,
      tag: e.tag,

      // added later
      definition: e.verbForm,

      exampleUsage: newHonorificList,

      // image: e.image.fileList ? e.image.fileList[0].originFileObj : null,
      // audio: e.audio.fileList ? e.audio.fileList[0].originFileObj : null,
      image: wordImage,
      audio: wordAudio,
    };
    console.log(queryData);

    wordRequests
      .updateWord(queryData)
      .then((res) => {
        setData(res);
        setIsSuccessfull(true);
      })
      .catch((err) => setError(err));
  };

  const onClose = () => {
    setWordDetailDrawerVisible(false);
    reFetchDataOnMutation();
  };

  const onImageChange = (e) => {
    if (!e) return;
    setWordImage(e.fileList[0].originFileObj);
  };
  const onAudioChange = (e) => {
    if (!e) return;
    setWordAudio(e.fileList[0].originFileObj);
  };

  // dummy  request for  file upload
  //
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

  //
  // variation and honorific  lists
  // added later
  //
  const addToVariationList = (itemName) => {
    console.log(itemName);
    let x = newVariationList;
    let y = [...x, itemName];
    setNewVariationList(y);
  };
  const removeFromVariationList = (item) => {
    let x = newVariationList;
    let y = x.filter((entryItem) => entryItem !== item);
    setNewVariationList(y);
  };
  const addToHonorificList = (itemName) => {
    // console.log(itemName);
    let x = newHonorificList;
    let y = [...x, itemName];
    setNewHonorificList(y);
  };
  const removeFromHonorificList = (item) => {
    let x = newHonorificList;
    let y = x.filter((entryItem) => entryItem !== item);
    setNewHonorificList(y);
  };

  //
  //
  return (
    <div>
      <Drawer
        title="Word Detail / Edit Word"
        width={720}
        onClose={onClose}
        visible={wordDetailDrawerlVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          ></div>
        }
      >
        <>
          {isSuccessfull ? (
            <p>Successfully updated the word</p>
          ) : (
            <Form
              layout="vertical"
              onFinish={handleAddWordSubmit}
              ref={wordUpdateForm}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Sherpa (Devanagiri)"
                    name="wordEntryInDevanagariSherpa"
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Sherpa (Roman)"
                    name="wordEntryInRomanizedSherpa"
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

                <Col span={8}>
                  <Form.Item
                    label="Sherpa (Sambhota)"
                    name="sambhotaSherpaScript"
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Nepali (Roman)"
                    name="wordEntryInRoman"
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

                <Col span={8}>
                  <Form.Item
                    label="Nepali (Devanagiri)"
                    name="wordEntryInDevanagari"
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

                <Col span={8}>
                  <Form.Item
                    label="English"
                    name="wordEntryInEnglish"
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

                <Col span={8}>
                  <Form.Item
                    label="Meaning  (Devanagiri)"
                    name="wordMeaningInDevanagari"
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Ipa" name="ipa">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="POS"
                    name="pos"
                    rules={[
                      {
                        required: true,
                        message: "Please fill  this field",
                      },
                    ]}
                  >
                    <Select
                    // defaultValue="noun"
                    // style={{ width: 120 }}
                    >
                      <Option value="noun">Noun</Option>
                      <Option value="verb">Verb</Option>
                      <Option value="adjective">Adjective</Option>
                      <Option value="adverb">Adverb</Option>
                      <Option value="pronoun">Pronoun</Option>
                      <Option value="preposition">Preposition</Option>
                      <Option value="conjunction">Conjunction</Option>
                      <Option value="interjection">Interjection</Option>
                      <Option value="numeral">Numeral</Option>
                      <Option value="article">Article</Option>
                      <Option value="determiner">Determiner</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Map Tier"
                    name="mapTier"
                  >
                    <Select
                    // defaultValue="easy"
                    // style={{ width: 120 }}
                    >
                      <Option value="easy">Easy</Option>
                      <Option value="moderate">Moderate</Option>
                      <Option value="hard">Hard</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Register">
                    <Form.List name="register">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space
                                key={key}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name]}
                                  style={{ width: "100%" }}
                                >
                                  <Input placeholder="register" />
                                </Form.Item>

                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            )
                          )}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Register
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Tag">
                    <Form.List name="tag">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space
                                key={key}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name]}
                                  style={{ width: "100%" }}
                                >
                                  <Input placeholder="mapTier" />
                                </Form.Item>

                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            )
                          )}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Tag
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Verb Form">
                    <Form.List name="verbForm">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name]}
                                style={{ width: "100%" }}
                              >
                                <Input placeholder="Verb Form" />
                              </Form.Item>

                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Verb Form
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>
              </Row><Row>

                {/* new  changes to  variation in sambhota */}
                <Col span={10} className="wordadd__variations__box">
                  <UpdateVarationEntries
                    opString={"Variation"}
                    variationList={newVariationList}
                    addToVariationList={addToVariationList}
                    removeFromVariationList={removeFromVariationList}
                  />
                </Col>

                <Col span={10} className="wordadd__variations__box">
                  <UpdateVarationEntries
                    opString={"Honorifics"}
                    variationList={newHonorificList}
                    addToVariationList={addToHonorificList}
                    removeFromVariationList={removeFromHonorificList}
                  />
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <p>Current Audio: </p>
                  <div>
                    <ReactAudioPlayer
                      src={wordInfo.wordDetail.wordAudioInSambhota}
                      autoPlay={false}
                      controls
                    />
                  </div>
                </Col>

                <Col span={12} style={{ marginBottom: "70px" }}>
                  <p>New Audio: </p>

                  <Dragger
                    multiple={false}
                    name="audio"
                    customRequest={dummyRequest}
                    onChange={onAudioChange}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single file.
                    </p>
                  </Dragger>
                </Col>
              </Row>

              <Row gutter={12} style={{ margin: "20px 0px" }}>
                <Col span={12}>
                  <p>Current Image: </p>
                  <div>
                    <br />
                    {wordInfo.wordDetail.wordPicture ? (
                      <img
                        src={wordInfo.wordDetail.wordPicture}
                        alt=""
                        style={{
                          width: "50%",
                        }}
                      />
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </Col>
                <Col span={12} style={{ marginBottom: "60px" }}>
                  <p>New Image: </p>

                  <Upload
                    name="image"
                    listType="picture-card"
                    customRequest={dummyRequest}
                    onChange={onImageChange}
                  >
                    {uploadButton}
                  </Upload>
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
                  Update Word
                </Button>
              </Form.Item>
            </Form>
          )}

          {error && <p>{JSON.stringify(error)}</p>}
        </>
      </Drawer>
    </div>
  );
}

//

function UpdateVarationEntries(props) {
  const {
    variationList,
    addToVariationList,
    removeFromVariationList,
    opString,
  } = props;

  let [addItemModalVisible, setAddItemModalVisible] = useState(false);

  let addItemToList = (item) => {
    if (!isAlreadyInList(item, variationList)) {
      addToVariationList(item);
    } else {
      console.log("already in list");
    }
  };

  const isAlreadyInList = (item, list) => {
    if (!list) return false;
    let x = list.filter((listItem) => listItem === item);
    if (x.length > 0) return true;
    return false;
  };

  const removeItemFromList = (item) => {
    removeFromVariationList(item);
  };

  const closeModal = () => {
    setAddItemModalVisible(false);
  };
  const openModal = () => {
    setAddItemModalVisible(true);
  };
  return (
    <div className="addvariationentries__container">
      <h3>{opString}</h3>

      {variationList &&
        variationList.map((variation) => {
          return (
            <div key={variation} className="addvariationentries__entries">
              {variation}
              <Button
                size="small"
                onClick={() => {
                  removeItemFromList(variation);
                }}
                danger
              >
                Remove
              </Button>
            </div>
          );
        })}
      <Button type="primary" block onClick={openModal}>
        Add / Update {opString}
      </Button>
      {addItemModalVisible && (
        <ModalAddVariationEntry
          visible={addItemModalVisible}
          handleCancel={closeModal}
          //
          addItemToList={addItemToList}
        />
      )}
    </div>
  );
}

function ModalAddVariationEntry(props) {
  const { visible, handleCancel, addItemToList } = props;

  let [audio, setAudio] = useState(null);

  let [addNewSuccess, setAddNewSuccess] = useState(false);
  let [addNewFail, setAddNewFail] = useState(false);
  let [allowAddNew, setAllowAddNew] = useState(true);

  const onChangeAudio = (e) => {
    if (!e.fileList) return;
    setAudio(e.fileList[0].originFileObj);
  };
  const onSubmitAddNew = (e) => {
    // console.log(e);

    let queryData = {
      wordEntry: e.wordEntry,
      ipa: e.ipa,
      name: e.name,
      audio: audio,
      source: e.source,
    };
    variationRequests.addWord(queryData).then((res) => {
      if (res.status === "success") {
        // close  modal maybe
        handleCancel();
        addItemToList(queryData.wordEntry);
      }
    });
    // on submit event
  };

  return (
    <Modal
      visible={visible}
      title="Add Entry"
      onOk={handleCancel}
      onCancel={handleCancel}
      footer={[]}
    >
      {allowAddNew && (
        <Form layout="vertical" onFinish={onSubmitAddNew}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Roman Sherpa"
                name="wordEntry"
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
            <Col span={8}>
              <Form.Item
                label="Ipa"
                name="ipa"
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
            <Col span={8}>
              <Form.Item
                label="Sherpa Devanagiris"
                name="name"
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
            <Col span={8}>
              <Form.Item
                label="Sherpa (Sambhota)"
                name="source"
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
          </Row>

          <Row gutter={12}>
            <Col span={24} style={{ margin: "10px 0px 80px 0px" }}>
              <p>Audio:</p>
              <Dragger
                multiple={false}
                name="audio"
                // customRequest={dummyRequest}
                onChange={onChangeAudio}
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
          </Row>

          <Form.Item>
            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              htmlType="submit"
            // loading={isLoading}
            >
              ADD ENTRY
            </Button>
          </Form.Item>
        </Form>
      )}

      {addNewSuccess && <p>Successfully added to system and added to list</p>}
      {addNewFail && <p>Failed to add</p>}
    </Modal>
  );
}
