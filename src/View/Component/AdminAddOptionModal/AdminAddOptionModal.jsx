import { Button, Form, Input, Modal, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { IdTypes } from "../../../Enum/IdTypes";
import { generateRandomId } from "../../../Helper/Helper";
import { Group } from "../../../Model/Group";
import AdminOptionForm from "../AdminFormOption/AdminFormOption";
import "./AdminAddOptionModal.css";

function AdminAddOptionModal({
  isAddModalOpen,
  setIsAddModalOpen,
  setGroupData,
}) {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  const handleSubmitOption = (values) => {
    const groupId = generateRandomId(IdTypes.GROUP);
    let newGroup = new Group(
      groupId,
      "",
      values.groupName,
      values.isRequired ? true : false,
      dataSource
    );
    setGroupData((groupData) => [...groupData, newGroup]);
    setDataSource([]);
    form.resetFields();
    setIsAddModalOpen(false);
  };

  const handleCancel = () => {
    setDataSource([]);
    form.resetFields();
    setIsAddModalOpen(false);
  };
  return (
    <div>
      <Modal
        centered
        open={isAddModalOpen}
        onCancel={handleCancel}
        title="Add Option"
        footer={[
          <Button
            id="saveButton"
            key="submit"
            type="primary"
            onClick={form.submit}
          >
            Add Option Group
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmitOption}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input Option Group Name!",
              },
            ]}
            label="Option Group Name"
            name="groupName"
          >
            <Input placeholder="Enter Option Group Name" allowClear />
          </Form.Item>
          <Form.Item label="Required" valuePropName="checked" name="isRequired">
            <Switch />
          </Form.Item>
          <AdminOptionForm
            data={dataSource}
            setData={setDataSource}
          ></AdminOptionForm>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAddOptionModal;
