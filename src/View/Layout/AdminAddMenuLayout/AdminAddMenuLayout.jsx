import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuid } from "uuid";
import { menusRef, storage } from "../../../Config/Firebase";
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
  const [menuId, setMenuId] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [optionGroups, setOptionGroups] = useState([]);
  const [photosData, setPhotosData] = useState([
    { keyId: 1, isMain: true, file: null },
    { keyId: 2, isMain: false, file: null },
  ]);
  const [isUploading, setIsUploading] = useState(false);

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
    // TODO: groupId logic, and tag logic
    let newFood = new Food(
      "",
      values.category,
      ["-"],
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

  const uploadImage = async (newFood) => {
    for (let i = 0; i < photosData.length; i++) {
      if (photosData[i].file !== null) {
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
              } else {
                newFood.addedPicture = [...newFood.addedPicture, url];
              }
            });
          }
        );
      }
    }
  };

  const deletePhoto = (keyId) => {
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
    addFood(values);
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
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
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
              <Input />
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
              <TextArea rows={4} />
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
              <InputNumber />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <AdminOptionGroup />
        </div>

        {isUploading ? <p>Uploading image</p> : <></>}
      </div>
    </div>
  );
}

export default AdminAddMenuLayout;
