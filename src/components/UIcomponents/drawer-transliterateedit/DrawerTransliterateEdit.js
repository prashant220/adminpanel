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
  Tag,
  Select,
} from "antd";

import { useDispatch, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import transliiterationRequests from "../../../services/helpers/transliterationquery";

const { Dragger } = Upload;
const { Option } = Select;

function DrawerTransliterateEdit(props) {
  const updateForm = React.createRef();

  const { drawerVisible, closeDrawer, transliterateInfo, fetchDetails } = props;

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);
  let [isSuccessfull, setIsSuccessfull] = useState(false);

  let onClose = () => {
    closeDrawer(false);
    fetchDetails();
    //refetch the details
  };

  useEffect(() => {
    transliterateInfo &&
      transliterateInfo.transliterateDetail &&
      updateForm.current.setFieldsValue({
        transliterationInSambhota:
          transliterateInfo.transliterateDetail.transliterationInSambhota,
        transliterationInRoman:
          transliterateInfo.transliterateDetail.transliterationInRoman,
        transliterationInDevanagari:
          transliterateInfo.transliterateDetail.transliterationInDevanagari,
      });
  }, []);

  let handleEditSubmit = (e) => {
    // console.log(e);

    setIsLoading(true);

    let queryData = {
      transliterationInSambhota: e.transliterationInSambhota,

      transliterationInDevanagari: e.transliterationInDevanagari,

      identifier: transliterateInfo.identifier,
    };

    transliiterationRequests
      .updateTransliteration(queryData)
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
          <Form layout="vertical" onFinish={handleEditSubmit} ref={updateForm}>
            {" "}
            <Row gutter={16}>
              <Col span={24}>
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
                  <Input placeholder="" disabled={true} />
                </Form.Item>
              </Col>

              <Col span={24}>
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

              <Col span={24}>
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
                // icon={<PlusOutlined />}
                htmlType="submit"
                loading={isLoading}
              >
                UPDATE
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
}

// connect  redux  store
const mapStateToProps = (state) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(DrawerTransliterateEdit));
