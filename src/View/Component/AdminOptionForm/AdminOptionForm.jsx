import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "./AdminOptionForm.css";

function AdminOptionForm({ optionName, addedValue, isEditable }) {
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    setEditable(isEditable);
  }, []);
  const onFinish = (values) => {
    console.log(values);
    setEditable(false);
  };
  return (
    <div
      className={
        editable
          ? "admin-option-form-container high-option-form"
          : "admin-option-form-container"
      }
    >
      <Form
        layout="vertical"
        name="basic"
        labelCol={{
          span: 20,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
      >
        <div className="option-name">
          {editable ? (
            <Form.Item
              label="Option Name"
              name="optionName"
              initialValue={optionName}
              rules={[
                {
                  required: true,
                  message: "Option Name must be filled!",
                },
              ]}
            >
              <Input/>
            </Form.Item>
          ) : (
            optionName
          )}
        </div>

        {(editable && addedValue) || isEditable ? (
          <Form.Item
            label="Price"
            name="price"
            initialValue={addedValue}
            rules={[
              {
                required: true,
                message: "Price must be filled!",
              },
              {
                message: "Price must be numeric!",
                type: "number",
              },
            ]}
          >
            <InputNumber/>
          </Form.Item>
        ) : (
          <div className="option-price">
            {addedValue && !editable ? <p>+ IDR. {addedValue}</p> : <></>}
          </div>
        )}

        {editable ? (
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        ) : (
          <div className="option-form-action">
            {" "}
            <button onClick={() => setEditable(true)}>E</button>
            <button>D</button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default AdminOptionForm;
