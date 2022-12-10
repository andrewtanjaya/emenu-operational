import { Button, Form, Input, Modal, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { IdTypes } from "../../../Enum/IdTypes";
import { generateRandomId } from "../../../Helper/Helper";
import { Group } from "../../../Model/Group";
import AdminOptionForm from "../AdminFormOption/AdminFormOption";
import "./AdminEditOptionModal.css";

function AdminEditOptionModal({
  isEditModalOpen,
  setIsEditModalOpen,
  groupData,
  setGroupData,
  optionData,
  setOptionData,
  editForm,
}) {
  const handleSubmitOption = (values) => {
    let newGroupData = groupData.map((data) => {
      if (data.groupId === values.groupId) {
        return {
          ...data,
          groupName: values.groupName,
          isRequired: values.isRequired ? true : false,
          options: optionData,
        };
      }
      return data;
    });

    setGroupData(newGroupData);
    setOptionData([]);
    editForm.resetFields();
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setOptionData([]);
    editForm.resetFields();
    setIsEditModalOpen(false);
  };
  return (
    <div>
      <Modal
        centered
        open={isEditModalOpen}
        onCancel={handleCancel}
        title="Edit Option"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            id="saveButton"
            key="submit"
            type="primary"
            onClick={editForm.submit}
          >
            Update Option
          </Button>,
        ]}
      >
        <Form form={editForm} onFinish={handleSubmitOption}>
          <Form.Item label="Option Group Name" name="groupId" hidden>
            <Input placeholder="category name" allowClear />
          </Form.Item>
          <Form.Item label="Option Group Name" name="groupName">
            <Input placeholder="category name" allowClear />
          </Form.Item>
          <Form.Item label="Required" valuePropName="checked" name="isRequired">
            <Switch />
          </Form.Item>
          <AdminOptionForm
            data={optionData}
            setData={setOptionData}
          ></AdminOptionForm>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminEditOptionModal;
