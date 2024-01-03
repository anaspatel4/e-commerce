import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Description.scss";

function Description() {
  const [display, setDisplay] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    displaydata(id);
  }, []);

  const displaydata = async (id) => {
    const displayingdata = await axios.get(`http://localhost:3000/posts/${id}`);
    setDisplay(displayingdata.data);
  };

  return (
<div className="descriptiondetails">
    <div className="imagedetail">
    <img className="imagedetails" src={display.image}/>
    </div>
    <div className="productdetails">
      <p>Title:{display.title}</p>
      <p>Price:{display.price}</p>
      <p>Description:{display.description}</p>
      <p>Category:{display.category}</p>
    </div>
    </div>
  );
}

export default Description;
