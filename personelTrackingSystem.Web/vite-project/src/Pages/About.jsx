import React, { useState, useEffect } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Carousel from "./Component/Carousel";
const { Content, Sider } = Layout;
const About = ({ handleMenuItems }) => {
  const [about, setAbout] = useState("");
  const uri = "https://localhost:7010/";

  useEffect(() => {
    fetch(`${uri}api/System`)
      .then((response) => response.json())
      .then((data) => setAbout(data[0].aboutUs));
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const imageSources = [
    "../img/wissen_featured.jpg",
    "../img/8fce3848eeec452e8b346fbf0ac808df3- WİSSEN TECH.png"
  ];

  return (
    <Layout
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Content
        style={{
          minHeight: 280,
        }}
      >
        <div className="container" style={{textAlign:'center'}}>
        <Carousel imageSources={imageSources} />
        <p style={{marginBottom:'10%',fontSize:'large'}}>{about}</p>
        </div>
      

      </Content>
    </Layout>
  );
};

export default About;
