import { Drawer, Form, InputNumber, Radio } from "antd";
import Input from "antd/es/input/Input";
import md5 from "md5";
import React, { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { CartController } from "../../../Controller/CartController";
import { OrderController } from "../../../Controller/OrderController";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { IdTypes } from "../../../Enum/IdTypes";
import { OrderItemStatus } from "../../../Enum/OrderItemStatus";
import { OrderType } from "../../../Enum/OrderType";
import { generateRandomId, rupiahWithoutDecimal } from "../../../Helper/Helper";
import { OrderItem } from "../../../Model/OrderItem";
import { OrderQueue } from "../../../Model/OrderQueue";
import CartItemCard from "../../Component/CartItemCard/CartItemCard";
import EditFoodDrawer from "../../Component/EditFoodDrawer/EditFoodDrawer";
import "./CashierCartPage.css";

function CashierCartPage() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let cartId = "CRT" + "-" + md5(userData.email);

  const [tableOrQueueNumber, setTableOrQueueNumber] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [form] = Form.useForm();
  const [takeawayItems, setTakeAwayItems] = useState(null);
  const [dineInItems, setdineInItems] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const [cart, cartLoading, cartError, cartSnapshot] = useDocumentData(
    CartController.getDocCartById(cartId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    RestaurantController.getRestaurantById(userData.restaurantId).then(
      (resp) => {
        if (resp) {
          setRestaurantData(resp);
        }
      }
    );
  }, []);

  const [taxAmount, setTaxAmount] = useState(0);
  const [serviceChargeAmount, setServiceChargeAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!cartLoading) {
      setdineInItems(getDineInItems());
      setTakeAwayItems(getTakeawayItems());
      if (restaurantData) {
        let taxPrice = Math.ceil(cart.totalPrice * (restaurantData.tax / 100));
        let serviceChargePrice = Math.ceil(
          cart.totalPrice * (restaurantData.serviceCharge / 100)
        );
        setTaxAmount(taxPrice);
        setServiceChargeAmount(serviceChargePrice);
        setTotalPrice(cart.totalPrice + taxPrice + serviceChargePrice);
      }
    }
  }, [cart]);

  function getTakeawayItems() {
    return cart.cartItems.filter((item) => {
      return item.cartItemType === OrderType.TAKEAWAY;
    });
  }
  function getDineInItems() {
    return cart.cartItems.filter((item) => {
      return item.cartItemType === OrderType.DINE_IN;
    });
  }

  function isCartNotExistOrCartItemEmpty() {
    return cart && cart.cartItems.length > 0;
  }

  function findOrderData(tableOrQueueNumber) {
    let number = Number(tableOrQueueNumber);
    if (orderType === OrderType.DINE_IN) {
      OrderController.getUnpaidOrderByOrderTableAndRestaurantId(
        number,
        userData.restaurantId
      ).then((resp) => {
        if (resp.docs.length > 0) {
          let order = resp.docs[0].data();
          form.setFieldsValue({ orderId: order.orderId });
          setOrderData(order);
        } else {
          form.setFieldsValue({ orderId: "Order Not Found" });
        }
      });
    } else if (orderType === OrderType.TAKEAWAY) {
      OrderController.getUnpaidOrderByOrderQueueAndRestaurantId(
        number,
        userData.restaurantId
      ).then((resp) => {
        if (resp.docs.length > 0) {
          let order = resp.docs[0].data();
          form.setFieldsValue({ orderId: order.orderId });
          setOrderData(order);
        } else {
          form.setFieldsValue({ orderId: "Order Not Found" });
        }
      });
    }
  }

  function handleProcessOrder() {
    form.submit();
  }
  function onFinish(values) {
    if (cart.cartItems.length > 0) {
      if (values.orderId && values.orderId !== "Order Not Found") {
        let newOrderQueueId = generateRandomId(IdTypes.ORDER_QUEUE);
        let timestamp = Date.now();
        let orderItems = cart.cartItems.map((item) => {
          let orderItem = new OrderItem(
            item.cartItemId,
            OrderItemStatus.PLACED,
            timestamp,
            item.cartItemQuantity,
            item.cartItemName,
            item.cartItemPrice,
            item.cartItemPicUrl,
            item.cartItemType,
            item.cartItemOption,
            item.cartItemNotes,
            item.subTotalFoodPrice,
            item.subTotalAddedValuePrice,
            item.subTotalPrice
          );
          return Object.assign({}, orderItem);
        });

        orderData.orderItems = [...orderData.orderItems, ...orderItems];

        let totalOrderAmount = 0;
        orderData.orderItems.forEach((item) => {
          totalOrderAmount += item.subTotalPrice;
        });

        let taxAmount = Math.ceil(totalOrderAmount * (orderData.taxRate / 100));
        let serviceChargeAmount = Math.ceil(
          totalOrderAmount * (orderData.serviceChargeRate / 100)
        );

        orderData.taxAmount = taxAmount;
        orderData.serviceChargeAmount = serviceChargeAmount;
        orderData.totalOrderAmount = totalOrderAmount;
        orderData.finalTotalOrderAmount =
          totalOrderAmount + taxAmount + serviceChargeAmount;

        cart.cartItems = [];
        cart.totalPrice = 0;

        CartController.updateCart(cart).then(() => {
          OrderController.updateOrderItems(orderData).then(() => {});
        });

        let newOrderQueue = new OrderQueue(
          newOrderQueueId,
          orderData.orderId,
          orderData.orderType,
          orderData.orderType === OrderType.DINE_IN ? values.tableNumber : null,
          orderData.orderType === OrderType.TAKEAWAY
            ? values.queueNumber
            : null,
          orderData.restaurantId,
          timestamp
        );
        OrderQueueController.addOrderQueue(newOrderQueue).then(() => {});
        form.resetFields();
      }
    }
  }

  const [open, setOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const onClose = () => {
    setOpen(false);
  };

  return (
    !cartLoading && (
      <>
        <div className="cashier-cart-page-container">
          <div className="cashier-cart-and-summary-container">
            <div className="cart-left-container">
              <div className="cart-information-container">
                <div className="cart-title-container">
                  <h3>Cart Information</h3>
                  <Form
                    form={form}
                    onFinish={onFinish}
                    // labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    // layout="horizontal"
                    // onValuesChange={onFormLayoutChange}
                    // disabled={componentDisabled}
                  >
                    <Form.Item label="Order Type">
                      <Radio.Group
                        onChange={(e) => {
                          if (e.target.value === OrderType.DINE_IN) {
                            form.resetFields();
                            setOrderType(OrderType.DINE_IN);
                          } else {
                            form.resetFields();
                            setOrderType(OrderType.TAKEAWAY);
                          }
                        }}
                      >
                        <Radio value={OrderType.DINE_IN}> Dine in </Radio>
                        <Radio value={OrderType.TAKEAWAY}> Takeaway </Radio>
                      </Radio.Group>
                    </Form.Item>
                    {orderType === OrderType.DINE_IN ? (
                      <Form.Item
                        wrapperCol={{ span: 2 }}
                        label="Table Number"
                        name="tableNumber"
                        onChange={(e) => {
                          setTableOrQueueNumber(e.target.value);
                          findOrderData(e.target.value);
                        }}
                      >
                        <Input />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        wrapperCol={{ span: 2 }}
                        label="Queue Number"
                        name="queueNumber"
                        onChange={(e) => {
                          setTableOrQueueNumber(e.target.value);
                          findOrderData(e.target.value);
                        }}
                      >
                        <Input />
                      </Form.Item>
                    )}

                    <Form.Item
                      label="Order Id"
                      name="orderId"
                      wrapperCol={{ span: 12 }}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Form>
                </div>
              </div>
              {isCartNotExistOrCartItemEmpty() ? (
                <>
                  <div className="cart-title-container">
                    <h3>{`My Cart (${cart.cartItems.length})`}</h3>
                  </div>
                  <div className="cart-item-content-container">
                    {dineInItems && dineInItems.length > 0 && (
                      <>
                        <div className="cart-title-container">
                          <b>Dine In</b>
                        </div>
                        <div className="cart-item-container">
                          {dineInItems.map((item) => {
                            return (
                              <CartItemCard
                                key={item.cartItemId}
                                cartItem={item}
                                cartData={cart}
                                setOpen={setOpen}
                                setSelectedCartItem={setSelectedCartItem}
                              ></CartItemCard>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {takeawayItems && takeawayItems.length > 0 && (
                      <>
                        <div className="cart-title-container">
                          <b>Takeaway</b>
                        </div>
                        <div className="cart-item-container">
                          {takeawayItems.map((item) => {
                            return (
                              <CartItemCard
                                key={item.cartItemId}
                                cartItem={item}
                                cartData={cart}
                                setOpen={setOpen}
                                setSelectedCartItem={setSelectedCartItem}
                              ></CartItemCard>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3>Cart Empty</h3>
                  {/* <img
                    className="empty-logo"
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  ></img> */}
                </>
              )}
              <Drawer
                className="atc-drawer"
                placement="right"
                width={450}
                onClose={onClose}
                closable={false}
                open={open}
              >
                {selectedCartItem && (
                  <>
                    <div className="add-to-cart-drawer-container">
                      <EditFoodDrawer
                        cartItemId={selectedCartItem.cartItemId}
                        cartItem={selectedCartItem}
                        cart={cart}
                        setOpen={setOpen}
                      ></EditFoodDrawer>
                    </div>
                  </>
                )}
              </Drawer>
            </div>
            <div className="cart-right-container">
              <div className="cart-summary-container">
                <h3>Cart Summary</h3>

                <div className="cart-summary-content-container">
                  <div className="cart-summary-left-container">
                    <p>Subtotal</p>
                    <p>Tax</p>
                    <p>Service Charge</p>
                  </div>
                  <div className="cart-summary-right-container">
                    <p>{rupiahWithoutDecimal(cart.totalPrice)}</p>
                    {taxAmount === 0 ? (
                      <p>IDR. -</p>
                    ) : (
                      <p>{rupiahWithoutDecimal(taxAmount)}</p>
                    )}

                    {serviceChargeAmount === 0 ? (
                      <p>IDR. -</p>
                    ) : (
                      <p>{rupiahWithoutDecimal(serviceChargeAmount)}</p>
                    )}
                  </div>
                </div>

                <div className="cart-summary-content-container">
                  <div className="cart-summary-left-container">
                    <h3>Total</h3>
                  </div>
                  <div className="cart-summary-right-container">
                    <p>{rupiahWithoutDecimal(totalPrice)}</p>
                  </div>
                </div>
                <button
                  id="cartProcessOrderBtn"
                  onClick={() => {
                    handleProcessOrder();
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default CashierCartPage;
