import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Search from "antd/es/input/Search";
import { CategoryController } from "../../../Controller/CategoryController";
import { Category } from "../../../Model/Category";
import { generateRandomId } from "../../../Helper/Helper";
import { IdTypes } from "../../../Enum/IdTypes";
import "./ViewCategoryLayout.css";
import { Option } from "antd/es/mentions";
import { v4 as uuid } from "uuid";

const icon = [
  "https://img.icons8.com/fluency/48/null/green-tea.png",
  "https://img.icons8.com/fluency/48/null/steak.png",
  "https://img.icons8.com/fluency/48/null/steak-medium.png",
  "https://img.icons8.com/fluency/48/null/cake.png",
  "https://img.icons8.com/fluency/48/null/bok-choy.png",
  "https://img.icons8.com/fluency/48/null/curry.png",
];
function ViewCategoryLayout() {
  const columns = [
    {
      title: "Category Id",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category Icon",
      dataIndex: "categoryIcon",
      key: "categoryIcon",
      render: (text) => <img src={text} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            onClick={() => {
              setInitialValueEditForm(record);
              setOpenEditModal(true);
              form.setFieldValue("categoryName", record.categoryName);
              form.setFieldValue("categoryIcon", record.categoryIcon);
            }}
          >
            Edit
          </Link>
          <Link
            onClick={() => {
              confirmDeleteModal(record.categoryId);
            }}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];

  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [initialValueEditForm, setInitialValueEditForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const [categoriesFiltered, setCategoriesFiltered] = useState(null);
  const [categories, isLoading, error] = useCollectionData(
    CategoryController.getAllCategoriesByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    setIsLoad(true);
    if (!isLoading) {
      setCategoriesFiltered(
        categories.filter((category) => {
          const categoryNameLowerCase = category.categoryName;
          return categoryNameLowerCase.includes(keyword.toLowerCase());
        })
      );
      setIsLoad(false);
    }
  }, [categories, keyword]);

  const showAddModal = () => {
    setOpenAddModal(true);
  };

  const handleSubmitCategory = (values) => {
    setLoading(true);
    const categoryId = generateRandomId(IdTypes.CATEGORY);
    let newCategory = new Category(
      categoryId,
      userSession.restaurantId,
      values.categoryName,
      values.categoryIcon
    );
    CategoryController.addCategory(newCategory).then((resp) => {
      setLoading(false);
      setOpenAddModal(false);
      form.resetFields();
    });
  };

  const handleEditCategory = (values) => {
    setLoading(true);
    const categoryId = generateRandomId(IdTypes.CATEGORY);
    let newCategory = new Category(
      initialValueEditForm.categoryId,
      userSession.restaurantId,
      values.categoryName,
      values.categoryIcon
    );
    CategoryController.updateCategory(newCategory).then((resp) => {
      setLoading(false);
      setOpenEditModal(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    form.resetFields();
  };

  const confirmDeleteModal = (categoryId) => {
    Modal.confirm({
      onOk: () => {
        CategoryController.deleteCategoryById(categoryId);
      },
      centered: true,
      title: "Delete",
      content: "Are you sure want to delete this category?",
    });
  };

  return (
    <>
      <div className="view-category-container">
        <div className="category-header-container">
          <Button id="addButton" type="primary" onClick={showAddModal}>
            Add Category
          </Button>
          <Search
            placeholder="input search text"
            style={{
              width: 300,
            }}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
        <Modal
          centered
          open={openAddModal}
          onCancel={handleCancel}
          title="Add Category"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              id="saveButton"
              key="submit"
              type="primary"
              loading={loading}
              onClick={form.submit}
            >
              Save
            </Button>,
          ]}
        >
          <Form form={form} onFinish={handleSubmitCategory}>
            <Form.Item label="Category Name" name="categoryName">
              <Input placeholder="category name" allowClear />
            </Form.Item>
            <Form.Item label="Category Icon" name="categoryIcon">
              <Select placeholder="Please select a role">
                {icon.map((url) => {
                  return (
                    <Option value={url} key={uuid()}>
                      <img src={url} />
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          centered
          open={openEditModal}
          onCancel={handleCancel}
          title="Edit Category"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              id="saveButton"
              key="submit"
              type="primary"
              loading={loading}
              onClick={form.submit}
            >
              Save
            </Button>,
          ]}
        >
          <Form form={form} onFinish={handleEditCategory}>
            <Form.Item label="Category Name" name="categoryName">
              <Input placeholder="category name" allowClear />
            </Form.Item>
            <Form.Item label="Category Icon" name="categoryIcon">
              <Select placeholder="Please select a role">
                {icon.map((url) => {
                  return (
                    <Option value={url} key={uuid()}>
                      <img src={url} />
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <div className="table-category-container">
          <Table
            columns={columns}
            loading={isLoad}
            dataSource={categoriesFiltered}
            rowKey="categoryId"
            bordered
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
            scroll={{
              x: 1200,
            }}
          />
        </div>
      </div>
    </>
  );
}
export default ViewCategoryLayout;
