import React from "react";
import "./styles.css";
import { Card } from "antd";

export default function DisplayCountCard(props) {
  const { title } = props;
  const { data, isLoading, error } = props.queryData;

  return (
    <div>
      <Card loading={isLoading} hoverable>
        {data && (
          <div className="displaycountcard__content">
            <p className="displaycountcard__content-count">{data.value}</p>
            <p className="displaycountcard__content-title">{title}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
