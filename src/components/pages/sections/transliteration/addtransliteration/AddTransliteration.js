import React, { useState, useEffect } from "react";

import {
  Form,
  Button,
  Upload,
  Input,
  Row,
  Col,
  Space,
  Select,
  Tag,
} from "antd";

import transliiterationRequests from "../../../../../services/helpers/transliterationquery";
import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";

function AddTransliteration(props) {
  const transliterationAddForm = React.createRef();

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleReset = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
    setIsSuccessfull(false);
  };

  const handleAddTransliterationSubmit = (e) => {
    // console.log(e);
    setIsLoading(true);

    let queryData = {
      transliterationInSambhota: e.transliterationInSambhota,
      transliterationInRoman: e.transliterationInRoman,
      transliterationInDevanagari: e.transliterationInDevanagari,
    };

    // console.log(queryData);
    transliiterationRequests
      .addTransliteration(queryData)
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
          <h3>successfully added transliterration !!!</h3>
          <Button onClick={handleReset} type="primary" size="large">
            Click to add another transliteration
          </Button>
        </>
      ) : (
        <div>
          <Form
            layout="vertical"
            onFinish={handleAddTransliterationSubmit}
            ref={transliterationAddForm}
          >
            {" "}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Transliteration In Sambhota"
                  name="transliterationInSambhota"
                  // extra="eg:  ङ क्षु थुङगु"
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
                  label="Transliteration in Roman"
                  name="transliterationInRoman"
                  // extra="eg:  ङ क्षु थुङगु"
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
                  label="Transliteration In  Devanagiri"
                  name="transliterationInDevanagari"
                  // extra="eg:  ङ क्षु थुङगु"
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
                loading={isLoading}
              >
                ADD TRANSLITERATION
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
  return {};
};

export default withRouter(connect(mapStateToProps)(AddTransliteration));
