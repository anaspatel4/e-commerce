import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./Create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const createnew = () => {
    let response = axios.post("http://localhost:3000/posts", {
      title,
      price,
      category,
      description,
      rating,
    });
    console.log(response.data);
    // console.log(name, price, description, category)
  };

  const navigating = useNavigate();

  const returningtohomepage = () => {
    navigating("/");
  };

  return (
    <div className="col-md-6 col-lg-12">
    <div className="createformfield">
      <div className="createforminputfield">
        <h5>Create new card</h5>
        <Form layout="vertical" style={{ maxWidth: 1000 }}>
          <Form.Item label="Title" name="title">
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Rating" name="rating">
            <Input
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </Form.Item>
          <div className="createpagebuttons">
            <div className="backbutton">
              <Button onClick={returningtohomepage} htmlType="submit">
                Back
              </Button>
            </div>
            <div className="createbutton">
              <Button onClick={() => createnew()} htmlType="submit">
                Create
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default Create;
