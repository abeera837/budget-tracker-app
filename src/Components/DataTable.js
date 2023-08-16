import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const DataTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    price: "",
    date: null,
  });
  const [dataSource, setDataSource] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(moment());
  const [filteredData, setFilteredData] = useState([]);
  const [isFilteredModalVisible, setIsFilteredModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8000/dataSource")
      .then((response) => response.json())
      .then((data) => setDataSource(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const saveData = (data) => {
    fetch("http://localhost:8000/dataSource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((savedData) => {
        setDataSource((prev) => [...prev, savedData]);
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  const updateData = (data) => {
    fetch(`http://localhost:8000/dataSource/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setDataSource((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const deleteData = (id) => {
    fetch(`http://localhost:8000/dataSource/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDataSource((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => moment(text, "DD-MM-YYYY").format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      render: (record) => (
        <>
          <EditOutlined onClick={() => onEditData(record)} />
          <DeleteOutlined
            onClick={() => onDeleteData(record.id)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const handleInputChange = (key, value) => {
    if (isEditing) {
      setEditingData((prevData) => ({ ...prevData, [key]: value }));
    } else {
      setNewData((prevData) => ({ ...prevData, [key]: value }));
    }
  };

  const onAddData = () => {
    const formattedDate = newData.date
      ? moment(newData.date).format("DD-MM-YYYY")
      : null;
    const newDataEntry = { ...newData, date: formattedDate };
    saveData(newDataEntry);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false);
  };

  const onDeleteData = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Data record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteData(id);
      },
    });
  };

  const onEditData = (record) => {
    setIsEditing(true);
    setEditingData({
      id: record.id,
      name: record.name,
      price: record.price,
      date: moment(record.date, "DD-MM-YYYY"),
    });
    setIsAddModalVisible(true);
  };

  const onSaveEdit = () => {
    const updatedData = {
      ...editingData,
      date: editingData.date
        ? moment(editingData.date).format("DD-MM-YYYY")
        : null,
    };

    updateData(updatedData);

    setIsEditing(false);
    setEditingData(null);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditingData(null);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false);
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  const filterRecords = () => {
    const filteredData = dataSource.filter(
      (data) =>
        moment(data.date, "DD-MM-YYYY").format("DD-MM-YYYY") ===
        filterDate.format("DD-MM-YYYY")
    );
    setFilteredData(filteredData);
    setIsFilteredModalVisible(true);
  };

  const clearFilteredRecords = () => {
    setFilteredData([]);
    setIsFilteredModalVisible(false);
  };

  return (
    <div className="DataTable-container">
    <div className="DataContainer">
      <header className="App-header">
        <div className="Filter-section">
          <DatePicker
            defaultValue={filterDate}
            format="DD-MM-YYYY"
            onChange={handleDateChange}
            className="DatePicker"
          />
          <Button onClick={filterRecords} className="Filter-button">
            Filter Records
          </Button>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setIsAddModalVisible(true);
            setNewData({ name: "", price: "", date: null });
          }}
          className="Button-add-budget"
        >
          Add Budget
        </Button>
      </header>
      {isFilteredModalVisible && (
        <Modal
          title="Filtered Records"
          visible={isFilteredModalVisible}
          onCancel={clearFilteredRecords}
          footer={[
            <Button key="ok" onClick={clearFilteredRecords}>
              OK
            </Button>,
          ]}
        >
          {filteredData.length > 0 ? (
            <Table columns={columns} dataSource={filteredData} />
          ) : (
            <p className="No-record-message">No record</p>
          )}
        </Modal>
      )}
      <Table
        columns={columns}
        dataSource={dataSource.slice().sort((a, b) =>
          moment(a.date, "DD-MM-YYYY").isAfter(moment(b.date, "DD-MM-YYYY")) ? 1 : -1
        )}
        className="Table-container"
      />
      <Modal
        title={isEditing ? "Edit Data" : "Add Budget"}
        visible={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          onCancelEdit();
        }}
        onOk={isEditing ? onSaveEdit : onAddData}
        okText={isEditing ? "Save" : "Add"}
      >
          <Input
            placeholder="Name"
            value={isEditing ? editingData.name : newData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Price"
            value={isEditing ? editingData.price : newData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          <DatePicker
            picker="date"
            value={isEditing ? editingData.date : newData.date}
            onChange={(date) => handleInputChange("date", date)}
            format="DD-MM-YYYY"
          />
        </Modal>
      </div>
    </div>
  );
};

export default DataTable;
