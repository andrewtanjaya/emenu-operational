import React from "react";
import "./CashierDashboardLayout.css"
import CashierOrderCard from "../../Component/CashierOrderCard/CashierOrderCard";
import CashierCategoryCard from "../../Component/CashierCategoryCard/CashierCategoryCard";
import CashierMenuCard from "../../Component/CashierMenuCard/CashierMenuCard";

function CashierDashboardLayout() {
  return (
    <div className="cashier-dashboard-container">
      <h1>Order List</h1>
      <div className="cashier-dashboard-order-list-container">
          <CashierOrderCard/>
          <CashierOrderCard/>
          <CashierOrderCard/>
          <CashierOrderCard/>
          <CashierOrderCard/>
      </div>
      <h1>Categories</h1>
      <div className="cashier-dashboard-category-list-container">
        <CashierCategoryCard active={true} icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="All Menu" countItem="72"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Recommended" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
        <CashierCategoryCard icon="https://img.icons8.com/fluency/48/null/cake.png" categoryName="Best Seller" countItem="12"/>
      </div>

      <h1>Menus</h1>
      <div className="cashier-dashboard-menu-list-container">
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
        <CashierMenuCard foodName="Grilled Cheese Salad with mentai sauce" foodPrice="20.000" foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"/>
      </div>
    </div>
  );
}

export default CashierDashboardLayout;
