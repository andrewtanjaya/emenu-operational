import { Button, Form, Input, InputNumber, Radio } from "antd";
import React from "react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { IdTypes } from "../../../Enum/IdTypes";
import { generateRandomId } from "../../../Helper/Helper";
import "./GenerateQrCodeLayout.css";
import ReactToPrint from "react-to-print";
import { useForm } from "antd/es/form/Form";
import { OrderController } from "../../../Controller/OrderController";
import { Order } from "../../../Model/Order";
import { OrderType } from "../../../Enum/OrderType";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { RestaurantController } from "../../../Controller/RestaurantController";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function GenerateQrCodeLayout() {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [form] = Form.useForm();
  const [orderTableNumber, setOrderTableNumber] = useState("");
  const [orderQueueNumber, setOrderQueueNumber] = useState("");
  const [url, setUrl] = useState("");
  const [date, setdate] = useState("");
  const [isDineIn, setIsDineIn] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isShowErrorMsg, setIsShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [serviceChargeRate, setServiceChargeRate] = useState(0);

  let componentRef;
  let startDate = new Date().setHours(0, 0, 0, 0);
  let endDate = new Date().setHours(23, 59, 59, 999);

  const [restaurant, restaurantLoading, restaurantError, restaurantSnapshot] =
    useDocumentData(
      RestaurantController.getRestaurantProfileById(userSession.restaurantId),
      {
        idField: "id",
      }
    );

  useEffect(() => {
    if (!restaurantLoading) {
      form.setFieldsValue({ orderQueue: restaurant.takeAwayOrderCounter + 1 });
    }
  }, [restaurant]);

  const onFinish = (values) => {
    if (values.orderTable) {
      OrderController.getUnpaidOrderByOrderTableAndRestaurantId(
        values.orderTable,
        userSession.restaurantId
      ).then((resp) => {
        if (resp.empty) {
          setIsShowErrorMsg(false);
          createOrder(values);
        } else {
          let orderData = resp.docs[0].data();
          if (orderData.orderCreatedDate < startDate) {
            let d = new Date(orderData.orderCreatedDate);
            let dateString =
              d.getDate() + ", " + months[d.getMonth()] + " " + d.getFullYear();
            setErrorMsg(
              `Order with table number: ${values.orderTable} already created since ${dateString} `
            );
          } else {
            setErrorMsg(
              `Order with table number: ${values.orderTable} already created`
            );
          }
          setIsGenerated(false);

          setIsShowErrorMsg(true);
        }
      });
    } else if (values.orderQueue) {
      OrderController.getUnpaidOrderByOrderQueueAndRestaurantId(
        values.orderQueue,
        userSession.restaurantId
      ).then((resp) => {
        if (resp.empty) {
          setIsShowErrorMsg(false);
          createOrder(values);
          RestaurantController.updateOrderCounter(
            userSession.restaurantId,
            values.orderQueue
          );
        } else {
          setIsGenerated(false);
          setErrorMsg(
            `Order with queue number : ${values.orderQueue} already created`
          );
          setIsShowErrorMsg(true);
        }
      });
    }
  };

  const createOrder = (values) => {
    const orderId = generateRandomId(IdTypes.ORDER);
    let newOrder = new Order(
      orderId,
      userSession.restaurantId,
      values.orderType,
      values.orderTable ? values.orderTable : null,
      values.orderQueue ? values.orderQueue : null,
      PaymentStatus.UNPAID,
      userSession.email,
      "",
      Date.now(),
      null,
      [],
      restaurant.tax,
      restaurant.serviceCharge,
      0,
      0,
      0,
      0,
      ""
    );

    OrderController.addOrder(newOrder).then(() => {
      setUrl(`http://localhost:3000/welcome?orderId=${orderId}`);
      if (values.orderTable) {
        setOrderTableNumber(values.orderTable);
      } else {
        setOrderQueueNumber(values.orderQueue);
      }

      const today = new Date();
      setdate(
        today.getDate() +
          "-" +
          months[today.getMonth()] +
          "-" +
          today.getFullYear() +
          " " +
          today.getHours() +
          ":" +
          today.getMinutes()
      );
      setIsGenerated(true);
    });
  };
  return (
    <>
      <div className="form-container">
        <h1>Generate QR Code</h1>
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Order Type"
            name="orderType"
            rules={[
              { required: true, message: "Please input your orderType!" },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setIsGenerated(false);
                if (e.target.value === OrderType.DINE_IN) {
                  setIsDineIn(true);
                } else {
                  setIsDineIn(false);
                }
              }}
            >
              <Radio value={OrderType.DINE_IN}> Dine In </Radio>
              <Radio value={OrderType.TAKEAWAY}> Takeaway </Radio>
            </Radio.Group>
          </Form.Item>
          {isDineIn ? (
            <Form.Item
              label="Order Table"
              name="orderTable"
              rules={[
                { required: true, message: "Please input your table number!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          ) : (
            <Form.Item label="Order Queue" name="orderQueue">
              <InputNumber disabled />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className="btn-generate-qr-code">
              Generate QR Code
            </Button>
          </Form.Item>
        </Form>

        {isShowErrorMsg && <p>{errorMsg}</p>}
        {isGenerated && (
          <>
            <div ref={(el) => (componentRef = el)} className="qr-template">
            <p>
                {isDineIn
                  ? `Table Number: ${orderTableNumber}`
                  : `Queue Number: ${orderQueueNumber}`}
              </p>
              <QRCode value={url}></QRCode>
              <p>{`${url}`}</p>
              <p className="printed-date-info">Generated : {`${date}`}</p>
            </div>

            <ReactToPrint
              trigger={() => {
                return <Button className="btn-print-qr-code" type="primary">Print</Button>;
              }}
              content={() => componentRef}
              pageStyle="print"
            />
          </>
        )}
      </div>
    </>
  );
}

export default GenerateQrCodeLayout;
