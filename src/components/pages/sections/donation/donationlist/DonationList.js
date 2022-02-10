import React, { useState, useEffect } from "react";

import "./styles.css";

import { Row, Col, Card, Pagination, Button, Spin, Modal } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import donationRequests from "../../../../../services/helpers/donationquery";

import { useQuery } from "react-query";

function DonationList(props) {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let queryDataDonationlist = {
    pagination: pagination,
  };

  const donationListCount = useQuery(["countUserDonations"], () =>
    donationRequests.countUserDonations()
  );

  const donationList = useQuery(
    ["listUserDonations", [queryDataDonationlist]],
    () => donationRequests.listUserDonations(queryDataDonationlist)
  );

  useEffect(() => {
    console.log(donationListCount)
    setPagination({
      ...pagination,
      total: donationListCount.data && donationListCount.data.value,
    });
  }, [donationListCount.data]);

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
    donationListCount.refetch();
    donationList.refetch();
  };

  return (
    <div className="videolist__container">
      <div className="refresh_button_container">
        <Button
          size="large"
          type="primary"
          icon={<RedoOutlined />}
          onClick={refreshAllData}
          loading={donationList.isLoading}
        >
          Refresh
        </Button>
      </div>
      {donationListCount.data && (
        <div className="wordlist__wordcount">
          <p>Total Donation Count : {donationListCount.data.value}</p>
          <p>/</p>
          <p>Page: {pagination.currentPage}</p>
        </div>
      )}
      {donationList.isFetching && (
        <div>
          <Spin />
        </div>
      )}
      <Row gutter={[12, 12]}>
        {donationList.data &&
          donationList.data.itemListElement.length > 0 &&
          donationList.data.itemListElement.map((item) => {
            return (
              <Col span={12} key={item.identifier}>
                <PreviewForDonationlist
                  donationInfo={item}
                  donationListQuery={donationList}
                />
              </Col>
            );
          })}
      </Row>
      <div style={{ margin: "10px" }}></div>
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={handlePagination}
      />
    </div>
  );
}

function PreviewForDonationlist(props) {
  const { donationInfo, donationListQuery } = props;

  let [deleteDonationListItemModal, setDeleteDonationListItemModal] =
    useState(false);

  let closeDeleteDonationModal = () => {
    setDeleteDonationListItemModal(false);
  };

  return (
    <div className="previewfordonationlist__container">
      <Card>
        <div className="previewfordonationlist__content">
          <div className="previewfordonationlist__text">
            <p>
              <span className="previewfordonationlist__title">
                Donated By:{" "}
              </span>
              <span className="previewfordonationlist__text">
                {donationInfo.name}
              </span>
            </p>
            <p>
              <span className="">
                Address:{" "}
              </span>
              <span className="">
                {donationInfo.location}
              </span>
            </p>
            <p>Amount: {donationInfo.donatedAmount}</p>
            <p>Paid Using: {donationInfo.donationPaymentPlatform}</p>
            <p>Payment ID: {donationInfo.donationPaymentId}</p>
          </div>

          {donationInfo.url && (
            <div className="previewfordonationlist__image">
              <img src={`${donationInfo.url}`} alt="" />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            className="mar-t-10"
            danger
            size="small"
            onClick={() => {
              setDeleteDonationListItemModal(true);
            }}
          >
            DELETE
          </Button>
        </div>

        {deleteDonationListItemModal && (
          <DeleteDonationListItemModal
            modalVisible={deleteDonationListItemModal}
            onClose={closeDeleteDonationModal}
            donationInfo={donationInfo}
            donationListQuery={donationListQuery}
          />
        )}
      </Card>
    </div>
  );
}

function DeleteDonationListItemModal(props) {
  const { modalVisible, onClose, donationInfo, donationListQuery } = props;

  function showSuccessDeleteOp() {
    Modal.success({
      title: "Successfully Deleted Donation.",
    });
    onClose();
  }
  function showFailDeleteOp() {
    Modal.error({
      title: "Failed To Delete Donation",
    });
  }
  function onConfirmDelete() {
    const queryData = {
      identifier: donationInfo.identifier,
    };

    donationRequests
      .deleteDonation(queryData)
      .then((res) => {
        if (res.status === "success") {
          showSuccessDeleteOp();
          donationListQuery.refetch();
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
      title="Delete Donation"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <p>Once deleted it cannot be restored.</p>
      <Button type="primary" size="large" danger onClick={onConfirmDelete}>
        DELETE DONATION
      </Button>
    </Modal>
  );
}

export default DonationList;
