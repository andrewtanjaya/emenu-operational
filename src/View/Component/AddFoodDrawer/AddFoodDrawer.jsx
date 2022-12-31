import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Radio, Space } from "antd";
import DetailMenuSlider from "../DetailMenuSlider/DetailMenuSlider";
import GroupOptionComponent from "../GroupOptionComponent/GroupOptionComponent";
import { GroupController } from "../../../Controller/GroupController";
import TextArea from "antd/es/input/TextArea";
import "./AddFoodDrawer.css";
import { generateRandomId } from "../../../Helper/Helper";
import { IdTypes } from "../../../Enum/IdTypes";
import { CartItem } from "../../../Model/CartItem";
import md5 from "md5";
import { OrderType } from "../../../Enum/OrderType";
import { CartController } from "../../../Controller/CartController";
import { Cart } from "../../../Model/Cart";

// const foodTypeOption = {
//     groupId:"GRP-11111",
//     groupName:"Food Order Type",
//     isRequired:true,
//     option:[
//         {
//             optionId:"OPT-11111",
//             optionName:"Dine In",
//             optionPrice:0
//         },
//         {
//             optionId:"OPT-11111",
//             optionName:"Take ",
//             optionPrice:0
//         }
//     ]
// }
const AddFoodDrawer = (props) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [form] = Form.useForm();
  const [groupData, setGroupData] = useState([]);
  const [readMore, setReadMore] = useState(true);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    form.resetFields();
    setIsLoading(true);
    GroupController.getAllGroupsByFoodIdDocs(props.foodData.foodId).then(
      (groupSnap) => {
        let groupTemp = [];
        groupSnap.forEach((doc) => {
          groupTemp = [...groupTemp, doc.data()];
        });
        setGroupData(groupTemp);
        setIsLoading(false);
      }
    );
  }, [props.foodData]);

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
      props.foodData.foodId +
      "-" +
      md5(optionIdsAndNotes) +
      "-" +
      values.foodOrderType;

    let subTotalFoodPrice = props.foodData.foodPrice * qty;
    let subTotalAddedValue = sumTotalAddedValue * qty;

    let cartItem = new CartItem(
      cartItemId,
      qty,
      props.foodData.foodName,
      props.foodData.foodPrice,
      props.foodData.foodPictures[0],
      values.foodOrderType,
      selectedGroups,
      values.notes ? values.notes : "",
      subTotalFoodPrice,
      subTotalAddedValue,
      subTotalFoodPrice + subTotalAddedValue
    );

    CartController.getCartById(cartId).then((resp) => {
      if (resp) {
        //if cart exist
        let cartItems = resp.cartItems;
        if (isCartItemExist(cartItems, cartItemId)) {
          //if cartItem exist
          let index = resp.cartItems.findIndex(
            (obj) => obj.cartItemId === cartItemId
          );
          resp.cartItems[index].cartItemQuantity += cartItem.cartItemQuantity;
          resp.cartItems[index].subTotalFoodPrice =
            resp.cartItems[index].cartItemQuantity *
            resp.cartItems[index].cartItemPrice;
          resp.cartItems[index].subTotalAddedValuePrice =
            resp.cartItems[index].cartItemQuantity * sumTotalAddedValue;
          resp.cartItems[index].subTotalPrice =
            resp.cartItems[index].subTotalAddedValuePrice +
            resp.cartItems[index].subTotalFoodPrice;
          resp.totalPrice = calculateTotalPrice(cartItems);
          CartController.updateCart(resp).then(() => {
            resetAndCloseModal();
          });
        } else {
          //if cartItem not exist
          resp.cartItems.push(Object.assign({}, cartItem));
          resp.totalPrice = calculateTotalPrice(cartItems);
          CartController.updateCart(resp).then(() => {
            resetAndCloseModal();
          });
        }
      } else {
        //if cart not exist
        let cart = new Cart(
          cartId,
          userData.restaurantId,
          "",
          null,
          null,
          [Object.assign({}, cartItem)],
          subTotalFoodPrice + subTotalAddedValue
        );

        CartController.addCart(cart).then(() => {
          resetAndCloseModal();
        });
      }
    });
  };

  function resetAndCloseModal() {
    setGroupData([]);
    form.resetFields();
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
            foodPictures={props.foodData.foodPictures}
          ></DetailMenuSlider>
          <div className="detail-menu-page-content-container">
            <div className="detail-menu-page-food-title">
              <p>
                <b>{props.foodData.foodName}</b>
              </p>
              <p>
                <b>{props.foodData.totalSold} Sold</b>
              </p>
            </div>
            {readMore ? (
              <div className="detail-menu-page-food-description-short">
                <p>{props.foodData.foodDescription}</p>
                <span onClick={() => setReadMore(false)}>Read More</span>
              </div>
            ) : (
              <div className="detail-menu-page-food-description-long">
                <p>{props.foodData.foodDescription}</p>
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
                    props.foodData.foodAvailability
                      ? "add-to-cart-button active"
                      : "add-to-cart-button inactive"
                  }
                >
                  {props.foodData.foodAvailability ? (
                    <p>
                      <b>Add To Cart - {props.foodData.foodPrice * qty}</b>
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
export default AddFoodDrawer;
