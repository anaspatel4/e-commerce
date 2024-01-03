import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Row, Col } from "antd";
import "./Edit.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
  const [titles, setTitles] = useState("");
  const [prices, setPrices] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [categoryies, setCategoryies] = useState("");
  const [ratings, setRatings] = useState("");
  const navigates = useNavigate();
  // const [updatesId, setUpdatesID] = useState("");

  console.log(titles);
  const { id } = useParams();


  useEffect(() => {
    getbyid(id);
  }, [id]);

  const getbyid = async (id) => {
    const responses = await axios.get(`http://localhost:3000/posts/${id}`);
    console.log(responses.data.title, "test");
    setTitles(responses.data.title);
    setPrices(responses.data.price);
    setDescriptions(responses.data.description);
    setCategoryies(responses.data.category);
    setRatings(responses.data.rating);
  };


  const edituser = async () => {
    const edited = await axios.put(`http://localhost:3000/posts/${id}`, {
      title: titles,
      price: prices,
      description: descriptions,
      category: categoryies,
      rating: ratings,
    });
  };

 
  const gobacktohome = () =>{
    navigates('/')
   };

   
  return (
    <div className="editformfield">
      <div className="editforminputfield">
        <h5>Edit card</h5>
        <div className="inputfields">
          <Row>
          <div className="col-md-6 col-lg-12">
              Titles&nbsp;<span className="text-danger">*</span>
              <Input
                value={titles}
                onChange={(e) => {
                  setTitles(e.target.value);
                }}
              /><br></br><br></br>
              Prices&nbsp;<span className="text-danger">*</span>
              <Input
                value={prices}
                onChange={(e) => {
                  setPrices(e.target.value);
                }}
              /><br></br><br></br>
              Category&nbsp;<span className="text-danger">*</span>
              <Input
                value={categoryies}
                onChange={(e) => {
                  setCategoryies(e.target.value);
                }}
              /><br></br><br></br>
              Description&nbsp;<span className="text-danger">*</span>
              <Input
                value={descriptions}
                onChange={(e) => {
                  setDescriptions(e.target.value);
                }}
              /><br/><br/>
              Ratings&nbsp;<span className="text-danger">*</span>
              <Input
                value={ratings}
                onChange={(e) => {
                  setRatings(e.target.value);
                }}
              />
            </div>
          </Row>
        </div>
        <div className="editpagebuttons">
        <div className="backbutton">
        <Button onClick={gobacktohome}  htmlType="submit">
          Back
        </Button>
        </div>
        <div className="createbutton">
        <Button onClick={edituser}  htmlType="submit">
          Create
        </Button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
