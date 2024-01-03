import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  GoogleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/reset.css";
import "./Loginpage.scss";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const gettingdata = async () => {
    await axios
      .post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("image", res.data.image);
        localStorage.setItem("userid", res.data.id);
      })
      .catch((err) => message.error(err.response.data.message));
    const tokenused = localStorage.getItem("token");
    if (tokenused) {
      navigate("/");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="formfield">
      <div className="forminputfield">
        <h3>Login.</h3>
        <Form
          layout="vertical"
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            prefix={<UserOutlined />}
            label="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          prefix={<UserOutlined />}
            label="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            rules={[{ required: true, message: "Please input your password!" }]} 
          >
            <Input.Password />
          </Form.Item>

          <div className="allicons" style={{ fontSize: "27px" }}>
            <div className="facebook">
              <FacebookOutlined />
            </div>
            <br></br>
            <div className="twitter">
              <TwitterOutlined />
            </div>
            <br></br>
            <div className="google">
              <GoogleOutlined />
            </div>
          </div>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
            <Button
              onClick={() => {
                gettingdata();
              }}
              className="inputbutton"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Loginpage;
