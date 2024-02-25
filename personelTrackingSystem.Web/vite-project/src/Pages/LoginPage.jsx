import React,{useState} from 'react'
import {  Link,useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { jwtDecode } from 'jwt-decode'
import axios from "axios";



const LoginPage = () => {
    const uri = "https://localhost:7010/";
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [token, setToken] = useState("")
    const onFinish=()=>{
        form
        .validateFields()
        .then((values)=>{
            const postRequest={
                eMail:values.eMail,
                password:values.password,
            };
            console.log(postRequest)
            axios
            .post(`${uri}api/User/Login`,postRequest)
            .then((response)=>{
                console.log(response.data);
                setToken(response.data);
                const token = response.data;
                const user = jwtDecode(token);
                const userRole = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                sessionStorage.setItem('token',token);
                sessionStorage.setItem('role',userRole);
                sessionStorage.setItem('auth',sessionStorage.getItem('role')!=="");
                form.resetFields();
                navigate('/Home');
                window.location.reload();
            })
            
            .catch((error)=>{console.error(error);
                alert("Wrong E-Mail or password");
            });
        })
        .catch((error)=>console.error(error));
      

    };
  return (
    <>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <img style={{ width: '30%', marginBottom: "3%" }} src='../img/wissen_featured.jpg' alt='wissen-foto'></img>
        
        <Form
        form={form}
    name="basic"
    style={{
        width: '30%',
      }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    
    <Form.Item
      label="E-Mail"
      name="eMail"
      rules={[
        {
          required: true,
          message: 'Please input your e-mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button style={{alignItems:'center',width:'60%'}} type="primary" onClick={onFinish} >
        Login
      </Button>
    </Form.Item>
    <Form.Item>
        <Link to={"/Register"}>
        <button className='register' style={{color:'grey',border:'none',width:'100%',backgroundColor:'transparent'}}>If you don't have an account click here!</button>
        </Link>
    </Form.Item>
  </Form>
      </div>
    </>
    
        

  )
}

export default LoginPage