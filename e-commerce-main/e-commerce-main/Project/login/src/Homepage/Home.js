import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";
import img1 from "../images/img123.svg";
import { AiOutlineSearch, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Input, Button, Card, Popover, Drawer, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const imagesource = localStorage.getItem("image");

function Home() {
  const [info, setInfo] = useState([]);
  const [searchtitle, setSearchtitle] = useState("");
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nid, setNid] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const gettingdata = await axios.get("http://localhost:3000/posts");
    console.log(gettingdata.data);
    setInfo(gettingdata.data);
  };

  const getttingui = async () => {
    const gettingdata = await axios.get(
      `https://dummyjson.com/users/${getuserid}`
    );
    console.log(gettingdata.data);
    setDrawer(gettingdata.data);
  };

  const gotocreate = () => {
    navigate("/create");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const deleteuser = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
  };

  const showModal = (id) => {
    setIsModalOpen(true);
    setNid(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    deleteuser(nid);
    getdata();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const clearstorage = useNavigate();
  const logout = () => {
    localStorage.clear();
    clearstorage("/login");
  };

  const getuserid = localStorage.getItem("userid");

  return (
    //  first sticky navbar
    <div className="mainclass">
      <div className="topnavbar">
        <div className="header">
          <img src={img1} style={{ width: "50%" }} alt=""></img>
        </div>

        <div className="sourceimage">
          <Popover
          placement="left"
            content={
              <div className="hoverbuttons">
                <Button
                  className="useridbutton"
                  type="primary"
                  onClick={() => {
                    showDrawer();
                    getttingui();
                  }}
                >
                  UserID
                </Button>
                <Button className="logoutbutton" onClick={logout}>
                  Logout
                </Button>
              </div>
            }
          >
            <img className="inlinesourceimage" src={imagesource} alt=""></img>
          </Popover>
        </div>
      </div>

      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <img></img>
        <p>{drawer.firstName}</p>
        <p>{drawer.lastName}</p>
        <p>{drawer.maidenName}</p>
        <p>{drawer.age}</p>
        <p>{drawer.email}</p>
        <p>{drawer.birthDate}</p>
        <p>{drawer.gender}</p>
      </Drawer>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure</p>
      </Modal>
      <div className="bottomnavbar">
        <div className="searchinputfeild">
          <Input
            placeholder="search products"
            prefix={<AiOutlineSearch />}
            onChange={(e) => setSearchtitle(e.target.value)}
          />
        </div>
        <div className="addnew">
          <Button ghost onClick={gotocreate}>
            Create
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {info
            .filter((value) => {
              if (searchtitle === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(searchtitle.toLowerCase())
              ) {
                return value;
              }
            })
            .map((element) => (
              <div className="col-md-6 col-lg-4">
                <div className=" px-4 py-5 h-95">
                  <div className="cards">
                    <Card
                      hoverable
                      cover={
                        <img
                          className="imagehover"
                          style={{ height: 150 }}
                          alt="example"
                          src={element.image}
                        />
                      }
                      actions={[
                        <AiFillEdit
                          onClick={() => {
                            navigate(`/edit/${element.id}`);
                          }}
                          key="edit"
                        />,
                        <AiFillDelete
                          onClick={() => {
                            showModal(element.id);
                          }}
                          key="setting"
                        />,
                      ]}
                    >
                      <div className="contents">
                        <p
                          className="onhovering"
                          onClick={() => navigate(`/description/${element.id}`)}
                        >
                          title:{element.title}
                        </p>
                        <p className="bolds">price:{element.price}</p>
                        <p className="bolds">category:{element.category}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Home;