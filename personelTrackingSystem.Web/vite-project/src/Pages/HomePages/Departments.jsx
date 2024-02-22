import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';

const Departments = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
    const [formNew] = Form.useForm();
    const [departments, setDepartments] = useState([""])
    useEffect(()=>{
        fetch(`${uri}api/Department`)
        .then(response=>response.json())
        .then(data=>{setDepartments(data);
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
        fetch(`${uri}api/Department`)
        .then(response=>response.json())
        .then(data=>{setDepartments(data);
        })
        .catch(error=>console.error(error));
    }





    const editContent = (record)=>{
  setOpenNew(true);
  formNew.setFieldsValue(record);

    }
    const columns = [
        {
          title: 'Department ID',
          dataIndex: 'id',
        },
        {
          title: 'Department Name',
          dataIndex: 'departmentName',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Department Head',
          dataIndex: 'departmentHead',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
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
        axios.delete(`${uri}api/Department/${deleteId}`)
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
      const tableData=departments.map((salary,index)=>({
        ...salary      }));
    
      const handleNew=()=>{
          form
          .validateFields()
          .then((values)=>{
              const postRequest={
                  departmentName:values.departmentName,
                  departmentHead:values.departmentHead
              };

              axios
              .post(`${uri}api/Department`,postRequest)
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
                  departmentName:values.departmentName,
                  departmentHead:values.departmentHead
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/Department`,putRequest)
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
  return (
    <>
    <Button type='primary' onClick={()=>setOpen(true)}  style={{width:'20%',marginBottom:'1%'}}>Add New Department</Button>
    <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize:'10'}} />
    <Modal
        title="Add New Department"
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
      label="Department Name"
      name="departmentName"
      rules={[
        {
          required: true,
          message: 'Please input department name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Department Head"
      name="departmentHead"
      rules={[
        {
          required: true,
          message: 'Please input the department head!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
      </Modal>
      <Modal
        title="Update Department"
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
      label="Department Name"
      name="departmentName"
      rules={[
        {
          required: true,
          message: 'Please input department name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Department Head"
      name="departmentHead"
      rules={[
        {
          required: true,
          message: 'Please input the department head!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
      </Modal>
      <Modal
        title="Bu maaş verisini silmek istediğinize emin misiniz?"
        open={openDelete}
        onOk={deleteContent}
        onCancel={hideModal}

      >
        <p>Bu işlem geri alınamayacaktır!</p>

      </Modal>
    </>
    
  )
}

export default Departments