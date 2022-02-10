import React, { useState, useEffect } from "react";
import "./styles.css";

import {
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

import wordRequests from "../../../../../services/helpers/wordquery";
import variationRequests from "../../../../../services/helpers/variationquery";

import {
  MinusCircleOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;

export default function WordAdd() {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);

  let [isSuccessfull, setIsSuccessfull] = useState(false);

  //
  let [wordImage, setWordImage] = useState(null);
  let [wordAudio, setWordAudio] = useState(null);

  // variation and honorific list
  let [variationList, setVariationList] = useState([]);
  let [honorificList, setHonorificList] = useState([]);

  const handleResetWordAdding = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };
  const handleAddWordSubmit = (e) => {
    // console.log(e);
    setIsLoading(true);

    let queryData = {
      wordEntryInDevanagariSherpa: e.wordEntryInDevanagariSherpa,
      wordEntryInRoman: e.wordEntryInRoman,
      wordEntryInEnglish: e.wordEntryInEnglish,
      wordEntryInRomanizedSherpa: e.wordEntryInRomanizedSherpa,
      wordEntryInDevanagari: e.wordEntryInDevanagari,
      sambhotaSherpaScript: e.sambhotaSherpaScript,
      wordMeaningInDevanagari: e.wordMeaningInDevanagari,
      ipa: e.ipa,

      // added later
      definition: e.verbForm,

      // variationInSambhota: e.variationInSambhota,
      variationInSambhota: variationList,
      pos: e.pos,
      register: e.register,
      mapTier: e.mapTier,

      tag: e.tag,
      // exampleUsage: e.exampleUsage,
      exampleUsage: honorificList,

      image: wordImage,
      audio: wordAudio,
    };

    console.log(queryData);
    wordRequests
      .addWord(queryData)
      .then((res) => {
        setData(res);
        setIsSuccessfull(true);
      })
      .catch((err) => setError(err));
  };

  //
  const addToVariationList = (itemName) => {
    console.log(itemName);
    let x = variationList;
    let y = [...x, itemName];
    setVariationList(y);
  };
  const removeFromVariationList = (item) => {
    let x = variationList;
    let y = x.filter((entryItem) => entryItem !== item);
    setVariationList(y);
  };
  const addToHonorificList = (itemName) => {
    // console.log(itemName);
    let x = honorificList;
    let y = [...x, itemName];
    setHonorificList(y);
  };
  const removeFromHonorificList = (item) => {
    let x = honorificList;
    let y = x.filter((entryItem) => entryItem !== item);
    setVariationList(y);
  };
  //
  //
  const onImageChange = (e) => {
    if (!e) return;
    setWordImage(e.fileList[0].originFileObj);
  };
  const onAudioChange = (e) => {
    if (!e) return;
    setWordAudio(e.fileList[0].originFileObj);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const uploadButton = (
    <div>
      <div style={{ marginTop: "8px" }}>Upload</div>
    </div>
  );

  return (
    <>
      {isSuccessfull ? (
        <>
          <h3>successfully added word !!!</h3>
          <Button onClick={handleResetWordAdding} type="primary" size="large">
            Click to add another word
          </Button>
        </>
      ) : (
        <div>
          <Form layout="vertical" onFinish={handleAddWordSubmit}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Sherpa (Devanagiri )"
                  name="wordEntryInDevanagariSherpa"
                >
                  <Input placeholder="" />
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
                  label="Sherpa(Roman)"
                  name="wordEntryInRomanizedSherpa"
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
                  label="Meaning (Devangiri)"
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
                              <Input placeholder="register" />
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
                              <Input placeholder="Tag Name" />
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

              {/* <Col span={8}>
                <Form.Item label="Variation In Sambhota">
                  <Form.List name="variationInSambhota">
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
                              // name={[name, "variationInSambhotaItem"]}
                              style={{ width: "100%" }}
                            >
                              <Input placeholder="Variation In Sambhota" />
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
                            Add Item
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Honorifics">
                  <Form.List name="exampleUsage">
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
                              <Input placeholder="honorific" />
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
                            Add Tag
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Col> */}

              {/* new  changes to  variation in sambhota */}
            </Row><Row>
              <Col span={10} className="wordadd__variations__box">
                <AddVarationEntries
                  opString={"Variations"}
                  addToVariationList={addToVariationList}
                  removeFromVariationList={removeFromVariationList}
                />
              </Col>

              <Col span={10} className="wordadd__variations__box">
                <AddVarationEntries
                  opString={"Honorifics"}
                  addToVariationList={addToHonorificList}
                  removeFromVariationList={removeFromHonorificList}
                />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={8} style={{ margin: "10px 0px 100px 0px" }}>
                <p>Upload Image: </p>
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
                  onChange={onImageChange}
                  customRequest={dummyRequest}
                >
                  {uploadButton}
                </Upload>
              </Col>

              <Col span={8} style={{ margin: "10px 0px 100px 0px" }}>
                <p>Upload Audio: </p>
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
                loading={isLoading}
              >
                ADD WORD
              </Button>
            </Form.Item>
          </Form>

          {error && <p>{JSON.stringify(error)}</p>}
        </div>
      )}
    </>
  );
}

//
function AddVarationEntries(props) {
  const { addToVariationList, removeFromVariationList, opString } = props;

  let [addItemModalVisible, setAddItemModalVisible] = useState(false);
  //
  let [variationEntries, setVariationEntries] = useState([]);
  //

  let addItemToList = (item) => {
    console.log(item);
    if (!isAlreadyInList(item, variationEntries)) {
      // console.log("not in list");
      // if not in list add to list
      let x = variationEntries;
      let y = [...x, item];
      setVariationEntries(y);
      addToVariationList(item.wordEntry);
    } else {
      console.log("already in list");
    }
  };

  const isAlreadyInList = (item, list) => {
    let x = list.filter((listItem) => listItem.wordEntry === item.wordEntry);
    if (x.length > 0) return true;

    return false;
  };

  const removeItemFromList = (item) => {
    // console.log(item);
    let x = variationEntries;
    let y = x.filter((entryItem) => entryItem.wordEntry !== item.wordEntry);
    // console.log(y);
    setVariationEntries(y);
    removeFromVariationList(item.wordEntry);
  };

  const closeModal = () => {
    setAddItemModalVisible(false);
  };
  const openModal = () => {
    setAddItemModalVisible(true);
  };
  return (
    <div className="addvariationentries__container">
      <h3>Add {opString}</h3>

      {variationEntries &&
        variationEntries.map((entry) => {
          return (
            <div key={entry.wordEntry} className="addvariationentries__entries">
              {entry.wordEntry} , {entry.name} , {entry.ipa}
              <Button
                size="small"
                onClick={() => {
                  removeItemFromList(entry);
                }}
                danger
              >
                Remove
              </Button>
            </div>
          );
        })}
      <Button type="primary" block onClick={openModal}>
        Add {opString}
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

  let [addNewSuccess, setAddNewSuccess] = useState(false);
  let [addNewFail, setAddNewFail] = useState(false);
  let [allowAddNew, setAllowAddNew] = useState(true);
  // let [checkForAvaiblability, setCheckForAvailability] = useState(true);
  // let [fetchedDetails, setFetchedDetils] = useState(false);
  // let [allowUpdateItem, setAllowUpdateItem] = useState(false);

  const onSubmitAddNew = (e) => {
    // console.log(e);

    let queryData = {
      wordEntry: e.wordEntry,
      ipa: e.ipa,
      name: e.name,
      source: e.source,
      audio: e.audio && e.audio.fileList[0].originFileObj,
    };
    variationRequests.addWord(queryData).then((res) => {
      console.log(res);
      if (res.status === "success") {
        // reset all
        // show  button to add  to list
        setAddNewSuccess(true);
        addItemToList(queryData);
        // close  modal maybe
        handleCancel();
      }
    });
    // on submit event
  };
  // const onSubmitCheckAvailability = (e) => {
  //   // resetting
  //   setAllowAddNew(false);
  //   setAllowUpdateItem(false);
  //   setFetchedDetils(null);

  //   let queryData = {
  //     wordEntry: e.wordEntry,
  //   };
  //   variationRequests
  //     .getDetailsOfWord(queryData)
  //     .then((res) => {
  //       if (res && res.wordEntry) {
  //         // if detail found do something
  //         setFetchedDetils(res);
  //         //
  //         console.log(res);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.status === "fail") {
  //         console.log("err cha  ", err.status);
  //         //
  //         setAllowAddNew(true);
  //       }
  //     });
  // };
  // const onSubmitUpdateItem = (e) => {};

  // // button  event
  // const handleUpdate = () => {
  //   // form data rakhne
  //   //
  //   setAllowUpdateItem(true);
  // };
  // const handleAlreadyAvailableItem = () => {
  //   //
  //   //
  //   addItemToList(fetchedDetails);
  //   // close  modal maybe
  //   handleCancel();
  // };
  return (
    <Modal
      visible={visible}
      title="Add Entry"
      onOk={handleCancel}
      onCancel={handleCancel}
      footer={[]}
    >
      {/* {checkForAvaiblability && (
        <Form layout="vertical" onFinish={onSubmitCheckAvailability}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Entry"
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
          </Row>

          <Form.Item>
            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              htmlType="submit"
              // loading={isLoading}
            >
              CHECK ENTRY
            </Button>
          </Form.Item>
        </Form>
      )} */}

      {allowAddNew && (
        <Form layout="vertical" onFinish={onSubmitAddNew}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Sherpa (Roman)"
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
                    required: false,
                    message: "Please fill  this field",
                  },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sherpa (Devanagiri)"
                name="name"
                rules={[
                  {
                    required: false,
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
                    required: false,
                    message: "Please fill  this field",
                  },
                ]}
              >
                <Input placeholder="" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={24}>
              <Form.Item label="Select Audio File" name="audio">
                <Dragger
                  multiple={false}
                  name="audio"
                // customRequest={dummyRequest}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Support for a single file.</p>
                </Dragger>
              </Form.Item>
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
      {/* {fetchedDetails && (
        <>
          <p>data already available in system what you wish to do ??</p>
          <Button onClick={handleAlreadyAvailableItem} type="primary">
            Use this entry
          </Button>
          <Button onClick={handleUpdate} className="mar-l-10" type="dashed">
            Update this entry
          </Button>
        </>
      )} */}

      {/* {allowUpdateItem && (
        <Form layout="vertical" onFinish={onSubmitUpdateItem}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Entry"
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
                label="name"
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
          </Row>

          <Row gutter={12}>
            <Col span={24}>
              <Form.Item label="Select Audio File" name="audio">
                <Dragger
                  multiple={false}
                  name="audio"
                  // customRequest={dummyRequest}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Support for a single file.</p>
                </Dragger>
              </Form.Item>
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
      )} */}

      {addNewSuccess && <p>Successfully added to system and added to list</p>}
      {addNewFail && <p>Failed to add</p>}
    </Modal>
  );
}
