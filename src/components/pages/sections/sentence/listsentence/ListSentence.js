import React, { useState, useEffect } from "react";

import "./styles.css";

import { SentencePreview } from "../../../../UIcomponents/index";

import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { listSentenceByCategory } from "../../../../../store/features/sentence/sentenceActions";

import sentenceRequests from "../../../../../services/helpers/sentencequery";

import { Select, Form, Divider, Pagination, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";

let { Option } = Select;

function ListSentence(props) {
  const dispatch = useDispatch();
  const { sentenceCategories, sentenceList } = props;

  let [selectedCategory, setSelectedCategory] = useState("");
  let [formDataCategories, setFormDataCategories] = useState([]);

  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,

    pageSize: 10,

    total: 10,
    currentPage: 1,
  });

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

  useEffect(() => {
    if (selectedCategory) {
      let queryData = {
        pagination: pagination,
        categoryName: selectedCategory,
      };
      dispatch(listSentenceByCategory(queryData));
    }
  }, [selectedCategory, pagination]);

  useEffect(() => {
    if (sentenceCategories && sentenceCategories.list) {
      setSelectedCategory(sentenceCategories.list[0]);
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
    // console.log(`selected ${value}`);
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
  // console.log("selected cat: ", selectedCategory, "list", formDataCategories);
  // console.log(pagination);

  let getSentenceList = () => {
    if (selectedCategory) {
      let queryData = {
        pagination: pagination,
        categoryName: selectedCategory,
      };
      dispatch(listSentenceByCategory(queryData));
    }
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

      {/* {sentenceCategories.isSuccessfull && <div>{selectedCategory} </div>} */}
      {selectedCategory && formDataCategories.length > 0 && (
        <div>
          <Divider orientation="left">Selected Category: </Divider>

          <Form>
            <Form.Item>
              <Select
                // mode="multiple"
                showArrow
                defaultValue={selectedCategory}
                style={{ width: "100%" }}
                loading={!formDataCategories}
                options={formDataCategories}
                onChange={onChangeCategory}
                showSearch
              />
            </Form.Item>
          </Form>
        </div>
      )}

      <div className="listsentence__sentencelist-container">
        {sentenceList && sentenceList.isLoading && <p>Loading sentences</p>}

        {sentenceList && sentenceList.data && sentenceList.data.length < 1 ? (
          <p>No Sentences</p>
        ) : (
          <>
            <Divider orientation="left">All Sentences: </Divider>
            {sentenceList.data.map((sentence) => {
              return (
                <SentencePreview
                  key={sentence.identifier}
                  sentenceID={sentence.identifier}
                  // for delete re-render
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
  );
}

// connect  redux  store
const mapStateToProps = (state) => {
  return {
    sentenceCategories: state.sentence.categories.data,
    sentenceList: state.sentence.sentenceList,
  };
};

export default withRouter(connect(mapStateToProps)(ListSentence));
