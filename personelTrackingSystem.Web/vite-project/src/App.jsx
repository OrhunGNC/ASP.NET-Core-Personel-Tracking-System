import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const items1 = ["Home", "About", "Contact"].map((key) => ({
    key,
    label: (
      <Link style={{ textDecorationLine: "none " }} to={`/${key}`}>
        {key}
      </Link>
    ),
  }));
  return (
    <div className="container-fluid">
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            bottom:'0',
            left:'0',
            right:'0',
            position:'fixed'
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
