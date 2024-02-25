import React from 'react'
import axios from "axios";
import { Button,Input ,Form} from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const uri = "https://localhost:7010/";
    const navigate = useNavigate(); 
    const [form] = Form.useForm();
      const handleNew=()=>{
          form
          .validateFields()
          .then((values)=>{
              const postRequest={
                  eMail:values.eMail,
                  password:values.password,
                  nameSurname:values.nameSurname,
                  phone:values.phone,
                  role:values.role
              };

              axios
              .post(`${uri}api/User`,postRequest)
              .then((response)=>{
                  console.log("Başarıyla Gerçekleşti",response.data);
                  form.resetFields();
                  navigate('/ ');
              })
              .catch((error)=>{console.error(error);
              });
          })
          .catch((error)=>console.error(error));
        

      };
      
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}>
   
   <img style={{ width: '30%', marginBottom: "1%" }} src='../img/wissen_featured.jpg' alt='wissen-foto'></img>

        <Form
        form={form}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    
    <Form.Item
      label="E Mail"
      name="eMail"
      rules={[
        {
          required: true,
          message: 'Please input e-mail!',
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
          message: 'Please input the password!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Name Surname"
      name="nameSurname"
      rules={[
        {
          required: true,
          message: 'Please input the name surname!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input the phone!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Role"
      name="role"
      rules={[
        {
          required: true,
          message: 'Please input the role!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button style={{alignItems:'center',width:'60%'}} onClick={handleNew} type="primary" >
        Register
      </Button>
    </Form.Item>
  </Form>
     
    </div>
    
  )
}

export default Register