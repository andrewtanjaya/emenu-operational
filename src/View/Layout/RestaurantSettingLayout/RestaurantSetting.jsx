import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./RestaurantSetting.css";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function RestaurantSetting() {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  return (
    <>
      <div className="setting-layout-container">
        <div className="header">
          <h1>Restaurant Setting</h1>
        </div>
        <div className="setting-form-container">
          <Form
            id="settingForm"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Restaurant Name">
              <Input />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Video Links">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Service Charge">
              <InputNumber /> %
            </Form.Item>
            <Form.Item label="Tax">
              <InputNumber /> %
            </Form.Item>
            <Form.Item label="Restaurant Address">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Province">
              <Input />
            </Form.Item>
            <Form.Item label="City">
              <Input />
            </Form.Item>
            <Form.Item label="Distric">
              <Input />
            </Form.Item>
            <Form.Item label="Postal Code">
              <Input />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button id="saveButton" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
export default () => <RestaurantSetting />;
