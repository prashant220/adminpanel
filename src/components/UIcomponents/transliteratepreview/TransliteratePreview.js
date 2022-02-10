import React, { useState, useEffect } from "react";

import "./styles.css";

import transliterationRequests from "../../../services/helpers/transliterationquery";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Row, Col, Button } from "antd";
import { SoundOutlined, CopyOutlined } from "@ant-design/icons";

export default function TransliteratePreview(props) {
  const { transliterateInfo } = props;

  let [transliterateDetail, setTransliterateDetail] = useState({
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    getTransliterateList();
  }, []);

  let getTransliterateList = () => {
    let queryData = {
      identifier: transliterateInfo.identifier,
    };
    transliterationRequests
      .getDetailsOfTransliteration(queryData)
      .then((res) => {
        if (res) {
          setTransliterateDetail({
            ...transliterateDetail,
            isLoading: false,
            isError: false,
            error: false,
            data: res,
          });
        }
        // console.log(res);
      })
      .catch((err) => {
        setTransliterateDetail({
          ...transliterateDetail,
          isLoading: false,
          isError: true,
          error: err,
        });
        // console.log(err);
      });
  };
  // console.log(transliterateDetail);

  return (
    <div className="transliteratepreview__container">
      {transliterateDetail.data && (
        <>
          <div className="transliteratepreview__line1">
            <p>
              <span className="color-gray">Sambhota :</span>{" "}
              <span className="transliteratepreview__translation">
                {transliterateDetail.data.transliterationInSambhota}
              </span>
              <CopyToClipboard
                text={transliterateDetail.data.transliterationInSambhota}
              >
                <Button type="primary" size="small" className="mar-l-10">
                  <CopyOutlined />
                </Button>
              </CopyToClipboard>
            </p>
            <p>
              <span className="color-gray">Roman :</span>{" "}
              <span className="transliteratepreview__translation">
                {transliterateDetail.data.transliterationInRoman}
              </span>
              <CopyToClipboard
                text={transliterateDetail.data.transliterationInRoman}
              >
                <Button type="primary" size="small" className="mar-l-10">
                  <CopyOutlined />
                </Button>
              </CopyToClipboard>
            </p>
            <p>
              <span className="color-gray">Devanagiri :</span>{" "}
              <span className="transliteratepreview__translation">
                {transliterateDetail.data.transliterationInDevanagari}
              </span>
              <CopyToClipboard
                text={transliterateDetail.data.transliterationInDevanagari}
              >
                <Button type="primary" size="small" className="mar-l-10">
                  <CopyOutlined />
                </Button>
              </CopyToClipboard>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
