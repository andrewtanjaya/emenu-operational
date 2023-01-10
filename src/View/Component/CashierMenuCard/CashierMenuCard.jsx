import React from "react";
import { rupiahWithoutDecimal } from "../../../Helper/Helper";
import "./CashierMenuCard.css";

function CashierMenuCard(props) {
  function handleOpen() {
    // console.log(props.food);
    props.setSelectedFood(props.food);
    // props.setSelectedFood("test");
    props.setOpen(true);
  }
  return (
    <div
      className="cashier-menu-card-container"
      onClick={() => {
        handleOpen();
      }}
    >
      <img src={props.foodImage} />
      <p>{props.foodName}</p>
      <p>
        <b>{rupiahWithoutDecimal(props.foodPrice)}</b>
      </p>
    </div>
  );
}

export default CashierMenuCard;
