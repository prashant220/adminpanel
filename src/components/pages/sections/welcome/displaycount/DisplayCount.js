import React, { useState, useEffect } from "react";

import { Row, Col } from "antd";

import { useQuery } from "react-query";
import statRequests from "../../../../../services/helpers/statquery";
import { Link } from "react-router-dom";

import { DisplayCountCard } from "../../../../UIcomponents/index";

function DisplayCount() {
  const sentenceCount = useQuery(["countTotalSentence"], () =>
    statRequests.countTotalSentence()
  );
  const sherpaWordCount = useQuery(["countTotalSherpaWord"], () =>
    statRequests.countTotalSherpaWord()
  );
  // const transliterationCount = useQuery(["countTotalTransliteration"], () =>
  //   statRequests.countTotalTransliteration()
  // );
  const sentenceCategoryCount = useQuery(
    ["countTotalAvailableSentenceCategory"],
    () => statRequests.countTotalAvailableSentenceCategory()
  );
  const videoUrlCount = useQuery(["countTotalVideoUrl"], () =>
    statRequests.countTotalVideoUrl()
  );
  const newsArticleCount = useQuery(["countTotalNewsArticle"], () =>
    statRequests.countTotalNewsArticle()
  );

  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <Link to="/sentence">
            <DisplayCountCard title="Sentences" queryData={sentenceCount} />
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/word">
            <DisplayCountCard title="Words" queryData={sherpaWordCount} />
          </Link>
        </Col>
        {/* <Col span={6}>
          <Link to="/transliteration">
            <DisplayCountCard
              title="Transliterations"
              queryData={transliterationCount}
            />
          </Link>
        </Col> */}
        <Col span={6}>
          <Link to="/sentence">
            <DisplayCountCard
              title="Sentence Categories"
              queryData={sentenceCategoryCount}
            />
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/video">
            <DisplayCountCard title="Videos" queryData={videoUrlCount} />
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/article">
            <DisplayCountCard title="Articles" queryData={newsArticleCount} />
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default DisplayCount;
