import React, { useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {  Layout, Menu, theme  } from 'antd';
import Salaries from './HomePages/Salaries';
import AnnualLeaves from './HomePages/AnnualLeaves';
import LateArrivals from './HomePages/LateArrivals';
import Entries from './HomePages/Entries';
import Departments from './HomePages/Departments';
import Teams from './HomePages/Teams';
import Projects from './HomePages/Projects';
import Personels from './HomePages/Personels';
import Users from './HomePages/Users';
import Systems from './HomePages/Systems';
const { Content,  Sider } = Layout;

const Home = () => {
  const [pageSelector, setPageSelector] = useState();
  function selectPage(selectedKeys) {
    setPageSelector(selectedKeys);
    sessionStorage.setItem("key", selectedKeys);

  }
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Personel Events", "sub1", <UserOutlined />, [
      getItem("Salaries", "1"),
      getItem("Annual Leaves", "2"),
      getItem("Late Arrivals", "3"),
      getItem("Personel Entry Hours", "4"),
    ]),
    getItem("Data Tables", "sub2", <NotificationOutlined />, [
      getItem("Personel List", "5"),
      getItem("Department List", "6"),
      getItem("Project List", "7"),
      getItem("Team List", "8"),
      getItem("User List", "9"),
    ]),
    getItem("System Info", "sub3", <LaptopOutlined />, [
      getItem("Change System Info", "10"),
    ]),
  ];
  const defaultSelectedKey = sessionStorage.getItem("key") || "1";

  const onSelect = ({ key, keyPath }) => {
    const selectedSubmenuKey = keyPath[1];
    sessionStorage.setItem('subkey',selectedSubmenuKey)
    selectPage(key);
  };
  return (
    
<Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[defaultSelectedKey]}
              defaultOpenKeys={[sessionStorage.getItem('subkey')|| 'sub1']}
              onClick={onSelect}
              style={{
                height: '100%',
              }}
              items={items}

            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            { (sessionStorage.getItem("key")==null||sessionStorage.getItem("key")==1) && (
              <Salaries/>
            )
            }
            { sessionStorage.getItem("key")==2 && (
              <AnnualLeaves/>
            )
            }
            { sessionStorage.getItem("key")==3 && (
              <LateArrivals/>
            )
            }
            { sessionStorage.getItem("key")==4 && (
              <Entries/>
            )
            }
            { sessionStorage.getItem("key")==5 && (
              <Personels/>
            )
            }
            { sessionStorage.getItem("key")==6 && (
              <Departments/>
            )
            }
            { sessionStorage.getItem("key")==7 && (
              <Projects/>
            )
            }
            { sessionStorage.getItem("key")==8 && (
              <Teams/>
            )
            }
            { sessionStorage.getItem("key")==9 && (
              <Users/>
            )
            }
            { (sessionStorage.getItem("key")==10 && sessionStorage.getItem('role')=="Admin") && (
              <Systems/>
            )
            }
            { (sessionStorage.getItem("key")==10 && sessionStorage.getItem('role')!=="Admin") && (
              alert("You have to be admin to reach this page!")
            )
            }

          </Content>
        </Layout>
    
    
  )
}

export default Home