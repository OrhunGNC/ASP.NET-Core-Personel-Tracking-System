import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';

const Systems = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
    const [formNew] = Form.useForm();
    const [systems, setSystems] = useState([""])
    useEffect(()=>{
        fetch(`${uri}api/System`)
        .then(response=>response.json())
        .then(data=>{setSystems(data);
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
        fetch(`${uri}api/System`)
        .then(response=>response.json())
        .then(data=>{setSystems(data);
        })
        .catch(error=>console.error(error));
    }





    const editContent = (record)=>{
  setOpenNew(true);
  formNew.setFieldsValue(record);

    }
    const columns = [

        {
          title: 'About Us',
          dataIndex: 'aboutUs',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Communication',
          dataIndex: 'communication',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
            title: 'Application Name',
            dataIndex: 'applicationName',
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
                </Space>
            )
          },
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      const tableData=systems.map((salary,index)=>({
        ...salary      }));
    
      const handleUpdate=()=>{
        formNew
          .validateFields()
          .then((values)=>{
            console.log(values);
              const putRequest={
                  id:values.id,
                  aboutUs:values.aboutUs,
                  communication:values.communication,
                  applicationName:values.applicationName,
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/System`,putRequest)
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
    <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize:paginationSize}} />
    
      <Modal
        title="Update System"
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
      label="About Us"
      name="aboutUs"
      rules={[
        {
          required: true,
          message: 'Please input about us content!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Communication"
      name="communication"
      rules={[
        {
          required: true,
          message: 'Please input the communication!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Application Name"
      name="applicationName"
      rules={[
        {
          required: true,
          message: 'Please input the application name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    
  </Form>
      </Modal>
      
    </>
    
  )
}

export default Systems