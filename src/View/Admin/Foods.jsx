import React, { useState } from "react";
import {Button, Col, Input, Row} from "antd";
import AdminCategoryTable from "../Component/AdminCategoryTable/AdminCategoryTable";
import AdminMenuTable from "../Component/AdminMenuTable/AdminMenuTable";
import AdminAddCategoryModal from "../Component/AdminAddCategoryModal/AdminAddCategoryModal";
import { useNavigate } from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {categoryQuery} from "../../Config/Firebase";

function Foods() {

    const [isMenu, setIsMenu] = useState(true);
    const [isCategory, setIsCategory] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [categoryName, setcategoryName] = useState("");
    const [users, isLoading, error] = useCollectionData(
        categoryQuery(keyword, categoryName),
        {
            idField: "email",
        }
    );
    const navigate = useNavigate();

    const columns = [
        {
            title: "Category ID",
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
            render: (text) => <a>{text}</a>,
        }
    ]

    const handleCategory = () => {
        setIsMenu(false);
        setIsCategory(true);
    }

    const handleMenu = () => {
        setIsMenu(true);
        setIsCategory(false);
    }

    const handleModal = () => {
        setIsVisibleModal(true);
    }

    const renderTable = () => {
        if (isMenu) {
            return (
                <AdminMenuTable
                    isMenu={isMenu}
                    setIsMenu={setIsMenu}
                />
            )
        }
        return (
            <AdminCategoryTable
                isCategory={isCategory}
                setIsCategory={setIsCategory}
                columns={columns}
            />
        )
    }

    const renderAddButton = (
        isMenu ?
            <Button
                type="primary"
                onClick={() => {
                    navigate("/admin/addFood");
                }}
            >
                Add Menu
            </Button> :
            <Button
                type="primary"
                onClick={handleModal}
            >
                Add Category
            </Button>
    )

  return (
    <div>
      <h1>Foods Page</h1>
        <Row>
            <Button
                onClick={handleMenu}
            >
                Menu
            </Button>
            <Button
                onClick={handleCategory}
            >
                Category
            </Button>
        </Row>
        <Row align={"middle"}>
            <Col>
                {renderAddButton}
            </Col>
            <Col>
                <Input
                    type='text'
                    placeholder='Search'
                />
            </Col>
        </Row>
        <Row>
            {renderTable()}
        </Row>
        <AdminAddCategoryModal
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={setIsVisibleModal}
        />
    </div>
  );
}

export default Foods;
