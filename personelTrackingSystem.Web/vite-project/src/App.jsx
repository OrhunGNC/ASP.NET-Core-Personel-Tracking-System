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
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Link style={{width:'7%',height:'90%',marginRight:'8%'}} to={'/'}><img src="../img/toplogo.png" alt="wissen-logo"  /></Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
              fontSize:'1.25em',
              color:'white'
            }}
          />
        </Header>
        <Content>
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
            position:'fixed',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Orhun Cem Gença
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
