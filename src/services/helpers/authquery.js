import api from "../api";
import to from "await-to-js";

import { connect, useDispatch,useSelector } from "react-redux";

const authRequests = {
  
  loginAdminUser: async (queryData) => {
    let a = {
      userName: "info@integratedict.com.np",
      userPassword: "mypassword",
    };

    let queryFormat = {
      ...a,
      userName: queryData.userName,
      userPassword: queryData.userPassword,
    };

    let [error, response] = await to(api.LOGIN(queryFormat));
    console.log(error, response);

    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  // roleUser:async(getState)=>{

  //   var data = {
  //     "@context": "http://semantro.com/",
  //     "@type": "DictionarySearch",
  //     actionName: "getUserType",
    
  //     data: {
  //       "@context": "http://semantro.com/", 
  //       "@type": "User",
  //       userName: token.user,
  //     },
  //   };
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("data", JSON.stringify(data))
  //   axios({
  //     method: "post",
  //     url: "https://jambulingsherpa.org/sherpadictionary-web-interface/query",
  
  //     data: bodyFormData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       accessToken: token.token,
  //     },
  //   })
  //     .then((response) => {
    
  //     console.log(response.roleName)
  //     if(response.roleName==="ADMIN"){
  //       setRole(true)
  //     }
       
  //     })
  
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // },
  getUserDetail: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getUserDetail",
      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        userName: "sachingiri619@gmail.com",
      },
    };

    const { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        userName: queryData.userName,
      },
    };

    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));


    if (response.status === "fail") {
      throw {...error };
    } else {
      return response;
  
    }
  },
};

export default authRequests;


