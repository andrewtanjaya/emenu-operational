import React from 'react'
import "./CashierCategoryCard.css"

function CashierCategoryCard(props) {
  return (
    <div className={props.active ? "cashier-category-card-container active-category-card" : "cashier-category-card-container"}>
        <img src={props.icon}/>
        <div className="cashier-category-card-description">
            <p><b>{props.categoryName}</b></p>
            <p>{props.countItem} menus</p>
        </div>
    </div>
  )
}

export default CashierCategoryCard