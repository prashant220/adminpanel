import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { clearAuth } from "../../../store/features/auth/authSlice";
import { Link, withRouter } from "react-router-dom";

import { logIn } from "../../../store/features/auth/authActions";

import "./styles.css";
import axios from "axios";
import LogoGrowNepal from "../../../images/logo.png";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login(props) {
  const { auth } = props;
  const dispatch = useDispatch();
const[user,setUser]=useState("")
const[role,setRole]=useState("")
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (e) => {
    const credentials = {
      userName: e.username,
      userPassword: e.password,
      
    };
    dispatch(logIn(credentials, props.history));

  };

 
console.log(auth.token)
  useEffect(() => {
    if (auth.error) {
      dispatch(clearAuth());
    }
  }, []);



      useEffect(() => {
        if (auth.token ) {
          props.history.push("/");
        }
     
      }, []);
     
    

  return (
    <div className="login__page__container">
      <div className="login__page__form-container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <img src={LogoGrowNepal} />
        </div>
        <Form
          //   {...layout}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {auth.error && <p style={{ color: "red" }}>{auth.error.message}</p>}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={auth.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
