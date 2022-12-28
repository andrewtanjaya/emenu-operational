import React from 'react'
import "./CashierMenuCard.css"

function CashierMenuCard(props) {
  return (
    <div className='cashier-menu-card-container'>
        <img src={props.foodImage}/>
        <p>{props.foodName}</p>
        <p><b>IDR. {props.foodPrice}</b></p>
    </div>
  )
}

export default CashierMenuCard