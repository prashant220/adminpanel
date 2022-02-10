import React, { useState, useEffect } from "react";

import "./styles.css";

import { Row, Col, Spin, Pagination, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import { WordPreviewModal } from "../../../../UIcomponents/index";

import wordRequests from "../../../../../services/helpers/wordquery";
import statRequests from "../../../../../services/helpers/statquery";

import { useQuery } from "react-query";

function WordList(props) {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 50,
    pageSize: 50,
    total: 50,
    currentPage: 1,
  });

  let queryDataWordList = {
    start: pagination.start,
    end: pagination.end,
  };

  const sherpaWordCount = useQuery(["countTotalSherpaWord"], () =>
    statRequests.countTotalSherpaWord()
  );

  const wordList = useQuery(["listTotalSherpaWord", [queryDataWordList]], () =>
    wordRequests.listTotalSherpaWord(queryDataWordList)
  );

  useEffect(() => {
    setPagination({
      ...pagination,
      total: sherpaWordCount.data && sherpaWordCount.data.value,
    });
  }, [sherpaWordCount.data]);

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
    sherpaWordCount.refetch();
    wordList.refetch();
  };
  return (
    <div className="wordlist__container">
      <div className="refresh_button_container">
        <Button
          type="primary"
          icon={<RedoOutlined />}
          size="large"
          onClick={refreshAllData}
        ></Button>
      </div>

      {sherpaWordCount.data && (
        <div className="wordlist__wordcount">
          <p>Total Words : {sherpaWordCount.data.value}</p>
          <p>/</p>
          <p>Page: {pagination.currentPage}</p>
        </div>
      )}

      <Row gutter={[12, 12]}>
        <div className="wordlist__pagination">
          <Pagination
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handlePagination}
          />
        </div>
        {wordList.isFetching && <Spin />}
        {wordList.data &&
          wordList.data.itemListElement.length > 0 &&
          wordList.data.itemListElement.map((wordItem) => {
            return (
              <Col span={24} key={wordItem.identifier}>
                <WordPreviewForWordList wordInfo={wordItem} />
              </Col>
            );
          })}

        <div className="wordlist__pagination">
          <Pagination
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handlePagination}
          />
        </div>
      </Row>
    </div>
  );
}

export default WordList;

function WordPreviewForWordList(props) {
  let [wordlistWordPreviewModalVisible, setWordListWordPreviewModalVisible] =
    useState(false);

  const { wordInfo } = props;

  let openModal = () => {
    setWordListWordPreviewModalVisible(true);
  };
  let closeModal = () => {
    setWordListWordPreviewModalVisible(false);
  };

  return (
    <div className="wordpreviewforwordlist__container">
      <p className="wordpreviewforwordlist__word-data">
        {wordInfo.wordEntryInDevanagariSherpa}
      </p>
      <div className="wordpreviewforwordlist__word-action">
        <Button type="primary" onClick={openModal}>
          Details
        </Button>
        {wordlistWordPreviewModalVisible && (
          <WordPreviewModal
            modalVisible={wordlistWordPreviewModalVisible}
            onOk={closeModal}
            onCancel={closeModal}
            wordInfo={wordInfo}
          />
        )}
      </div>
    </div>
  );
}
