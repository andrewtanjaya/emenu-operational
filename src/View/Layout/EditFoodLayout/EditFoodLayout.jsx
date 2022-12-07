import React from "react";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { UserController } from "../../../Controller/UserController";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import "./AddFoodLayout.css";
import { Gender } from "../../../Enum/Gender";
import TextArea from "antd/es/input/TextArea";
import { CategoryController } from "../../../Controller/CategoryController";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FoodController } from "../../../Controller/FoodController";
import { Food } from "../../../Model/Food";
import { generateRandomId } from "../../../Helper/Helper";
import { IdTypes } from "../../../Enum/IdTypes";
import { foodImageRef } from "../../../Config/Firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import AdminFoodGroup from "../../Component/AdminFoodGroup/AdminFoodGroup";
import { GroupController } from "../../../Controller/GroupController";
const { Option } = Select;

const EditFoodLayout = () => {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [foodData, setFoodData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [isload, setisload] = useState(true);
  const [foodImages, setFoodImages] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  useEffect(() => {
    CategoryController.getAllCategoriesByRestaurantIdDocs(
      userSession.restaurantId
    ).then((resp) => {
      //   categoryQuery = resp;
      resp.forEach((doc) => {
        setCategoryData((categoryData) => [
          ...categoryData,
          {
            categoryId: doc.data().categoryId,
            categoryName: doc.data().categoryName,
          },
        ]);
      });
    });
    setisload(false);
  }, []);

  const onFinish = async (values) => {
    const foodId = generateRandomId(IdTypes.FOOD);
    setIsUpload(true);
    setOpenSuccessModal(true);
    let foodImagesUrl = [];
    if (foodImages) {
      for (let i = 0; i < foodImages.length; i++) {
        await uploadBytes(
          foodImageRef(`${uuid() + foodImages[i].name}`),
          foodImages[i]
        ).then(async (response) => {
          await getDownloadURL(response.ref).then((url) => {
            foodImagesUrl = [...foodImagesUrl, url];
          });
        });
      }
    }

    let newFood = new Food(
      foodId,
      values.categoryId,
      userSession.restaurantId,
      values.foodName,
      true,
      foodImagesUrl,
      values.foodPrice,
      values.foodDescription.toString(),
      [],
      0,
      0
    );
    FoodController.addFood(newFood).then((resp) => {});

    groupData.forEach((data) => {
      data.foodId = foodId;
      GroupController.addGroup(data);

      setIsUpload(false);
    });
  };

  const successModal = (title, content) => {
    Modal.success({
      onOk: () => {
        navigate("/admin/employee", { replace: true });
      },
      title: title,
      content: content,
    });
  };

  const errorModal = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const onRemoveImage = (file) => {
    const indexImage = foodImages.indexOf(file);
    const newFoodImage = foodImages.slice();
    newFoodImage.splice(indexImage, 1);
    setFoodImages(newFoodImage);
  };

  const beforeUploadImage = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    setFoodImages([...foodImages, file]);
    return false;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewOpen(true);
  };

  function closeSuccessModal() {
    setOpenSuccessModal(false);
  }

  const uploadButton = (
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
  );

  return (
    <>
      <div className="add-food-container">
        <div className="add-food-header">
          <h1>Add Food</h1>
        </div>

        <div className="add-food-form">
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            // initialValues={{
            // }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // initialValues={{ categoryId: ["CTG-03032a1a", "CTG-52699ee8"] }}
          >
            <Row gutter={16} justify="space-evenly">
              <Col span={24}>
                <Form.Item label="Food Photos" name="foodPicture">
                  <Upload
                    beforeUpload={beforeUploadImage}
                    onRemove={onRemoveImage}
                    listType="picture-card"
                    maxCount={6}
                    onPreview={handlePreview}
                  >
                    {uploadButton}
                    {/* {bannersPreview.length + bannersImage.length >= 4
                        ? null
                        : uploadButton} */}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} justify="space-evenly">
              <Col span={12}>
                <Form.Item
                  label="Food Name"
                  name="foodName"
                  rules={[
                    {
                      required: true,
                      message: "Please input foodName!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="categoryId"
                  label="Food Category"
                  rules={[
                    {
                      required: true,
                      message: "Please select category!",
                      type: "array",
                    },
                  ]}
                >
                  <Select mode="multiple" placeholder="Please select category!">
                    {categoryData.map((data) => {
                      return (
                        <Option value={data.categoryId} key={uuid()}>
                          {data.categoryName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Food Description" name="foodDescription">
                  <TextArea rows={4} placeholder="description" />
                </Form.Item>
                <Form.Item label="Food Price" name="foodPrice">
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12}>
                <AdminFoodGroup
                  groupData={groupData}
                  setGroupData={setGroupData}
                ></AdminFoodGroup>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button id="saveButton" type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Modal
            centered
            open={previewOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
          <Modal
            centered
            open={openSuccessModal}
            onCancel={closeSuccessModal}
            title="Success"
            footer={[
              <Button
                id="saveButton"
                // key="submit"
                type="primary"
                loading={isUpload}
                onClick={() => {
                  setOpenSuccessModal(false);
                  navigate("/admin/menu");
                }}
              >
                Ok
              </Button>,
            ]}
          ></Modal>
        </div>
      </div>
    </>
  );
};
export default EditFoodLayout;
