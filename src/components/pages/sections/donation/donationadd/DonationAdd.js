import React, { useState, useEffect } from "react";

import { Form, Button, Input, Row, Col, Select, Upload } from "antd";

import donationRequests from "../../../../../services/helpers/donationquery";

import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const { Option } = Select;

function DonationAdd(props) {
  const { auth } = props;
  const videoAddForm = React.createRef();

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  let [donationImage, setDonationImage] = useState(null);

  const handleResetVideoAdding = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };

  const handleDonationImageChange = (e) => {
    let x = e.fileList[0].originFileObj;
    console.log(e);
    setDonationImage(x);
  };

  const handleAddVideoSubmit = (e) => {
    setIsLoading(true);

    let queryData = {
      name: e.name,
      userName: auth.user,
      donatedAmount: e.donatedAmount,
      donationPaymentPlatform: e.donationPaymentPlatform,
      donationPaymentId: e.donationPaymentId,

      location: e.address,

      image: donationImage,
    };

    // console.log(queryData);
    donationRequests
      .addUserDonation(queryData)
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
          <h3>successfully added donation entry !!!</h3>
          <Button onClick={handleResetVideoAdding} type="primary" size="large">
            Click to add another donation entry
          </Button>
        </>
      ) : (
        <div>
          <Form
            layout="vertical"
            onFinish={handleAddVideoSubmit}
            ref={videoAddForm}
          >
            {" "}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Donation Amount"
                  name="donatedAmount"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="Amount Here" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Donation Id"
                  name="donationPaymentId"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="Id here" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Donated By"
                  name="name"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="Name here" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Donor's Address"
                  name="address"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Input placeholder="Address Here" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Donation Platform"
                  name="donationPaymentPlatform"
                  extra=""
                  rules={[
                    {
                      required: true,
                      message: "Please fill  this field",
                    },
                  ]}
                >
                  <Select>
                    <Option value="BANK TRANSFER">BANK TRANSFER</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <p>Image: </p>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  // multiple={false}
                  //showUploadList={true}
                  //beforeUpload={beforeUpload}
                  onChange={handleDonationImageChange}
                  customRequest={dummyRequest}
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
                ADD DONATION
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
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(DonationAdd));
