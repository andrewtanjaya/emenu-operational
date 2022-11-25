import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "./AdminOptionForm.css";

function AdminOptionForm({
  setOptionGroups,
  groupId,
  isFromGroup,
  optionGroup,
  setTempOptions,
  optionId,
  optionName,
  addedValue,
  isEditable,
  setIsModalOpen,
  setEditGroupData,
}) {
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setEditable(isEditable);
  }, []);

  const onFinish = (values) => {
    if (!isEditable) setEditable(false);
    if (isEditable && setTempOptions) {
      setTempOptions((tempOption) => {
        values.optionId = tempOption ? tempOption.length + 1 : 1;
        return tempOption ? [...tempOption, values] : [values];
      });
      form.resetFields();
    } else if (!isEditable && setTempOptions) {
      setTempOptions((tempOption) => {
        tempOption.splice(optionId - 1, 1);
        values.optionId = optionId;
        tempOption = [...tempOption, values];
        tempOption.sort((a, b) => a.optionId - b.optionId);
        return tempOption;
      });
    }
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
        form={form}
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
              <Input />
            </Form.Item>
          ) : (
            optionName
          )}
        </div>

        {(editable && (addedValue || addedValue === 0)) || isEditable ? (
          <Form.Item
            label="Price"
            name="addedValue"
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
            <InputNumber />
          </Form.Item>
        ) : (
          <div className="option-price">
            {(addedValue || addedValue === 0) && !editable ? (
              <p>+ IDR. {addedValue}</p>
            ) : (
              <></>
            )}
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
            <button
              onClick={() => {
                if (!isFromGroup) setEditable(true);
                else {
                  setEditGroupData(optionGroup);
                  setIsModalOpen(true);
                }
              }}
            >
              E
            </button>
            <button
              onClick={() => {
                if (isFromGroup) {
                  setOptionGroups((optionGroups) => {
                    return optionGroups.filter(
                      (optionGroup) =>
                        optionGroup.groupId !== groupId
                    );
                  });
                } else {
                  setTempOptions((tempOption) => {
                    return tempOption.filter(
                      (option) =>
                        option.optionId !== optionId
                    );
                  });
                }
              }}
            >
              D
            </button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default AdminOptionForm;
