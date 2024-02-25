import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link,useNavigate  } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { Button, Layout, Menu } from "antd";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import {LogoutOutlined } from "@ant-design/icons"

const { Header, Content, Footer } = Layout;

function App() {
  const [role, setRole] = useState(sessionStorage.getItem('role') || '');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('auth'));


  useEffect(() => {
    setRole(sessionStorage.getItem('role') || '');
    sessionStorage.setItem('auth',sessionStorage.getItem('role')=="")
    setIsAuthenticated(role!=="");
  }, []);
const onLogout = ()=>{
  console.log("etkinleşti");
  sessionStorage.clear();
  setRole(sessionStorage.getItem('role') || '');
    sessionStorage.setItem('auth',sessionStorage.getItem('role')=="")
    setIsAuthenticated(role!=="");
            navigate('/');
            window.location.reload();

}
  const items1 = isAuthenticated
  ? ["Home", "About", "Contact"].map((key) => ({
    key,
    label: (
      <Link style={{ textDecorationLine: "none " }} to={isAuthenticated ? `/${key}` : '/'}>
        {key}
      </Link>
    ),
  })):"";

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
          <Link style={{width:'7%',height:'90%',marginRight:'8%'}} to={isAuthenticated ? `/Home` : '/'}><img src="../img/toplogo.png" alt="wissen-logo"  /></Link>
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
           { isAuthenticated===true && (
              <Button onClick={onLogout}><LogoutOutlined /></Button>
            )}
          
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Register" element={<Register />} />

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
