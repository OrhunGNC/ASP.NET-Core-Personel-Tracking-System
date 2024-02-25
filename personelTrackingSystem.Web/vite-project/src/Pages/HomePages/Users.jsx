import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';

const Users = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
    const [formNew] = Form.useForm();
    const [users, setUsers] = useState([""])
    useEffect(()=>{
        fetch(`${uri}api/User`)
        .then(response=>response.json())
        .then(data=>{setUsers(data);
        })
        .catch(error=>console.error(error));
    },[])

  const openModal =()=>{
    setOpenDelete(true);
  }
  const hideModal =()=>{
    setDeleteId(null);
    setDeleteId("");
    setOpenDelete(false);
  }
    const fetchAgain=()=>{
        fetch(`${uri}api/User`)
        .then(response=>response.json())
        .then(data=>{setUsers(data);
        })
        .catch(error=>console.error(error));
    }





    const editContent = (record)=>{
  setOpenNew(true);
  formNew.setFieldsValue(record);

    }
    const columns = [
        {
          title: 'User ID',
          dataIndex: 'id',
        },
        {
          title: 'E-Mail',
          dataIndex: 'eMail',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Password',
          dataIndex: 'password',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
            title: 'Name Surname',
            dataIndex: 'nameSurname',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
          {
            title: 'Role',
            dataIndex: 'role',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
        {
            title: 'Action',
            key:'id',
            render:(text,record)=>(
                <Space>
                    <button onClick={()=>{
                        editContent(record);

                    }}
                    style={{backgroundColor:'transparent',border:'0px',color:'blue'}}
                    >Edit</button>
                    <button onClick={()=>{
                      setDeleteId(record.id)
                        openModal(record);
                    }}
                    style={{backgroundColor:'transparent',border:'0px',color:'red'}} 
                    >Delete</button>
                </Space>
            )
          },
      ];
      const deleteContent=()=>{
        axios.delete(`${uri}api/User/${deleteId}`)
        .then(response=>{
          setDeleteId(null);
    setDeleteId("");
    setOpenDelete(false);
          fetchAgain();

          
          console.log("Successfull",response)
        })
        .catch(error=>{
          console.error(error);
        });
      }
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      const tableData=users.map((salary,index)=>({
        ...salary      }));
    
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
                  fetchAgain();
                  form.resetFields();
                  setOpen(false);
              })
              .catch((error)=>{console.error(error);
              });
          })
          .catch((error)=>console.error(error));
        

      };
      const handleUpdate=()=>{
        formNew
          .validateFields()
          .then((values)=>{
            console.log(values);
              const putRequest={
                  id:values.id,
                  eMail:values.eMail,
                  password:values.password,
                  nameSurname:values.nameSurname,
                  phone:values.phone,
                  role:values.role
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/User`,putRequest)
              .then((response)=>{
                  console.log("Başarıyla Gerçekleşti",response.data);
                  console.log(putRequest)
                  setOpen(false);
                  fetchAgain();
                  form.resetFields();
                  setOpenNew(false);
              })
              .catch((error)=>{console.error(error);
              console.log(putRequest)});
          })
          .catch((error)=>console.error(error));
      }
      const [paginationSize, setPaginationSize] = useState(''); 


  const checkScreenSize = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight>= 900) { 
      setPaginationSize(10); 
    } else {
      setPaginationSize(7); 
    }
  };

  
  useEffect(() => {
    checkScreenSize(); 
    window.addEventListener('resize', checkScreenSize); 
    return () => window.removeEventListener('resize', checkScreenSize); 
  }, []);
  return (
    <>
    <Button type='primary' onClick={()=>setOpen(true)}  style={{width:'20%',marginBottom:'1%'}}>Add New User</Button>
    <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize:paginationSize}} />
    <Modal
        title="Add New User"
        centered
        open={open}
        onOk={handleNew}
        onCancel={() => {
          form.resetFields();
          setOpen(false);}}
        width={1000}
      >
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
  </Form>
      </Modal>
      <Modal
        title="Update User"
        centered
        open={openNew}
        onOk={handleUpdate}
        onCancel={() => {
          formNew.resetFields();
          setOpenNew(false);}}
        width={1000}
      >
        <Form
        form={formNew}
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
      label="ID"
      name="id"
      rules={[
        {
          required: true,
          message: 'Please input id!',
        },
      ]}
      hidden
    >
      <Input hidden />
    </Form.Item>
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
  </Form>
      </Modal>
      <Modal
        title="Are you sure you want to delete this data?"
        open={openDelete}
        onOk={deleteContent}
        onCancel={hideModal}

      >
        <p>This action cannot be undone!</p>

      </Modal>
    </>
    
  )
}

export default Users