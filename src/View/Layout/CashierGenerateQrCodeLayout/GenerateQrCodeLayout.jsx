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
  const [orderIdUrl, setOrderIdUrl] = useState("");
  const [orderTableNumber, setOrderTableNumber] = useState("");
  const [orderQueueNumber, setOrderQueueNumber] = useState("");
  const [url, setUrl] = useState("");
  const [date, setdate] = useState("");
  const [isDineIn, setIsDineIn] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isShowErrorMsg, setIsShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  let componentRef;

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
          setIsGenerated(false);
          setErrorMsg(
            `Order with table number: ${values.orderTable} already created`
          );
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
      0,
      [],
      0,
      0,
      0,
      0,
      ""
    );

    OrderController.addOrder(newOrder).then(() => {
      setOrderIdUrl(orderId);
      setUrl(`http://localhost:3000/welcome?orderId=${orderIdUrl}`);
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
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item
            label="Order Type"
            name="orderType"
            rules={[{ required: true, message: "Please input your username!" }]}
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
            <Form.Item
              label="Order Queue"
              name="orderQueue"
              rules={[
                { required: true, message: "Please input your queue number!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Generate QR Code
            </Button>
          </Form.Item>
        </Form>

        {isShowErrorMsg && <p>{errorMsg}</p>}
        {isGenerated && (
          <>
            <div ref={(el) => (componentRef = el)} className="qr-template">
              <h3>
                {isDineIn
                  ? `Table Number: ${orderTableNumber}`
                  : `Queue Number: ${orderQueueNumber}`}
              </h3>
              <h4>Printed: {`${date}`}</h4>
              <QRCode value={url}></QRCode>
              <h4>{`${url}`}</h4>
            </div>

            <ReactToPrint
              trigger={() => {
                return (
                  <Button id="printBtn" type="primary" htmlType="submit">
                    Print
                  </Button>
                );
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
