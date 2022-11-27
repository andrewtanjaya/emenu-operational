import React from "react";
import {Table} from "antd";

function AdminCategoryTable() {

    const columns = {
        categoryId: {title: 'Category ID'},
        categoryName: {title: 'Category Name'},
        categoryIcon: {title: 'Category Icon'},
    }

    return (
        <div>
            category
            <Table
                // columns={columns}
            />
        </div>
    );
}

export default AdminCategoryTable;