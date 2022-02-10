import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "./styles.css";

import { Row, Col, Card, Pagination, Button, Spin, Modal } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import userRequests from "../../../services/helpers/listuserquery";

import { useQuery } from "react-query";

export default function LiistUsers() {
  let [pagination, setPagination] = useState({
    start: 0,
    end: 10,
    pageSize: 10,
    total: 10,
    currentPage: 1,
  });

  let queryDataUserlist = {
    pagination: pagination,
  };

  const userListCount = useQuery(["countUserLists"], () =>
    userRequests.countUserLists()
  );
  const userList = useQuery(
    ["listUserCountss", [queryDataUserlist]],
    () => userRequests.listUserCounts(queryDataUserlist)
  );
  useEffect(() => {
   console.log(userList)
    setPagination({
      ...pagination,
      total: userListCount.data && userListCount.data.value,
    });
  }, [userListCount.data]);
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
    userListCount.refetch();
    userList.refetch();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 150
    },
    {
      title: "Username",
      dataIndex: "Username",
      width: 150
    },
    {
      title: "Description",
      dataIndex: "Description",
      width: 150
    },
    {
      title: "ApprovedStatus",
      dataIndex: "ApprovedStatus",
      width: 150
    },
    // {
    //   title: "createdDate",
    //   dataIndex: "createdDate",
    //   width: 150
    // },

  ];

  const [state, setstate] = useState([]);
   const[status,setStatus]=useState(false)
    useEffect(()=>{
      
      setstate(
        userList.data&&
        userList.data.itemListElement.length &&
        userList.data.itemListElement.map(item=>({
     Name:item.name,
     Email:item.email,
     Username:item.userName,
     Description:item.description,
     ApprovedStatus:"true"
        
        }))
     
      )
      
 
    
    })
  

  
 
  return(
    <div className="videolist__container">
    <div className="refresh_button_container">
      <Button
        size="large"
        type="primary"
        icon={<RedoOutlined />}
        onClick={refreshAllData}
       
      >
        Refresh
      </Button>
      </div>
      {userListCount.data && (
        <div className="wordlist__wordcount">
          <p>Total Users : {userListCount.data.value}</p>
          <p>/</p>
          <p>Page: {pagination.currentPage}</p>
        </div>
      )}
        {userList.isFetching && (
        <div>
          <Spin />
        </div>
      )}
         <Row >
        
        
           
              <Col span={12} >
          
         
      
              <Table
              
              columns={columns} dataSource={state}   
             pagination={false}
            
           />
        
    
            
              </Col>
    
              </Row>
    
   
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={handlePagination}
      /> 
     
  
    </div>
  )
}

