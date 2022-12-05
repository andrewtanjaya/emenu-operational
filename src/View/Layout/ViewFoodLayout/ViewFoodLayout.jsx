import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserController } from "../../../Controller/UserController";
import Search from "antd/es/input/Search";

function ViewFoodLayout() {
  return (
    <>
      <div className="view-food-container">food</div>
    </>
  );
}
export default ViewFoodLayout;
