import { Button, Form, Input, InputNumber, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { storage } from "../../../Config/Firebase";
import {
  getMenuById,
  updateMenuById,
} from "../../../Controller/MenuController";
import { getRestaurantById } from "../../../Controller/RestaurantController";
import { IdTypes } from "../../../Enum/IdTypes";
import { generateRandomId } from "../../../Helper/Helper";
import { Food } from "../../../Model/Food";
import AdminMenuPhoto from "../../Component/AdminMenuPhoto/AdminMenuPhoto";
import AdminOptionGroup from "../../Component/AdminOptionGroup/AdminOptionGroup";
import "./AdminAddMenuLayout.css";

function AdminAddMenuLayout() {
  const [urlParam, setUrlParam] = useSearchParams();
  const [menuId, setMenuId] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [optionGroups, setOptionGroups] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFoodData, setEditFoodData] = useState(null);
  const [photosData, setPhotosData] = useState([
    { keyId: 1, isMain: true, file: null },
    { keyId: 2, isMain: false, file: null },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    let foodId = urlParam.get("foodId");
    if (foodId && menuData) {
      let data = menuData.foodList.filter((food) => food.foodId === foodId)[0];
      if (!data) {
        navigate("404");
        return;
      }
      setEditFoodData(data);
      setPhotosData((photosData) => {
        let newData = [{ keyId: 1, isMain: true, file: data.mainPicture }];
        if (data.addedPicture.length === 1) {
          newData.push({ keyId: 2, isMain: false, file: data.addedPicture[0] });
        } else if (data.addedPicture.length > 1) {
          for (let i = 0; i < data.addedPicture.length; i++) {
            newData.push({
              keyId: i + 2,
              isMain: false,
              file: data.addedPicture[i],
            });
          }
        }
        newData.push({ keyId: newData.length + 1, isMain: false, file: null });
        return newData;
      });
      form.setFieldValue("foodName", data.foodName);
      form.setFieldValue("category", data.categoryId);
      form.setFieldValue("description", data.foodDescription);
      form.setFieldValue("price", data.foodPrice);
      setOptionGroups(data.groups);
      setIsEditMode(true);
    } else {
      setEditFoodData(null);
      setIsEditMode(false);
    }
  }, [urlParam, menuData]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("userData"));
    getRestaurantById(currentUser.restaurantId).then((res) => {
      if (res) {
        setMenuId(res.menuId);
      }
    });
  }, []);

  useEffect(() => {
    if (menuId) {
      getMenuById(menuId).then((res) => {
        if (res) {
          setMenuData(res);
        }
      });
    }
  }, [menuId]);

  const addFood = async (values) => {
    // TODO: tag logic
    let newFood = new Food(
      "",
      values.category,
      optionGroups,
      values.foodName,
      true,
      "",
      values.price,
      [],
      values.description,
      ["-"],
      0,
      0
    );
    await uploadImage(newFood);
    generateRandomId(IdTypes.FOOD, menuId).then((id) => {
      let updatedFoodList = menuData.foodList;
      newFood.foodId = id;
      updatedFoodList = [...updatedFoodList, newFood];
      updateMenuById(values.category, updatedFoodList, menuId).finally(() => {
        setIsUploading(false);
      });
    });
  };

  const editFood = async (values) => {
    // TODO: tag logic
    setIsUploading(true);
    let updatedFood = new Food(
      editFoodData.foodId,
      values.category,
      optionGroups,
      values.foodName,
      editFoodData.availability,
      editFoodData.mainPicture,
      values.price,
      editFoodData.addedPicture,
      values.description,
      editFoodData.tags,
      editFoodData.orderCount,
      editFoodData.totalSales
    );
    await uploadImage(updatedFood);
    let updatedFoodList = menuData.foodList;
    for (let i = 0; i < updatedFoodList.length; i++) {
      if (updatedFoodList[i].foodId === updatedFood.foodId) {
        updatedFoodList[i] = updatedFood;
      }
    }
    updateMenuById(values.category, updatedFoodList, menuId).finally(() => {
      setIsUploading(false);
    });
  };

  const uploadImage = async (newFood) => {
    for (let i = 0; i < photosData.length; i++) {
      if (
        photosData[i].file !== null &&
        typeof photosData[i].file !== "string"
      ) {
        const foodImageRef = ref(
          storage,
          `Food-Images/${photosData[i].file.name + uuid()}`
        );
        setIsUploading(true);
        await uploadBytes(foodImageRef, photosData[i].file).then(
          async (response) => {
            await getDownloadURL(response.ref).then(async (url) => {
              if (i === 0) {
                newFood.mainPicture = url;
              } else if (!isEditMode && i !== 0) {
                newFood.addedPicture = [...newFood.addedPicture, url];
              } else if (isEditMode && i !== 0) {
                newFood.addedPicture[i - 1] = url;
              }
            });
          }
        );
      }
    }
  };

  const deletePhoto = (keyId) => {
    if (isEditMode) {
      editFoodData.addedPicture.splice(keyId - 2, 1);
    }
    setPhotosData((prev) => {
      prev = prev.filter((p) => {
        return p.keyId !== keyId;
      });
      if (prev.length === 1)
        return [
          ...prev,
          {
            keyId: prev[prev.length - 1].keyId + 1,
            isMain: false,
            file: null,
          },
        ];
      return prev;
    });
  };

  const onFinish = (values) => {
    if (!isEditMode) addFood(values);
    else editFood(values);
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    // TODO: when category data is ready, loop through category's names here
    options.push({
      label: i.toString(36) + i, // categoryname
      value: i.toString(36) + i, // categoryId
    });
  }

  return (
    <div className="add-menu-container">
      <h1>Add Menu</h1>
      <div className="add-menu-form-container">
        <p>Menu Photos</p>
        <div className="menu-photos-input-container">
          {photosData.map((item, index) => {
            return (
              <AdminMenuPhoto
                isMain={item.isMain}
                key={item.keyId}
                keyId={item.keyId}
                index={index}
                setPhotosData={setPhotosData}
                photosData={photosData}
                deletePhoto={deletePhoto}
              />
            );
          })}
        </div>
        <div className="add-menu-form">
          <Form
            layout="vertical"
            name="basic"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Menu Name"
              name="foodName"
              rules={[
                {
                  required: true,
                  message: "Menu Name must be filled!",
                },
              ]}
            >
              <Input placeholder="Menu Name" />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select Category"
                options={options}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Menu Description" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
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
              <InputNumber placeholder="0" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button loading={isUploading} type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>

          <AdminOptionGroup
            setOptionGroups={setOptionGroups}
            optionGroups={optionGroups}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminAddMenuLayout;
