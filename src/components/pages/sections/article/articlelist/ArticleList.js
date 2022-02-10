import React, { useState, useEffect } from "react";

import "./styles.css";

import { Row, Col, Spin, Pagination, Button, Modal } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import articleRequests from "../../../../../services/helpers/articlequery";

import { useQuery } from "react-query";

function ArticleList(props) {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let queryDataArticlelist = {
    start: pagination.start,
    end: pagination.end,
  };

  const articleListCount = useQuery(["countTotalNewsArticle"], () =>
    articleRequests.countTotalNewsArticle()
  );

  const articleList = useQuery(
    ["listNewsArticle", [queryDataArticlelist]],
    () => articleRequests.listNewsArticle(queryDataArticlelist)
  );

  useEffect(() => {
    setPagination({
      ...pagination,
      total: articleListCount.data && articleListCount.data.value,
    });
  }, [articleListCount.data]);

  useEffect(() => {
    articleList.refetch();
  }, []);

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
    articleListCount.refetch();
    articleList.refetch();
  };

  return (
    <div className="articlelist__container">
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

      {articleListCount.data && (
        <>
          <div className="wordlist__wordcount">
            <p>Total Articles : {articleListCount.data.value}</p>
            <p>/</p>
            <p>Page: {pagination.currentPage}</p>
          </div>
        </>
      )}
      {articleList.isFetching && <Spin />}
      <Row gutter={[12, 12]}>
        {articleList.data &&
          articleList.data.itemListElement.length > 0 &&
          articleList.data.itemListElement.map((item) => {
            return (
              <Col span={24} key={item.identifier}>
                <PreviewForArticlelist
                  articleInfo={item}
                  articleListQuery={articleList}
                />
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

function PreviewForArticlelist(props) {
  const { articleInfo, articleListQuery } = props;

  let [editArticleListItemModal, setEditArticleListItemModal] = useState(false);
  let [deleteArticleListItemModal, setDeleteArticleListItemModal] =
    useState(false);

  let closeEditArticleModal = () => {
    setEditArticleListItemModal(false);
  };
  let closeDeleteArticleModal = () => {
    setDeleteArticleListItemModal(false);
  };

  return (
    <div className="previewforarticlelist__container">
      <div className="previewforarticlelist__artitle-title">
        <a
          href={`${articleInfo.articleSection}`}
          target="_blank"
          rel="noreferrer"
        >
          {articleInfo.articleBody}
        </a>
      </div>
      <div>
        <Button danger onClick={() => setDeleteArticleListItemModal(true)}>
          Delete
        </Button>
        {/* <Button className="mar-l-10">Edit</Button> */}

        {editArticleListItemModal && (
          <EditArticleListItemModal
            modalVisible={editArticleListItemModal}
            onClose={closeEditArticleModal}
            articleInfo={articleInfo}
            articleListQuery={articleListQuery}
          />
        )}
        {deleteArticleListItemModal && (
          <DeleteArticleListItemModal
            modalVisible={deleteArticleListItemModal}
            onClose={closeDeleteArticleModal}
            articleInfo={articleInfo}
            articleListQuery={articleListQuery}
          />
        )}
      </div>
    </div>
  );
}

function EditArticleListItemModal(props) {
  const { modalVisible, onClose, articleListQuery } = props;

  return (
    <Modal
      visible={modalVisible}
      title="Title"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      edit form
    </Modal>
  );
}

function DeleteArticleListItemModal(props) {
  const { modalVisible, onClose, articleInfo, articleListQuery } = props;

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted Article.",
    });
    onClose();
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete Article",
    });
  }
  function onConfirmDelete() {
    const queryData = {
      identifier: articleInfo.identifier,
    };

    articleRequests
      .deleteNewsArticle(queryData)
      .then((res) => {
        if (res.status === "success") {
          showSuccessDeleteOp();
          articleListQuery.refetch();
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
      title="Delete Article"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <p>Once deleted it cannot be restored.</p>
      <Button type="primary" size="large" danger onClick={onConfirmDelete}>
        DELETE ARTICLE
      </Button>
    </Modal>
  );
}

export default ArticleList;
