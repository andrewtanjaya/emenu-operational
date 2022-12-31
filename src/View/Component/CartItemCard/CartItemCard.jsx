import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CartController } from "../../../Controller/CartController";
import "./CartItemCard.css";

function CartItemCard(props) {
  const navigate = useNavigate();
  function handleDelete(cartItemId) {
    let index = props.cartData.cartItems.findIndex(
      (obj) => obj.cartItemId === cartItemId
    );
    if (index >= 0) {
      props.cartData.totalPrice =
        props.cartData.totalPrice -
        props.cartData.cartItems[index].subTotalPrice;
      props.cartData.cartItems.splice(index, 1);
    }

    CartController.updateCart(props.cartData);
  }

  function handleEdit(cartItem) {
    // navigate(`/edit/${cartItem.cartItemId}`, {
    //   state: {
    //     cartItem: cartItem,
    //     cartData: props.cartData,
    //   },
    // });
    props.setSelectedCartItem(cartItem);
    props.setOpen(true);
  }
  return (
    <div className="cart-item-card-container">
      <img
        src={props.cartItem.cartItemPicUrl}
        alt=""
        className="cart-item-picture"
      />
      <div className="cart-item-card-description">
        <span>
          {props.cartItem.cartItemQuantity} x {props.cartItem.cartItemName}
        </span>
        {props.cartItem.cartItemOption &&
          props.cartItem.cartItemOption.map((opt) => {
            return (
              <span className="info-container" key={opt.groupId}>
                <span className="group-option-cart-name">
                  {opt.groupName}&nbsp;:
                </span>
                <p>&nbsp;{opt.optionName}</p>
              </span>
            );
          })}

        {props.cartItem.cartItemNotes && (
          <span className="info-container">
            <span className="group-option-cart-name">Notes :</span>
            <p>{props.cartItem.cartItemNotes}</p>
          </span>
        )}
        <div className="action-button-container">
          <button
            onClick={() => {
              handleEdit(props.cartItem);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(props.cartItem.cartItemId)}>
            Delete
          </button>
        </div>
      </div>
      <div className="cart-item-card-price">
        <p>
          <b>{`IDR. ${props.cartItem.subTotalPrice}`}</b>
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
