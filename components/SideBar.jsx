import React, { useState } from "react";

function SideBar() {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="flex  flex-col items-start">
      <img src="/Images/Cloudpay.svg" alt="" className="mt-4" />

      <div className="flex flex-col absolute top-36 space-y-8 justify-center items-start">
        <div
          className={`flex items-center justify-center cursor-pointer space-x-2 ${
            activeItem === "Home" ? "text-blue-500" : "text-black"
          }`}
          onClick={() => handleItemClick("Home")}
        >
          <img src="/Images/Vector.svg" className="" />
          <p>Home</p>
        </div>
        <div
          className={`flex items-center cursor-pointer justify-between space-x-2 ${
            activeItem === "Transactions" ? "text-blue-500" : "text-black"
          }`}
          onClick={() => handleItemClick("Transactions")}
        >
          <img src="/Images/Arrow.svg" className="" />
          <p>Transactions</p>
        </div>

        <div
          className={`flex items-center cursor-pointer justify-between space-x-2 ${
            activeItem === "Users" ? "text-blue-500" : "text-black"
          }`}
          onClick={() => handleItemClick("Users")}
        >
          <img src="/Images/Avatar.svg" className="" />
          <p>Users</p>
        </div>
        <div
          className={`flex items-center cursor-pointer justify-between space-x-2 ${
            activeItem === "Balance" ? "text-blue-500" : "text-black"
          }`}
          onClick={() => handleItemClick("Balance")}
        >
          <img src="/Images/Wallet.svg" className="" />
          <p>Balance</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
