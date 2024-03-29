import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';
const Projects = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
    const [formNew] = Form.useForm();
    const [projects, setProjects] = useState([""])
    const [salaryDates, setSalaryDate] = useState("")
    const [personels,setPersonels]=useState([""])
    const [allPersonel,setAllPersonel]=useState([""])
    const [selectedDate,setSelectedDate]=useState("")
    const [selectedDateEnd, setSelectedDateEnd] = useState("")
    const [selectedApplicationDate, setSelectedApplicationDate] = useState("")
    const [selectedPersonel,setSelectedPersonel]=useState("");
    useEffect(()=>{
        fetch(`${uri}api/Project`)
        .then(response=>response.json())
        .then(data=>{setProjects(data);
        })
        .catch(error=>console.error(error));
    },[])
    useEffect(()=>{
      fetch(`${uri}api/Personel`)
      .then(response=>response.json())
      .then(data=>{setAllPersonel(data);
      console.log(allPersonel)

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
        fetch(`${uri}api/Project`)
        .then(response=>response.json())
        .then(data=>{setProjects(data);
        })
        .catch(error=>console.error(error));
    }
    const onChanges = (value) => {
      const selectedValue = JSON.parse(value); 
      
      setSelectedPersonel(JSON.stringify(selectedValue.personelId));

    };
    const onSearch = (value) => {
      console.log('search:', value);
    };
    const filterOption = (input, option) =>
  option?.children?.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
  option?.label?.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    const personelId = projects.map(salary => salary.personelId);

    const fetchPersonelNameSurname = async (personelId) => {
        try {
            const response = await fetch(`${uri}api/Personel/${personelId}`);
            const data = await response.json();
            return data.nameSurname;
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const personelNames = await Promise.all(projects.map(salary => fetchPersonelNameSurname(salary.personelId)));
            setPersonels(personelNames);
        };
        fetchData();
    }, [projects]);

    const editContent = (record)=>{

  setOpenNew(true);
  formNew.setFieldsValue({
    ...record,
    projectStart:dayjs(record.projectStart),
    projectEnd:dayjs(record.projectEnd),
  });

    }
    const columns = [
        {
          title: 'Project ID',
          dataIndex: 'id',
        },
        {
          title: 'Project Name',
          dataIndex: 'projectName',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Project Start Date',
          dataIndex: 'projectStart',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'Project End Date',
          dataIndex: 'projectEnd',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
        {
          title: 'Personel Name',
          dataIndex: 'personelName',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
        {
            title: 'Project Status',
            dataIndex: 'projectStatus',
            sorter: {
              compare: (a, b) => a.english - b.english,
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
        axios.delete(`${uri}api/Project/${deleteId}`)
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
      const tableData=projects.map((salary,index)=>({
        ...salary,
        personelName:personels[index]
      }));
      const onChangee = (date) => {
        console.log(date);
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setSalaryDate(formattedDate);
        console.log(formattedDate);
    };
    const onChangeApp=(date)=>{
      const formattedDate = dayjs(date).format('YYYY-MM-DD');

      setSelectedApplicationDate(formattedDate);
      console.log(formattedDate);
    }
    const onChangeEnd=(date)=>{
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setSelectedDateEnd(formattedDate);
      console.log(formattedDate);


    }
      const handleNew=()=>{
          form
          .validateFields()
          .then((values)=>{
              const postRequest={
                  personelId:selectedPersonel,
                  projectName:values.projectName,
                  projectStart:values.projectStart,
                  projectEnd:values.projectEnd,
                  projectStatus:values.projectStatus,
                };

              axios
              .post(`${uri}api/Project`,postRequest)
              .then((response)=>{
                  console.log("Başarıyla Gerçekleşti",response.data);
                  fetchAgain();
                  form.resetFields();
                  setSelectedPersonel("");
                  setSelectedPersonel(null);
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
                  personelId:values.personelId,
                  projectName:values.projectName,
                  projectStart:values.projectStart,
                  projectEnd:values.projectEnd,
                  projectStatus:values.projectStatus,
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/Project`,putRequest)
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
    <Button type='primary' onClick={()=>setOpen(true)}  style={{width:'20%',marginBottom:'1%'}}>Add New Project</Button>
    <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize:paginationSize}} />
    <Modal
        title="Add New Project"
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
      label="Personel Id"
      name="personelId"
      rules={[
        {
          required: true,
          message: 'Please input personel id!',
        },
      ]}
    >
       <Select
    showSearch
    placeholder="Select a personel"
    optionFilterProp="children"
    onChange={onChanges}
    filterOption={filterOption}
    value={selectedPersonel?selectedPersonel:null}
  >
    {allPersonel.map(personel=>(
      <Select.Option key={personel.id} value={JSON.stringify({
      personelId:personel.id
    })}>{personel.nameSurname}</Select.Option>
    ))}
    
  </Select>
    </Form.Item>
    <Form.Item
      label="Project Start Date"
      name="projectStart"
      rules={[
        {
          required: true,
          
        },
      ]}
    >
      <DatePicker value={selectedDate?selectedDate:null} format={"YYYY-MM-DD"} onChange={onChangee}  />
    </Form.Item>

    <Form.Item
      label="Project End Date"
      name="projectEnd"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <DatePicker   value={selectedDateEnd?selectedDateEnd:null} format={"YYYY-MM-DD"} onChange={onChangeEnd}  />

    </Form.Item>
    <Form.Item
      label="Project Name"
      name="projectName"
      rules={[
        {
          required: true,
          message: 'Please input the project name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Project Status"
      name="projectStatus"
      rules={[
        {
          required: true,
          message: 'Please input the project status!',
          
        },
      ]}
    >
           <Input />

    </Form.Item>
  </Form>
      </Modal>
      <Modal
        title="Update Project"
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
      label="Project ID"
      name="id"
      rules={[
        {
          required: true,
          message: 'Please input project id!',
        },
      ]}
      hidden
    >
      <Input hidden />
    </Form.Item>
    <Form.Item
      label="Personel ID"
      name="personelId"
      rules={[
        {
          required: true,
          message: 'Please input personel id!',
        },
      ]}
    >
       <Input readOnly/>
    </Form.Item>
    <Form.Item
      label="Project Start Date"
      name="projectStart"
      rules={[
        {
          required: true,
          
        },
      ]}
    >
      <DatePicker value={selectedDate?selectedDate:null} format={"YYYY-MM-DD"} onChange={onChangee}  />
    </Form.Item>

    <Form.Item
      label="Project End Date"
      name="projectEnd"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <DatePicker   value={selectedDateEnd?selectedDateEnd:null} format={"YYYY-MM-DD"} onChange={onChangeEnd}  />

    </Form.Item>
    <Form.Item
      label="Project Name"
      name="projectName"
      rules={[
        {
          required: true,
          message: 'Please input the project name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Project Status"
      name="projectStatus"
      rules={[
        {
          required: true,
          message: 'Please input the project status!',
          
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
export default Projects