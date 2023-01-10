import { Form, Radio } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { rupiahWithoutDecimal } from "../../../Helper/Helper";
import "./GroupOptionComponent.css";

function GroupOptionComponent(props) {
  return (
    <div className="group-option-container">
      <div className="group-option-title">
        <p>
          <b>{props.group.groupName}</b>
        </p>
        {props.group.isRequired ? (
          <p>
            Required <span>• Select 1</span>
          </p>
        ) : (
          <p>Optional</p>
        )}
      </div>
      <Form.Item
        className="option-form"
        name={props.group.groupId}
        required={props.group.isRequired}
        rules={[
          {
            required: props.group.isRequired,
            message: `Required Option`,
          },
        ]}
      >
        <Radio.Group
          className="option-form"
          //  onChange={onChange}
          // value={choosenOpt}
        >
          {props.group.options.map((option) => (
            <div className="atc-option-container" key={option.optionId}>
              <p>{option.optionName}</p>
              <div className="option-container-left">
                <p>
                  {option.optionPrice != 0
                    ? "+ " + rupiahWithoutDecimal(option.optionPrice)
                    : "Free"}
                </p>
                <Radio key={option.optionId} value={option.optionId}></Radio>
              </div>
            </div>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
}

export default GroupOptionComponent;
