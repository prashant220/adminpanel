import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { Row, Col, Button, Spin } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import ScrollMenu from "react-horizontal-scrolling-menu";
import transliterationRequests from "../../../../../services/helpers/transliterationquery";

import TransliteratePreview from "../../../../UIcomponents/transliteratepreview/TransliteratePreview";

export default function ListTransliterate() {
  let [listTransliterateAlphabet, setListTransliterateAlphabet] = useState("a");
  let [transliterateList, setTransliterateList] = useState({
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    getTransliterateList();
  }, [listTransliterateAlphabet]);

  let getTransliterateList = () => {
    setTransliterateList({
      ...transliterateList,
      isLoading: true,
    });
    let queryData = {
      wordEntry: listTransliterateAlphabet,
    };
    transliterationRequests
      .searchTransliteration(queryData)
      .then((res) => {
        if (res.itemListElement) {
          setTransliterateList({
            ...transliterateList,
            isLoading: false,
            isError: false,
            error: false,
            data: res.itemListElement,
          });
        }
        // console.log(res);
      })
      .catch((err) => {
        setTransliterateList({
          ...transliterateList,
          isLoading: false,
          isError: true,
          error: err,
        });
        // console.log(err);
      });
  };

  const refreshAllData = () => {
    getTransliterateList();
  };
  return (
    <div className="listtransliterate__container">
      <div className="refresh_button_container" style={{ margin: "20px" }}>
        <Button
          type="primary"
          icon={<RedoOutlined />}
          size="large"
          onClick={refreshAllData}
        >
          Refresh
        </Button>
      </div>

      {/* {alphabets && alphabets.map((alphabet) => <p>{alphabet}</p>)} */}
      {/* <div className="listtransliterate__alphabets-container">
            <div className="listtransliterate__alphabet-container">
              <span className="listtransliterate__aphabet">A</span>
            </div>
          </div> */}

      <div className="listtransliterate__alphabets-container">
        <ScrollMenu
          data={Menu(alphabets, listTransliterateAlphabet)}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          // selected={selected}
          onSelect={setListTransliterateAlphabet}
        />
      </div>

      <div style={{ margin: "20px" }}>
        <h2>selected alphabet : {listTransliterateAlphabet} </h2>
      </div>

      {transliterateList.isLoading && <Spin />}
      <div className="listtransliterate__list-container">
        {transliterateList.data && transliterateList.data.length === 0 && (
          <p>No list found</p>
        )}
        <Row gutter={[16, 16]}>
          {transliterateList.data &&
            transliterateList.data.length > 0 &&
            transliterateList.data.map((item) => {
              return (
                <Col
                  key={item.identifier}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <TransliteratePreview transliterateInfo={item} />
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}

const alphabets = [];
for (let i = 10; i < 36; i++) {
  alphabets.push(i.toString(36));
}

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
  // console.log(text, selected);
  return (
    <div className="listtransliterate__alphabet-container">
      <span
        className={
          text === selected
            ? "listtransliterate__alphabet-selected "
            : "listtransliterate__aphabet"
        }
      >
        {text}
      </span>
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) => {
  // console.log(list, selected);

  return list.map((el) => {
    return (
      <div key={el}>
        <MenuItem text={el} selected={selected} />
      </div>
    );
  });
};

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });
