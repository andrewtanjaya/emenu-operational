import { Button, Form, Input, Modal, Switch } from "antd";
import React, { useState } from "react";
import AdminOptionForm from "../AdminOptionForm/AdminOptionForm";
import "./AdminOptionModal.css";

function AdminOptionModal({ setIsModalOpen, isModalOpen }) {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
//   const [form] = Form.useForm();
  const [optionGroupName, setOptionGroupName] = useState("");

  const handleOk = () => {
    
    if (optionGroupName !== "") {
        setHasError(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
      }, 3000);
    }else{
        setHasError(true);
    }
  };

  const onSwitchChanged = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <Modal
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Add Option Group
          </Button>,
        ]}
        width={600}
      >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Option Group Name"
            name="groupName"
            rules={[
              {
                required: true,
                message: "Option Group Name must be filled!",
              },
            ]}
          >
            <Input
              placeholder="Option Group Name"
              onChange={(e) => {
                setHasError(false);
                setOptionGroupName(e.target.value);
              }}
            />
          </Form.Item>
          {hasError ?<p className="option-group-name-error">Option Group Name must be filled!</p> : <></>}
          <div className="required-switch-container">
            <label>Required </label>
            <Switch defaultChecked onChange={onSwitchChanged} />
          </div>
          <div className="option-container">
            <div className="option-title">
              <p>Option</p>
            </div>
            <div className="option-form-container">
              <AdminOptionForm optionName={"Spicyness"} addedValue="3000" key="1"/>
              <AdminOptionForm isEditable={true} key="2"/>
            </div>
          </div>
      </Modal>
    </div>
  );
}

export default AdminOptionModal;
