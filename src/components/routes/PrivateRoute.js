import React, { useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect, useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { checkIfUserIsAuthenticated } from "../../store/features/auth/authActions";

const PrivateRoute = (props) => {
  const dispatch = useDispatch();
const token=useSelector(state=>state.auth)
const[role,setRole]=useState(false)
console.log(token.isAuthenticated)
  const { component: Component, isAuthenticated, ...rest } = props;

  // get the state of currently logged in user  and  then  logout handled in redux
  useEffect(() => {
    dispatch(checkIfUserIsAuthenticated(props.history));
   

  });
  useEffect(() => {
    dispatch(checkIfUserIsAuthenticated(props.history));

  });
 

  
 
 
  
  useEffect(()=>{

    var data = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "getUserType",
    
      data: {
        "@context": "http://semantro.com/", 
        "@type": "User",
        userName: token.user,
      },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("data", JSON.stringify(data))
    axios({
      method: "post",
      url: "https://jambulingsherpa.org/sherpadictionary-web-interface/query",
  
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        accessToken: token.token,
      },
    })
      .then((response) => {
    
      console.log(response.roleName)
      if(response.roleName==="ADMIN"){
        setRole(true)
      }
       
      })
  
      .catch((error) => {
        console.log(error);
      });
  },[])




  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated  ? <Component {...props} /> : <Redirect to="/login" />
      }
     
       
     
    />
    
   
    
  );
};

const mapStateToProps = (state) => {
  // console.log('state', state);

  return {
    isAuthenticated: state.auth.token ? true : false,
  
 
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
