import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Space,
  Table,
  Modal,
  Input,
  Form,
  DatePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
const Personels = () => {
  const uri = "https://localhost:7010/";
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [form] = Form.useForm();
  const [formNew] = Form.useForm();
  const [personels, setPersonels] = useState([""]);
  const [departments, setDepartments] = useState([""]);
  const [allDepartment, setAllDepartment] = useState([""]);
  const [selectedPersonel, setSelectedPersonel] = useState("");
  useEffect(() => {
    fetch(`${uri}api/Personel`)
      .then((response) => response.json())
      .then((data) => {
        setPersonels(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch(`${uri}api/Department`)
      .then((response) => response.json())
      .then((data) => {
        setAllDepartment(data);
        console.log(allDepartment);
      })
      .catch((error) => console.error(error));
  }, []);
  const openModal = () => {
    setOpenDelete(true);
  };
  const hideModal = () => {
    setDeleteId(null);
    setDeleteId("");
    setOpenDelete(false);
  };
  const fetchAgain = () => {
    fetch(`${uri}api/Personel`)
      .then((response) => response.json())
      .then((data) => {
        setPersonels(data);
      })
      .catch((error) => console.error(error));
  };
  const onChanges = (value) => {
    const selectedValue = JSON.parse(value);

    setSelectedPersonel(JSON.stringify(selectedValue.departmentId));
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    option?.children?.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
    option?.label?.toLocaleLowerCase().includes(input.toLocaleLowerCase());
  const personelID = personels.map((salary) => salary.departmentId);

  const fetchPersonelNameSurname = async (personelID) => {
    try {
      const response = await fetch(`${uri}api/Department/${personelID}`);
      const data = await response.json();
      return data.departmentName;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const departmentNames = await Promise.all(
        personels.map((salary) =>
          fetchPersonelNameSurname(salary.departmentId)
        )
      );
      setDepartments(departmentNames);
    };
    fetchData();
  }, [personels]);

  const editContent = (record) => {
    setOpenNew(true);
    formNew.setFieldsValue(record);
  };
  const columns = [
    {
      title: "Personel ID",
      dataIndex: "id",
    },
    {
      title: "Personel Name",
      dataIndex: "nameSurname",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <Space>
          <button
            onClick={() => {
              editContent(record);
            }}
            style={{
              backgroundColor: "transparent",
              border: "0px",
              color: "blue",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setDeleteId(record.id);
              openModal(record);
            }}
            style={{
              backgroundColor: "transparent",
              border: "0px",
              color: "red",
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const deleteContent = () => {
    axios
      .delete(`${uri}api/Personel/${deleteId}`)
      .then((response) => {
        setDeleteId(null);
        setDeleteId("");
        setOpenDelete(false);
        fetchAgain();

        console.log("Successfull", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const tableData = personels.map((salary, index) => ({
    ...salary,
    departmentName: departments[index],
    gender: salary.gender === true ? "Male" : "Female",
  }));
  const handleNew = () => {
    form
      .validateFields()
      .then((values) => {
        const postRequest = {
          departmentId: selectedPersonel,
          nameSurname: values.nameSurname,
          gender: values.gender === "male" ? true : false,
          phone: values.phone,
        };

        axios
          .post(`${uri}api/Personel`, postRequest)
          .then((response) => {
            console.log("Başarıyla Gerçekleşti", response.data);
            fetchAgain();
            form.resetFields();
            setSelectedPersonel("");
            setSelectedPersonel(null);
            setOpen(false);
          })
          .catch((error) => {
            console.log(selectedPersonel);
            console.log(postRequest);
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  const handleUpdate = () => {
    formNew
      .validateFields()
      .then((values) => {
        console.log(values);
        const putRequest = {
          id: values.id,
          departmentId: values.departmentId,
          nameSurname: values.nameSurname,
          gender: values.gender==="Male"?true:false,
          phone: values.phone,
        };
        console.log(putRequest);
        axios
          .put(`${uri}api/Personel`, putRequest)
          .then((response) => {
            console.log("Başarıyla Gerçekleşti", response.data);
            console.log(putRequest);
            setOpen(false);
            fetchAgain();
            form.resetFields();
            setOpenNew(false);
          })
          .catch((error) => {
            console.error(error);
            console.log(putRequest);
          });
      })
      .catch((error) => console.error(error));
  };
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
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ width: "20%", marginBottom: "1%" }}
      >
        Add New Personel
      </Button>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={{ pageSize: paginationSize }}
      />
      <Modal
        title="Add New Personel"
        centered
        open={open}
        onOk={handleNew}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
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
            label="Department Id"
            name="departmentId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a department"
              optionFilterProp="children"
              onChange={onChanges}
              filterOption={filterOption}
              value={selectedPersonel ? selectedPersonel : null}
            >
              {allDepartment.map((personel) => (
                <Select.Option
                  key={personel.id}
                  value={JSON.stringify({
                    departmentId: personel.id,
                  })}
                >
                  {personel.departmentName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Name Surname"
            name="nameSurname"
            rules={[
              {
                required: true,
                message: "Please input the name surname!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input the gender!",
              },
            ]}
          >
           <Select
    showSearch
    placeholder="Select gender"
    optionFilterProp="children"
  >
    <Select.Option value="male">Male</Select.Option>
    <Select.Option value="female">Female</Select.Option>
  </Select>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input the phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Personel"
        centered
        open={openNew}
        onOk={handleUpdate}
        onCancel={() => {
          formNew.resetFields();
          setOpenNew(false);
        }}
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
              },
            ]}
            hidden
          >
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="Department ID"
            name="departmentId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Name Surname"
            name="nameSurname"
            rules={[
              {
                required: true,
                message: "Please input the name surname!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input the gender!",
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
                message: "Please input the phone!",
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
  );
};
export default Personels;
