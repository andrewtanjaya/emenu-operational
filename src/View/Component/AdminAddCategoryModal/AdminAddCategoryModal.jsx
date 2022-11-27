import React from "react";
import {Modal} from "antd";

function AdminAddCategoryModal({isVisibleModal, setIsVisibleModal}) {

    const handleCancel = () => {
        setIsVisibleModal(false)
    }

    return (
        <Modal
            visible={isVisibleModal}
            title={'Add New Category'}
            closable={true}
            onCancel={handleCancel}
        >
            Haha
        </Modal>
    );
}

export default AdminAddCategoryModal;