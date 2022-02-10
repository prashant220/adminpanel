import React,{useState,useEffect} from "react";

import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import axios from "axios";
import PrivateRoute from "./components/routes/PrivateRoute";
import { connect, useDispatch,useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import {  Redirect, withRouter } from "react-router-dom";
//react query setup
import { QueryClient, QueryClientProvider } from "react-query";
import Tag from "./Tags/Tag";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        
      <Route path="/login" component={Login} />
       <PrivateRoute path="/" component={Dashboard} />
        
 
       
        
     
     
        
        
      
      </Switch>
    </QueryClientProvider>
  );
}

export default App;