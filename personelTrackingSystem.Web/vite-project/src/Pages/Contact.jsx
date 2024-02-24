import React, { useEffect,useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {  Layout, Menu, theme  } from 'antd';
const { Content,  Sider } = Layout;

const Contact = () => {
  const [contact, setContact] = useState("")
  const uri = "https://localhost:7010/";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(()=>{
    fetch(`${uri}api/System`)
    .then(response=>response.json())
    .then(data=>{
      const contactData = data;
      console.log(contactData)
      console.log(contactData[0].communication)
      setContact(contactData[0].communication)
    
    })
    .catch(error=>console.error(error));
  },[])
  return (
    <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <h3 style={{color:'darkblue'}}>Bahçeşehir Üniversitesi | Wissen</h3>
            <br/>
            <span style={{fontSize:'30px',color:'grey'}}>Adres : {contact}</span>
            <h5 style={{color:'grey'}}>Tel: 0212 381 50 00</h5>
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.138483078675!2d29.006816399999998!3d41.0441006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a24975fe5d%3A0xa05d7aa13cfcaf89!2sBah%C3%A7e%C5%9Fehir%20%C3%9Cniversitesi%20Wissen%20Akademie!5e0!3m2!1str!2str!4v1708776637186!5m2!1str!2str"
  width={'100%'}
  height={600}
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

          </Content>
        </Layout>
  )
}

export default Contact