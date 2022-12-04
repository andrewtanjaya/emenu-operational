import { Avatar, Image, Switch, Table } from "antd";
import React from "react";
import "./CashierKitchenUpdateMenuAvailableLayout.css";

function CashierKitchenUpdateMenuAvailableLayout() {
  const onChange = (checked, foodId) => {
    //TODO: update food available here
    console.log(`switch to ${checked} ${foodId}`);
  };

  const columns = [
    {
      title: "Main Picture",
      dataIndex: "mainPicture",
      key: "mainPicture",
      render: (_, record) => (
        <div>
          <Image width={90} height={90} src={record.mainPicture} fluid />
        </div>
      ),
      width: "10%"
    },
    {
      title: "Food Name",
      dataIndex: "foodName",
      key: "foodName",
      filters: [
        {
          text: "Ayam Goreng",
          value: "Ayam Goreng",
        },
        {
          text: "Ayam Goreng 2",
          value: "Ayam Goreng 2",
        },
        {
          text: "Ayam Goreng 3",
          value: "Ayam Goreng 3",
        },
        {
          text: "Ayam Goreng 4",
          value: "Ayam Goreng 4",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.foodName === value,
      width: "60%"
    },
    {
      title: "Total Sold",
      dataIndex: "totalSold",
      key: "totalSold",
      sorter: {
        compare: (a, b) => a.totalSold - b.totalSold,
        multiple: 1,
      },
      width: "10%"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
      width: "20%"
    },
    {
      title: "Availability",
      key: "availability",
      render: (_, record) => (
        <div className="update-availability-action-container">
          <Switch
            defaultChecked
            onChange={(checked) => onChange(checked, record.foodId)}
          />
        </div>
      ),
      width: "10%"
    },
  ];
  const data = [
    {
      foodId: "1",
      key: "1",
      mainPicture:
        "https://firebasestorage.googleapis.com/v0/b/emenu-apps.appspot.com/o/Food-Images%2FDreamTalent1.png062aac15-2fc4-4304-8593-f0441972e12b?alt=media&token=1bdd9b95-9626-45a2-b60c-9ff98bbf27c1",
      foodName: "Ayam Goreng",
      totalSold: 99,
      price: 20000,
    },
    {
      foodId: "2",
      key: "2",
      mainPicture:
        "https://firebasestorage.googleapis.com/v0/b/emenu-apps.appspot.com/o/Food-Images%2FDreamTalent1.png062aac15-2fc4-4304-8593-f0441972e12b?alt=media&token=1bdd9b95-9626-45a2-b60c-9ff98bbf27c1",
      foodName: "Ayam Goreng 2",
      totalSold: 9,
      price: 30000,
    },
    {
      foodId: "3",
      key: "3",
      mainPicture:
        "https://firebasestorage.googleapis.com/v0/b/emenu-apps.appspot.com/o/Food-Images%2FDreamTalent1.png062aac15-2fc4-4304-8593-f0441972e12b?alt=media&token=1bdd9b95-9626-45a2-b60c-9ff98bbf27c1",
      foodName: "Ayam Goreng 3",
      totalSold: 10,
      price: 10000,
    },
    {
      foodId: "4",
      key: "4",
      mainPicture:
        "https://firebasestorage.googleapis.com/v0/b/emenu-apps.appspot.com/o/Food-Images%2FDreamTalent1.png062aac15-2fc4-4304-8593-f0441972e12b?alt=media&token=1bdd9b95-9626-45a2-b60c-9ff98bbf27c1",
      foodName: "Ayam Goreng 4",
      totalSold: 10,
      price: 10000,
    },
    {
      foodId: "5",
      key: "5",
      mainPicture:
        "https://firebasestorage.googleapis.com/v0/b/emenu-apps.appspot.com/o/Food-Images%2FDreamTalent1.png062aac15-2fc4-4304-8593-f0441972e12b?alt=media&token=1bdd9b95-9626-45a2-b60c-9ff98bbf27c1",
      foodName: "Ayam Goreng 5",
      totalSold: 10,
      price: 10000,
    },
  ];
  return (
    <div className="update-food-available-container">
      <h1>MENU LIST</h1>
      <div className="update-food-available-table-container">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            defaultPageSize: 4,
            showSizeChanger: true,
            pageSizeOptions: ["10", "50", "100"],
          }}
        />
      </div>
    </div>
  );
}

export default CashierKitchenUpdateMenuAvailableLayout;
