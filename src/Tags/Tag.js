import React,{useState} from 'react';
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
 import wordRequests from "../services/helpers/wordquery"
 
import {
 
  searchByTag
} from "../store/features/word/wordActions";
function Tag(props) {
  const tagword=props.location.state
    let [pagination, setPagination] = useState({
        start: 0,
        end: 10,
        pageSize: 10,
        total: 10,
        currentPage: 1,
      });
      
    let queryData = {
        tag: tagword,
        pagination: pagination,
      };
      console.log(queryData.tag)
    wordRequests
    .searchByTag(queryData)
    .then((res) => {
  console.log(res.itemListElement)
  console.log(res)
    })
    .catch((err) => {
  console.log(err)
    });
  


    console.log(props.location.state)
  return <div>

      <h1>hello</h1>
  </div>
}

export default withRouter(Tag);
