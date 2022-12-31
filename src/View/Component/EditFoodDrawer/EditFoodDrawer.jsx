import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Radio, Space } from "antd";
import DetailMenuSlider from "../DetailMenuSlider/DetailMenuSlider";
import GroupOptionComponent from "../GroupOptionComponent/GroupOptionComponent";
import { GroupController } from "../../../Controller/GroupController";
import TextArea from "antd/es/input/TextArea";
import "./EditFoodDrawer.css";
import { generateRandomId } from "../../../Helper/Helper";
import { IdTypes } from "../../../Enum/IdTypes";
import { CartItem } from "../../../Model/CartItem";
import md5 from "md5";
import { OrderType } from "../../../Enum/OrderType";
import { CartController } from "../../../Controller/CartController";
import { Cart } from "../../../Model/Cart";
import { useLocation } from "react-router-dom";
import { FoodController } from "../../../Controller/FoodController";

const EditFoodDrawer = (props) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [form] = Form.useForm();
  const [groupData, setGroupData] = useState([]);
  const [readMore, setReadMore] = useState(true);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [foodData, setFoodData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    let cartItemIdSplitted = props.cartItemId.split("-");
    let foodId = cartItemIdSplitted[0] + "-" + cartItemIdSplitted[1];
    FoodController.getFoodById(foodId).then((food) => {
      setFoodData(food);
    });
    GroupController.getAllGroupsByFoodIdDocs(foodId).then((groupSnap) => {
      let groupTemp = [];
      groupSnap.forEach((doc) => {
        groupTemp = [...groupTemp, doc.data()];
      });
      setGroupData(groupTemp);
    });

    if (props.cartItem.cartItemOption.length > 0) {
      props.cartItem.cartItemOption.forEach((opt) => {
        form.setFieldsValue({ [opt.groupId]: opt.optionId });
      });
    }
    form.setFieldsValue({
      notes: props.cartItem.cartItemNotes,
      foodOrderType: props.cartItem.cartItemType,
    });
    setQty(props.cartItem.cartItemQuantity);
    setIsLoading(false);
  }, [props.cartItemId]);

  function handleAddToCart() {
    form.submit();
  }

  const onFinish = (values) => {
    let cartId = "CRT" + "-" + md5(userData.email);
    let optionIdsAndNotes = "";
    let sumTotalAddedValue = 0;
    let selectedGroups = [];

    if (groupData) {
      groupData.forEach((data) => {
        if (values[data.groupId]) {
          optionIdsAndNotes += values[data.groupId];

          let addedValue = 0;
          let optionName = "";
          data.options.forEach((option) => {
            if (option.optionId === values[data.groupId]) {
              addedValue = option.optionPrice;
              optionName = option.optionName;
            }
          });

          let group = {
            groupId: data.groupId,
            optionId: values[data.groupId],
            groupName: data.groupName,
            optionName: optionName,
            addedValue: Number(addedValue),
          };

          selectedGroups.push(group);
          sumTotalAddedValue += Number(addedValue);
        }
      });
    }

    if (values.notes) {
      optionIdsAndNotes += values.notes;
    }

    let cartItemId =
      foodData.foodId +
      "-" +
      md5(optionIdsAndNotes) +
      "-" +
      values.foodOrderType;

    let subTotalFoodPrice = foodData.foodPrice * qty;
    let subTotalAddedValue = sumTotalAddedValue * qty;

    let cartItem = new CartItem(
      cartItemId,
      qty,
      foodData.foodName,
      foodData.foodPrice,
      foodData.foodPictures[0],
      values.foodOrderType,
      selectedGroups,
      values.notes ? values.notes : "",
      subTotalFoodPrice,
      subTotalAddedValue,
      subTotalFoodPrice + subTotalAddedValue
    );

    let cart = props.cart;
    let cartItemIndex = cart.cartItems.findIndex(
      (obj) => obj.cartItemId === props.cartItemId
    );
    cart.cartItems[cartItemIndex].cartItemId = cartItemId;
    cart.cartItems[cartItemIndex].cartItemNotes = values.notes;
    cart.cartItems[cartItemIndex].cartItemOption = selectedGroups;
    cart.cartItems[cartItemIndex].cartItemQuantity = qty;
    cart.cartItems[cartItemIndex].subTotalAddedValue = subTotalAddedValue;
    cart.cartItems[cartItemIndex].subTotalFoodPrice = subTotalFoodPrice;
    cart.cartItems[cartItemIndex].subTotalPrice =
      subTotalFoodPrice + subTotalAddedValue;

    cart.totalPrice = calculateTotalPrice(cart.cartItems);
    CartController.updateCart(cart).then(() => {
      resetAndCloseModal();
    });
  };

  function resetAndCloseModal() {
    setGroupData([]);
    form.resetFields();
    setQty(1);
    props.setOpen(false);
  }

  function isCartItemExist(cartItem, cartItemId) {
    return cartItem.some((item) => item.cartItemId === cartItemId);
  }

  function calculateTotalPrice(cartItem) {
    let totalPrice = 0;
    cartItem.forEach((item) => {
      totalPrice += item.subTotalPrice;
    });
    return totalPrice;
  }

  return (
    !isLoading && (
      <>
        <div className="detail-menu-page-container">
          <DetailMenuSlider
            foodPictures={foodData.foodPictures}
          ></DetailMenuSlider>
          <div className="detail-menu-page-content-container">
            <div className="detail-menu-page-food-title">
              <p>
                <b>{foodData.foodName}</b>
              </p>
              <p>
                <b>{foodData.totalSold} Sold</b>
              </p>
            </div>
            {readMore ? (
              <div className="detail-menu-page-food-description-short">
                <p>{foodData.foodDescription}</p>
                <span onClick={() => setReadMore(false)}>Read More</span>
              </div>
            ) : (
              <div className="detail-menu-page-food-description-long">
                <p>{foodData.foodDescription}</p>
                <span onClick={() => setReadMore(true)}>Read Less</span>
              </div>
            )}
            <Form className="form-atc" form={form} onFinish={onFinish}>
              <div className="detail-menu-page-group-container">
                {groupData ? (
                  groupData.map((group) => (
                    <GroupOptionComponent key={group.groupId} group={group} />
                  ))
                ) : (
                  <></>
                )}
              </div>

              <div className="detail-menu-page-food-notes">
                <p>
                  <b>Notes</b>
                </p>
                <Form.Item name="notes">
                  <TextArea rows={6} placeholder="Notes" />
                </Form.Item>
              </div>

              <div className="detail-menu-page-food-notes">
                <p>
                  <b>Food Order Type</b>
                </p>
                <Form.Item
                  name="foodOrderType"
                  rules={[
                    {
                      required: true,
                      message: `Fill food order type`,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={OrderType.DINE_IN}> Dine In </Radio>
                    <Radio value={OrderType.TAKEAWAY}> Takeaway </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div className="detail-menu-page-bottom-nav">
                <div className="add-to-cart-quantity-container">
                  <p>
                    <b>Item Quantity</b>
                  </p>
                  <div className="input-number-stepper">
                    <div
                      className="input-number-stepper-minus"
                      onClick={() => {
                        setQty((qty) => {
                          if (qty > 1) {
                            return qty - 1;
                          }
                          return qty;
                        });
                      }}
                    >
                      -
                    </div>
                    <p>{qty}</p>
                    <div
                      className="input-number-stepper-plus"
                      onClick={() => {
                        setQty((qty) => {
                          return qty + 1;
                        });
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleAddToCart()}
                  className={
                    foodData.foodAvailability
                      ? "add-to-cart-button active"
                      : "add-to-cart-button inactive"
                  }
                >
                  {foodData.foodAvailability ? (
                    <p>
                      <b>Update Cart - {foodData.foodPrice * qty}</b>
                    </p>
                  ) : (
                    <p>
                      <b>Food is not available</b>
                    </p>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </>
    )
  );
};
export default EditFoodDrawer;
