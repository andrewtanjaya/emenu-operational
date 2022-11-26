import { Button, Modal, Switch } from "antd";
import React, { useEffect, useState } from "react";
import AdminOptionForm from "../AdminOptionForm/AdminOptionForm";
import "./AdminOptionModal.css";

function AdminOptionModal({
  setIsModalOpen,
  isModalOpen,
  setOptionGroups,
  optionGroups,
  editGroupData,
  setEditGroupData,
}) {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [required, setRequired] = useState(true);
  const [optionGroupName, setOptionGroupName] = useState("");
  const [tempOptions, setTempOptions] = useState([]);

  useEffect(() => {
    if (editGroupData) {
      setOptionGroupName(editGroupData.groupName);
      setTempOptions(editGroupData.option);
    } else {
      setOptionGroupName("");
      setTempOptions([]);
    }
  }, [editGroupData]);

  const handleAdd = () => {
    if (optionGroupName !== "") {
      setHasError(false);
      setLoading(true);
      setOptionGroups((optionGroup) => {
        let newOptionGroup = {};
        newOptionGroup.groupId = optionGroup ? optionGroup.length + 1 : 1;
        newOptionGroup.groupName = optionGroupName;
        newOptionGroup.isRequired = required;
        newOptionGroup.option = tempOptions;
        setIsModalOpen(false);
        setLoading(false);
        setTempOptions([]);
        setOptionGroupName("");
        return [...optionGroup, newOptionGroup];
      });
    } else {
      setHasError(true);
    }
  };

  const handleUpdate = () => {
    if (optionGroupName !== "") {
      setHasError(false);
      setLoading(true);
      setEditGroupData(null);
      setOptionGroups((optionGroup) => {
        for (let i = 0; i < optionGroup.length; i++) {
          if (optionGroup[i].groupId === editGroupData.groupId) {
            optionGroup[i].groupName = optionGroupName;
            optionGroup[i].isRequired = required;
            optionGroup[i].option = tempOptions;
            setIsModalOpen(false);
            setLoading(false);
          }
        }
        return optionGroup;
      });
    } else {
      setHasError(true);
    }
  };

  const onSwitchChanged = (checked) => {
    setRequired(checked);
    if (editGroupData) editGroupData.required = checked;
  };

  return (
    <div>
      <Modal
        centered
        open={isModalOpen}
        onCancel={() => {
          setEditGroupData(null);
          setIsModalOpen(false);
        }}
        footer={[
          <div className="admin-option-modal-button">
            {editGroupData ? (
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleUpdate}
              >
                Update Option Group
              </Button>
            ) : (
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleAdd}
              >
                Add Option Group
              </Button>
            )}
          </div>,
        ]}
        width={600}
      >
        <div className="admin-option-group-name-input">
          <label>Option Group Name</label>
          <input
            value={
              optionGroupName
            }
            placeholder="Option Group Name"
            onChange={(e) => {
              setHasError(false);
              setOptionGroupName(e.target.value);
            }}
          />
        </div>
        {hasError ? (
          <p className="option-group-name-error">
            Option Group Name must be filled!
          </p>
        ) : (
          <></>
        )}
        <div className="required-switch-container">
          <label>Required </label>
          <Switch
            checked={
              editGroupData && editGroupData.required
                ? editGroupData.required
                : required
            }
            onChange={onSwitchChanged}
          />
        </div>
        <div className="option-container">
          <div className="option-title">
            <p>Option</p>
          </div>
          <div className="option-form-container">
            {tempOptions ? (
              tempOptions.map((option) => {
                return (
                  <AdminOptionForm
                  setOptionGroups={setOptionGroups}
                    setTempOptions={setTempOptions}
                    optionId={option.optionId}
                    optionName={option.optionName}
                    addedValue={option.addedValue}
                    key={option.optionId}
                  />
                );
              })
            ) : (
              <></>
            )}

            <AdminOptionForm
              setTempOptions={setTempOptions}
              isEditable={true}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminOptionModal;
