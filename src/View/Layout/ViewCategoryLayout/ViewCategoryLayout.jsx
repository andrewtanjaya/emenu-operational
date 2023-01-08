import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button, Form, Input, Image } from "antd";
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
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2F1st-place-medal_1f947.png?alt=media&token=80dfb1b0-b053-4f24-a6dc-999e72cf8705",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fbroccoli_1f966.png?alt=media&token=95af642a-38d5-43ec-b066-aaada8a3e751",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fbubble-tea_1f9cb.png?alt=media&token=c25c1aee-a421-45a7-93c9-c06ec656889e",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fclinking-beer-mugs_1f37b.png?alt=media&token=1fb2e908-4a97-45c9-846b-35c971228799",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fcrab_1f980.png?alt=media&token=e333f307-1106-4f6b-966b-84da4d67ee2e",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fcut-of-meat_1f969.png?alt=media&token=00e07b5d-0511-4640-89bd-07f616b89905",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fdoughnut_1f369.png?alt=media&token=573efd3b-d606-43b3-b9b2-cea728441d59",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Ffork-and-knife-with-plate_1f37d-fe0f.png?alt=media&token=b08575ad-47fd-4586-8367-538754057580",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Ffrench-fries_1f35f.png?alt=media&token=6efe953b-3e82-48b7-bdb1-b8db3884ae4b",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Ffried-shrimp_1f364.png?alt=media&token=fe37e9b4-8ba1-46eb-a3a3-10798eebf11e",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fgreen-salad_1f957.png?alt=media&token=2742b3ee-2e07-477a-a130-39c9d93b1e0a",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fhamburger_1f354.png?alt=media&token=3eef5c5d-bcc7-4ef7-91aa-53712be5ec27",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fheart-on-fire_2764-fe0f-200d-1f525.png?alt=media&token=f6f55543-2c12-406f-8897-e76cd3063f19",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fhot-beverage_2615.png?alt=media&token=0010f373-bbad-4523-8001-e9187a5c79f1",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Finfinity_267e-fe0f.png?alt=media&token=156483b8-58b0-430a-96c6-0abee64299dc",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fmeat-on-bone_1f356.png?alt=media&token=6d4309bc-f6d4-4992-943d-60d761a52eac",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fshallow-pan-of-food_1f958.png?alt=media&token=238fb679-be4a-4ff2-963f-50ce460c377d",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fshortcake_1f370.png?alt=media&token=8b93e175-0aea-4065-b461-59e8b3425225",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fspaghetti_1f35d.png?alt=media&token=082e6c0a-ed0b-4cc5-abd4-7d0cfa0c9132",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fsteaming-bowl_1f35c.png?alt=media&token=0ff8f7a2-914e-4efb-b3fb-276f6ca4f79b",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fsushi_1f363.png?alt=media&token=c81c88f2-39c2-4ce7-b268-95d31e2f7ca5",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fthumbs-up_1f44d.png?alt=media&token=5c7be981-e1df-44fe-9bd7-683dc4e00f80",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Ftrophy_1f3c6.png?alt=media&token=2ce6ac29-b3ae-45f8-a936-09d8c5a38dc5",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Ftropical-drink_1f379.png?alt=media&token=3ba94097-88e5-44e9-a1a8-1b8c0377d7f9",
  "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fwatermelon_1f349.png?alt=media&token=58a2963c-b0cb-46d7-90cd-7826300b2e58",
];
function ViewCategoryLayout() {
  const columns = [
    {
      title: "Icon",
      dataIndex: "categoryIcon",
      key: "categoryIcon",
      width: "10%",
      render: (iconUrl) => (
        <div className="category-table-icon">
          <Image width={80} height={80} src={iconUrl} fluid />
        </div>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "40%",
    },

    {
      title: "Action",
      key: "action",
      width: "30%",
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
          const categoryNameLowerCase = category.categoryName.toLowerCase();
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
          <div className="add-category-button-container">
            <Button id="addButton" type="primary" onClick={showAddModal}>
              Add Category
            </Button>
          </div>
          <div className="search-category-container">
            <Search
              placeholder="Search category name"
              style={{
                maxWidth: 600,
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
        </div>
        <Modal
          centered
          open={openAddModal}
          onCancel={handleCancel}
          title="Add Category"
          footer={[
            <Button
              className="save-edit-category-button-submit"
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
          <Form
            className="add-category-modal-form"
            form={form}
            onFinish={handleSubmitCategory}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Form.Item
              label="Category Icon"
              name="categoryIcon"
              rules={[
                {
                  required: true,
                  message: "Icon must be selected",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Icon"
                listHeight={300}
                style={{ width: 100 }}
              >
                {icon.map((url) => {
                  return (
                    <Option
                      className="add-category-icon-option-container"
                      value={url}
                      key={uuid()}
                    >
                      <img className="option-category-icon-image" src={url} />
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Category Name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "Category name must be filled",
                },
              ]}
            >
              <Input placeholder="Enter category name" allowClear />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          centered
          open={openEditModal}
          onCancel={handleCancel}
          title="Edit Category"
          footer={[
            <Button
              className="save-edit-category-button-submit"
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
          <Form
            className="add-category-modal-form"
            form={form}
            onFinish={handleEditCategory}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Form.Item label="Category Icon" name="categoryIcon">
              <Select
                size="large"
                placeholder="Select Category Icon"
                listHeight={300}
                style={{ width: 100 }}
              >
                {icon.map((url) => {
                  return (
                    <Option value={url} key={uuid()}>
                      <img className="option-category-icon-image" src={url} />
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Category Name" name="categoryName">
              <Input placeholder="category name" allowClear />
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
