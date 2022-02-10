import React, { useEffect, useState } from "react";
import "./styles.css";

import {
  Row,
  Col,
  Drawer,
  Select,
  Divider,
  Form,
  Pagination,
  Button,
  Space,
  Input,
  Modal,
  Spin,
} from "antd";

import {
  MinusCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { SentencePreview } from "../../../../UIcomponents/index";
import SentenceAdd from "../sentenceadd/SentenceAdd";

import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  listSentenceByCategory,
  listAllCategories,
} from "../../../../../store/features/sentence/sentenceActions";
import sentenceRequests from "../../../../../services/helpers/sentencequery";

function SentenceAndCategory(props) {
  // formReference
  const [sentenceCatAddForm] = Form.useForm();

  //import redux dispatch
  const dispatch = useDispatch();

  //list of categories and sentences from redux store
  //the first category that is rendered is first item of array returned
  const { sentenceCategories, sentenceList } = props;

  let [categoryList, setCategoryList] = useState(null);

  let [selectedCategory, setSelectedCategory] = useState("");
  let [formDataCategories, setFormDataCategories] = useState([]);

  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let [addNewCategoryQueryResult, setAddNewCategoryQueryResult] = useState({
    isLoading: false,
    data: null,
    error: null,
    isSuccessfull: false,
    isFailed: false,
  });

  // modals visible
  let [editCategoryModalData, setEditCategoryModalData] = useState({
    visible: false,
    action: null,
  });

  let handleUpdateCategoryModal = () => {
    setEditCategoryModalData({
      visible: true,
      action: "edit",
    });
  };
  let handleDeleteCategoryModal = () => {
    setEditCategoryModalData({
      visible: true,
      action: "delete",
    });
  };

  let handleCloseEditCategoryModal = () => {
    setEditCategoryModalData({
      visible: false,
      action: null,
    });
  };

  // add sentence drawer visible
  let [addSentenceDrawerVisible, setAddSentenceDrawerVisible] = useState(false);

  let handleAddSentenceDrawerClose = () => {
    setAddSentenceDrawerVisible(false);
  };

  //effect for  pagination
  useEffect(() => {
    if (selectedCategory) {
      let x = {
        categoryName: selectedCategory,
      };
      sentenceRequests.countTotalSentenceByCategory(x).then((res) => {
        if (res.value) {
          // console.log(res);
          setPagination({
            ...pagination,
            total: res.value,
          });
        } else {
          setPagination({
            ...pagination,
          });
        }
      });
    }
  }, [selectedCategory]);

  //list sentence effect
  useEffect(() => {
    if (selectedCategory) {
      let queryData = {
        pagination: pagination,
        categoryName: selectedCategory,
      };
      dispatch(listSentenceByCategory(queryData));
    }
  }, [selectedCategory, pagination]);

  //form data sentence categories effect
  useEffect(() => {
    if (sentenceCategories && sentenceCategories.list) {
      setSelectedCategory(sentenceCategories.list[0]);
      setCategoryList(sentenceCategories.list);
      formatSentenceCategoryData(sentenceCategories.list);
    }
  }, [sentenceCategories]);

  const formatSentenceCategoryData = (m) => {
    let x = [];
    m.map((item) => {
      return (x = [...x, { value: item }]);
    });
    // console.log(x);
    setFormDataCategories(x);
  };

  function onChangeCategory(value) {
    console.log(`selected ${value}`);
    setSelectedCategory(value);
  }

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

  let onFinish = (e) => {
    if (!e.availableSentenceCategories) return;
    if (e.availableSentenceCategories.length === 0) return;
    // console.log(e.availableSentenceCategories);

    let mm = e.availableSentenceCategories.map((cat) => {
      let x = `${cat.Eng}/${cat.Nep}`;
      return x;
    });

    let m = [...categoryList, ...mm];
    console.log(mm, m, categoryList);
    // let m = [...mm];

    setAddNewCategoryQueryResult({
      ...addNewCategoryQueryResult,
      isLoading: true,
    });

    let queryData = {
      identifier: sentenceCategories.identifier,
      availableSentenceCategories: m,
    };
    updateSentenceCategory(queryData);
  };

  const updateSentenceCategory = (queryData) => {
    sentenceRequests
      .updateSentenceCategory(queryData)
      .then((res) => {
        if (res.status === "success") {
          setAddNewCategoryQueryResult({
            ...addNewCategoryQueryResult,
            isLoading: false,
            isSuccessfull: true,
            data: res,
          });
          dispatch(listAllCategories());
          showSuccessOp();
        }

        clearForm();
      })
      .catch((err) => {
        setAddNewCategoryQueryResult({
          ...addNewCategoryQueryResult,
          isLoading: false,
          data: null,
          error: err,
          isSuccessfull: false,
          isFailed: true,
        });
      });
  };

  function showSuccessOp() {
    Modal.success({
      title: "Success.",
    });
    handleCloseEditCategoryModal();
  }

  const clearForm = () => {
    // sentenceCatAddForm.resetFields();
    sentenceCatAddForm.current.setFieldsValue({
      availableSentenceCategories: null,
    });
  };

  const refreshAllSentences = () => {
    let queryData = {
      pagination: pagination,
      categoryName: selectedCategory,
    };
    dispatch(listSentenceByCategory(queryData));
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          {/* list  */}
          <div className="sentenceandcategory__category-select-container">
            <Divider orientation="left">Selected Category: </Divider>

            <Form>
              <Form.Item>
                <Select
                  // mode="multiple"
                  showArrow
                  defaultValue={selectedCategory}
                  value={selectedCategory}
                  style={{ width: "100%" }}
                  loading={!formDataCategories}
                  options={formDataCategories}
                  onChange={onChangeCategory}
                  showSearch
                />
              </Form.Item>
            </Form>

            <div className="sentenceandcategory__category-select-edit-buttons">
              <Button
                size="small"
                onClick={handleUpdateCategoryModal}
                type="primary"
              >
                EDIT
              </Button>
              <Button
                size="small"
                className="mar-l-10"
                danger
                onClick={handleDeleteCategoryModal}
                type="primary"
              >
                DELETE
              </Button>

              {/* modal here */}
              {editCategoryModalData.visible && (
                <EditSentenceCategoryListModal
                  onClose={handleCloseEditCategoryModal}
                  action={editCategoryModalData.action}
                  modalVisible={editCategoryModalData.visible}
                  categoryToUpdate={selectedCategory}
                  categoryList={categoryList}
                  updateSentenceCategory={updateSentenceCategory}
                  identifier={sentenceCategories.identifier}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
            </div>
            {addNewCategoryQueryResult.error && (
              <p style={{ color: "red" }}>
                {addNewCategoryQueryResult.error.message}
              </p>
            )}

            <div style={{ margin: "30px" }}></div>
            {/* </div>

          <div className="sentenceandcategory__category-add-conatiner"> */}
            <Divider orientation="left">Add New Category</Divider>

            <div className="addsentencecategory__cat-add-container">
              <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
                ref={sentenceCatAddForm}
              >
                <Form.List name="availableSentenceCategories">
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
                            name={[name, "Eng"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing category Name",
                              },
                            ]}
                          >
                            <Input placeholder="Category Name  In English" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "Nep"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing category Name",
                              },
                            ]}
                          >
                            <Input placeholder="Category Name In Nepali" />
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
                          Add Another Category
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={addNewCategoryQueryResult.isLoading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>

              {addNewCategoryQueryResult.error && (
                <p style={{ color: "red" }}>
                  {addNewCategoryQueryResult.error.message}
                </p>
              )}
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="sentenceandcategory__sentence-list-container">
            <div
              className="refresh_button_container"
              style={{ marginBottom: "20px" }}
            >
              <Button
                type="primary"
                icon={<RedoOutlined />}
                size="large"
                onClick={refreshAllSentences}
              ></Button>
            </div>

            <div>
              <Button
                block
                type="primary"
                onClick={() => setAddSentenceDrawerVisible(true)}
              >
                Add New Sentence to this category
              </Button>
              {addSentenceDrawerVisible && (
                <AddSentenceDrawer
                  onClose={handleAddSentenceDrawerClose}
                  drawerVisible={addSentenceDrawerVisible}
                  selectedCategory={selectedCategory}
                />
              )}
            </div>

            <div className="sc__listsentence__sentencelist-container">
              {sentenceList && sentenceList.isLoading && <Spin />}

              {sentenceList &&
              sentenceList.data &&
              sentenceList.data.length < 1 ? (
                <p>No Sentences in category : {selectedCategory}</p>
              ) : (
                <>
                  <Divider orientation="left">
                    All Sentences in category : {selectedCategory}:{" "}
                  </Divider>
                  {sentenceList.data.map((sentence) => {
                    return (
                      <SentencePreview
                        refreshAllSentences={refreshAllSentences}
                        key={sentence.identifier}
                        sentenceID={sentence.identifier}
                      />
                    );
                  })}
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  />
                  <Pagination
                    defaultCurrent={pagination.page}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    onChange={handlePagination}
                  />
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

// connect  redux  store
const mapStateToProps = (state) => {
  return {
    sentenceCategories: state.sentence.categories.data,
    sentenceList: state.sentence.sentenceList,
  };
};

export default withRouter(connect(mapStateToProps)(SentenceAndCategory));

//
function EditSentenceCategoryListModal(props) {
  const [sentenceCatEditForm] = Form.useForm();

  let [categoryFormatted, setCategoryFormatted] = useState(null);

  const {
    modalVisible,
    onClose,
    categoryList,
    categoryToUpdate,
    action,
    identifier,
    updateSentenceCategory,
    setSelectedCategory,
  } = props;

  // creating a list of formatted sentence Categories later shall be mapped to form  and on submit the shall be updated
  useEffect(() => {
    let x = [];
    let parts = categoryToUpdate.split("/");
    let y = {
      Eng: parts[0],
      Nep: parts[1],
    };
    x.push(y);
    setCategoryFormatted(x);
  }, [categoryToUpdate]);

  // set form with values from the category Formatted state
  useEffect(() => {
    if (action === "edit") {
      categoryFormatted &&
        sentenceCatEditForm.current.setFieldsValue({
          newAvailableSentenceCategories: categoryFormatted,
        });
    }
  }, [categoryFormatted]);

  let onFinishCategoryEdit = (e) => {
    if (!e.newAvailableSentenceCategories) return;
    let newList = [...categoryList];
    let mm = `${e.newAvailableSentenceCategories[0].Eng}/${e.newAvailableSentenceCategories[0].Nep}`;
    // console.log(mm);
    let indexOfElementToUpdate = categoryList.indexOf(categoryToUpdate);
    // console.log(indexOfElementToUpdate);
    newList.splice(indexOfElementToUpdate, 1, mm);
    // console.log(newList);
    let queryData = {
      identifier: identifier,
      availableSentenceCategories: newList,
    };
    updateSentenceCategory(queryData);
  };

  let handleDeleteCategory = () => {
    let newList = [...categoryList];
    let indexOfElementToDelete = categoryList.indexOf(categoryToUpdate);
    // console.log(indexOfElementToUpdate);
    newList.splice(indexOfElementToDelete, 1);
    // console.log(newList);
    let queryData = {
      identifier: identifier,
      availableSentenceCategories: newList,
    };
    updateSentenceCategory(queryData);
  };

  return (
    <Modal
      visible={modalVisible}
      title="Edit Category"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      {action === "edit" && (
        <div>
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinishCategoryEdit}
            autoComplete="off"
            ref={sentenceCatEditForm}
          >
            <Form.List name="newAvailableSentenceCategories">
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
                        name={[name, "Eng"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing category Name",
                          },
                        ]}
                      >
                        <Input placeholder="Category Name  In English" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "Nep"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing category Name",
                          },
                        ]}
                      >
                        <Input placeholder="Category Name In Nepali" />
                      </Form.Item>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                // loading={addNewCategoryQueryResult.isLoading}
              >
                Update Category
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {action === "delete" && (
        <div>
          <p>Once deleted all data will be lost !</p>
          <Button
            onClick={handleDeleteCategory}
            type="primary"
            size="large"
            danger
          >
            Delete this category
          </Button>
        </div>
      )}
    </Modal>
  );
}

function AddSentenceDrawer(props) {
  const { onClose, drawerVisible, selectedCategory } = props;

  return (
    <div>
      <Drawer
        title="Add New Sentence"
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
        <SentenceAdd preSelectedCategory={selectedCategory} />
      </Drawer>
    </div>
  );
}
