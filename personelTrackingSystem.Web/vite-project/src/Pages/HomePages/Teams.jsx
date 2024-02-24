import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';

const Teams = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState("");

    const [formNew] = Form.useForm();
    const [teams, setTeams] = useState([""])
    useEffect(()=>{
        fetch(`${uri}api/Team`)
        .then(response=>response.json())
        .then(data=>{setTeams(data);
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
        fetch(`${uri}api/Team`)
        .then(response=>response.json())
        .then(data=>{setTeams(data);
        })
        .catch(error=>console.error(error));
    }





    const editContent = (record)=>{
  setOpenNew(true);
  formNew.setFieldsValue({
    ...record,
    creationDate: dayjs(record.creationDate),
  });
    }
    const onChangee = (date) => {
        console.log(date);
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate);
        console.log(formattedDate);
      };
    const columns = [
        {
          title: 'Team ID',
          dataIndex: 'id',
        },
        {
          title: 'Team Name',
          dataIndex: 'teamName',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Creation Date',
          dataIndex: 'creationDate',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
            title: 'Team Status',
            dataIndex: 'teamStatus',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
          {
            title: 'Description',
            dataIndex: 'description',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
          {
            title: 'Priority Level',
            dataIndex: 'priorityLevel',
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 1,
            },
          },
          {
            title: 'Team Budget',
            dataIndex: 'teamBudget',
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
        axios.delete(`${uri}api/Team/${deleteId}`)
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
      const tableData=teams.map((salary,index)=>({
        ...salary      }));
    
      const handleNew=()=>{
          form
          .validateFields()
          .then((values)=>{
              const postRequest={
                  teamName:values.teamName,
                  creationDate:values.creationDate,
                  teamStatus:values.teamStatus,
                  description:values.description,
                  priorityLevel:values.priorityLevel,
                  teamBudget:values.teamBudget
              };

              axios
              .post(`${uri}api/Team`,postRequest)
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
                  teamName:values.teamName,
                  creationDate:values.creationDate,
                  teamStatus:values.teamStatus,
                  description:values.description,
                  priorityLevel:values.priorityLevel,
                  teamBudget:values.teamBudget
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/Team`,putRequest)
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
      label="Team Name"
      name="teamName"
      rules={[
        {
          required: true,
          message: 'Please input team name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Creation Date"
      name="creationDate"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <DatePicker
              value={selectedDate ? selectedDate : null}
              format={"YYYY-MM-DD"}
              onChange={onChangee}
            />
    </Form.Item>
    <Form.Item
      label="Team Status"
      name="teamStatus"
      rules={[
        {
          required: true,
          message: 'Please input team status!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input description!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Priority Level"
      name="priorityLevel"
      rules={[
        {
          required: true,
          message: 'Please input priority level!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Team Budget"
      name="teamBudget"
      rules={[
        {
          required: true,
          message: 'Please input team budget!',
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
      label="Team Name"
      name="teamName"
      rules={[
        {
          required: true,
          message: 'Please input team name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Creation Date"
      name="creationDate"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <DatePicker
              value={selectedDate ? selectedDate : null}
              format={"YYYY-MM-DD"}
              onChange={onChangee}
            />
    </Form.Item>
    <Form.Item
      label="Team Status"
      name="teamStatus"
      rules={[
        {
          required: true,
          message: 'Please input team status!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input description!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Priority Level"
      name="priorityLevel"
      rules={[
        {
          required: true,
          message: 'Please input priority level!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Team Budget"
      name="teamBudget"
      rules={[
        {
          required: true,
          message: 'Please input team budget!',
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

export default Teams