import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Button, Space, Table,Modal ,Input ,Form,DatePicker ,Select } from 'antd';
import dayjs from 'dayjs';

const Salaries = () => {
    const uri = "https://localhost:7010/";
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [form] = Form.useForm();
    const [formNew] = Form.useForm();
    const [salaries, setSalaries] = useState([""])
    const [salaryDates, setSalaryDate] = useState("")
    const [personels,setPersonels]=useState([""])
    const [allPersonel,setAllPersonel]=useState([""])
    const [selectedDate,setSelectedDate]=useState("")
    const [selectedPersonel,setSelectedPersonel]=useState("");
    useEffect(()=>{
        fetch(`${uri}api/Salary`)
        .then(response=>response.json())
        .then(data=>{setSalaries(data);
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
        fetch(`${uri}api/Salary`)
        .then(response=>response.json())
        .then(data=>{setSalaries(data);
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
    const personelId = salaries.map(salary => salary.personelId);

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
            const personelNames = await Promise.all(salaries.map(salary => fetchPersonelNameSurname(salary.personelId)));
            setPersonels(personelNames);
        };
        fetchData();
    }, [salaries]);

    const editContent = (record)=>{
  setOpenNew(true);
  formNew.setFieldsValue({
    ...record,
    salaryDate:dayjs(record.salaryDate)
  });

    }
    const columns = [
        {
          title: 'Personel ID',
          dataIndex: 'personelName',
        },
        {
          title: 'Personel Salary',
          dataIndex: 'personelSalary',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Salary Date',
          dataIndex: 'salaryDate',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'Increase Rate',
          dataIndex: 'increaseRate',
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
        axios.delete(`${uri}api/Salary/${deleteId}`)
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
      const tableData=salaries.map((salary,index)=>({
        ...salary,
        personelName:personels[index]
      }));
      const onChangee = (date) => {
        console.log(date);
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setSalaryDate(formattedDate);
        console.log(formattedDate);
    };
    
      const handleNew=()=>{
          form
          .validateFields()
          .then((values)=>{
              const postRequest={
                  personelId:selectedPersonel,
                  personelSalary:values.personelSalary,
                  salaryDate:values.salaryDate,
                  increaseRate:values.increaseRate
              };

              axios
              .post(`${uri}api/Salary`,postRequest)
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
                  personelSalary:values.personelSalary,
                  salaryDate:values.salaryDate,
                  increaseRate:values.increaseRate
              };
              console.log(putRequest)
              axios
              .put(`${uri}api/Salary`,putRequest)
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
    <Button type='primary' onClick={()=>setOpen(true)}  style={{width:'20%',marginBottom:'1%'}}>Add New Salary</Button>
    <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize:'10'}} />
    <Modal
        title="Add New Salary"
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
          message: 'Please input personel salary!',
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
      label="Personel Salary"
      name="personelSalary"
      rules={[
        {
          required: true,
          message: 'Please input personel salary!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Salary Date"
      name="salaryDate"
      rules={[
        {
          required: true,
          message: 'Please input salary date!',
        },
      ]}
    >
    <DatePicker value={selectedDate?selectedDate:null} format={"YYYY-MM-DD"} onChange={onChangee}  />

    </Form.Item>
    <Form.Item
      label="Increase Rate"
      name="increaseRate"
      rules={[
        {
          required: true,
          message: 'Please input the increase rate!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
      </Modal>
      <Modal
        title="Update Salary"
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
      label="Salary ID"
      name="id"
      rules={[
        {
          required: true,
          message: 'Please input personel salary!',
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
          message: 'Please input personel salary!',
        },
      ]}
    >
       <Input readOnly/>
    </Form.Item>
    <Form.Item
      label="Personel Salary"
      name="personelSalary"
      rules={[
        {
          required: true,
          message: 'Please input personel salary!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Salary Date"
      name="salaryDate"
      rules={[
        {
          required: true,
          message: 'Please input salary date!',
        },
      ]}
    >
    <DatePicker value={selectedDate?selectedDate:null} format={"YYYY-MM-DD"} onChange={onChangee}  />

    </Form.Item>
    <Form.Item
      label="Increase Rate"
      name="increaseRate"
      rules={[
        {
          required: true,
          message: 'Please input the increase rate!',
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

export default Salaries