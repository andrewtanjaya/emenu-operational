import React, {useState} from "react";
import {Button, Col, Input, Row} from "antd";
import AdminMenuTable from "../../Components/AdminMenuTable/AdminMenuTable";
import AdminCategoryTable from "../../Components/AdminCategoryTable/AdminCategoryTable";
import AddCategoryModal from "../../Components/Modal/AddCategoryModal/AddCategoryModal";

function AdminViewMenuAndCategoryLayout() {

    const [isMenu, setIsMenu] = useState(true);
    const [isCategory, setIsCategory] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);

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
            />
        )
    }

    const renderAddButton = (
        isMenu ?
            <Button>
                Add Menu
            </Button> :
            <Button
                onClick={handleModal}
            >
                Add Category
            </Button>
    )

    return (
        <div>
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
            <AddCategoryModal
                isVisibleModal={isVisibleModal}
                setIsVisibleModal={setIsVisibleModal}
            />
        </div>
    );
}

export default AdminViewMenuAndCategoryLayout;
