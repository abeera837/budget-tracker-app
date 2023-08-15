import React, { useState } from "react";
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
  const [dataSource, setDataSource] = useState([
    {
      name: "John",
      price: "2000",
      date: "08-08-2023",
    },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(moment()); // Default to current date
  const [filteredData, setFilteredData] = useState([]); // Store filtered records
  const [isFilteredModalVisible, setIsFilteredModalVisible] = useState(false); // For the filtered modal

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
            onClick={() => onDeleteData(record)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const handleInputChange = (key, value) => {
    setNewData((prevData) => ({ ...prevData, [key]: value }));
  };

  const onAddData = () => {
    const formattedDate = newData.date
      ? moment(newData.date).format("DD-MM-YYYY")
      : null;
    const newDataEntry = { ...newData, date: formattedDate };
    setDataSource((prev) => [...prev, newDataEntry]);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false);
  };

  const onDeleteData = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Data record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => prev.filter((data) => data !== record));
      },
    });
  };

  const onEditData = (record) => {
    setIsEditing(true);
    setEditingData(record);
    setNewData({
      name: record.name,
      price: record.price,
      date: moment(record.date, "DD-MM-YYYY"), // Convert date to moment object
    });
    setIsAddModalVisible(true); // Open the Add Budget modal for editing
  };

  const onSaveEdit = () => {
    const updatedData = {
      ...editingData,
      name: newData.name,
      price: newData.price,
      date: newData.date ? moment(newData.date).format("DD-MM-YYYY") : null,
    };

    setDataSource((prev) =>
      prev.map((data) => (data === editingData ? updatedData : data))
    );

    setIsEditing(false);
    setEditingData(null);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false); // Close the Add Budget modal after saving edit
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditingData(null);
    setNewData({ name: "", price: "", date: null });
    setIsAddModalVisible(false); // Close the Add Budget modal on cancel
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  const filterRecords = () => {
    // Filter the data based on the selected date
    const filteredData = dataSource.filter(
      (data) =>
        moment(data.date, "DD-MM-YYYY").format("DD-MM-YYYY") ===
        filterDate.format("DD-MM-YYYY")
    );
    setFilteredData(filteredData); // Store filtered records
    setIsFilteredModalVisible(true); // Show the filtered modal
  };

  const clearFilteredRecords = () => {
    setFilteredData([]); // Clear filtered records
    setIsFilteredModalVisible(false); // Hide the filtered modal
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          type="primary"
          onClick={() => {
            setIsAddModalVisible(true);
            setNewData({ name: "", price: "", date: null }); // Reset new data values
          }}
          style={{ marginBottom: 16 }}
        >
          Add Budget
        </Button>
        <DatePicker
          defaultValue={filterDate}
          format="DD-MM-YYYY" // Specify the desired date format
          onChange={handleDateChange}
          style={{ marginRight: 16 }}
        />
        <Button onClick={filterRecords}>Filter Records</Button>
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
              <p>No record</p>
            )}
          </Modal>
        )}
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title={isEditing ? "Edit Data" : "Add Budget"}
          visible={isAddModalVisible}
          onCancel={() => {
            setIsAddModalVisible(false);
            onCancelEdit(); // Call onCancelEdit when closing the modal
          }}
          onOk={isEditing ? onSaveEdit : onAddData}
          okText={isEditing ? "Save" : "Add"}
        >
          <Input
            placeholder="Name"
            value={newData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Price"
            value={newData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
<DatePicker
  picker="date"
  value={newData.date ? moment(newData.date) : null}
  onChange={(date) => handleInputChange("date", date)}
  format="DD-MM-YYYY" // Specify the desired date format
/>
        </Modal>
      </header>
    </div>
  );
};

export default DataTable;
