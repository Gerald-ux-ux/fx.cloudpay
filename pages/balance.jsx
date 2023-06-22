import DateSelector from "@/components/DateSelector";
import SideBar from "@/components/SideBar";
import User from "@/components/User";
import { PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";

function balance() {
  const [float, setFloat] = useState([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/openings?date=${currentDate}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFloat(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  async function getUSDtoAEDRate() {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const rates = response.data.rates;
      const usdToAEDRate = rates["AED"];
      return usdToAEDRate;
    } catch (error) {
      console.error("Error fetching USD to AED rate:", error);
      return null;
    }
  }

  const calcTotalAed = async () => {
    try {
      let total = 0;
      const usdToAEDRate = await getUSDtoAEDRate();
      if (usdToAEDRate) {
        float.forEach((item) => {
          total += item.amount.toLocaleString();
        });
        total /= usdToAEDRate.toLocaleString();
      }
      return total;
    } catch (error) {
      console.error("Error calculating total in AED:", error);
      return null;
    }
  };

  const handleAddFloat = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/openings?date=${currentDate}`;

    axios
      .post(url, {
        amount: amount,
      })
      .then((response) => {
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      <div className="bg-[#F6F7F9] flex flex-row h-screen px-32">
        <SideBar />
        <div className="flex flex-col w-full">
          <User />

          <div className="flex mr-4 mb-6  items-center mt-20   flex-row w-full justify-between">
            <DateSelector />
            <button className="bg-[#ECEFF4] p-2 text rounded-xl">
              Export Report
            </button>
          </div>
          <div className=" flex justify-end mb-4 items-center">
            <button
              onClick={handleShow}
              className="primary p-2 rounded-xl text-white flex flex-row"
            >
              Add Float
            </button>
          </div>
          {show && (
            <div className="flex bg-[#ECEFF4] items-center justify-between mb-4  w-full rounded-lg p-4">
              <div className="flex space-x-4">
                <p className="font-semibold text-sm">Enter amount</p>
                <input
                  type="text"
                  value={float}
                  onChange={(e) => setFloat(e.target.value)}
                  className="bg-[#ECEFF4]"
                  placeholder="6,363 USD"
                />
              </div>

              <button
                onClick={handleAddFloat}
                className="rounded-full flex justify-center items-center w-8 h-8 bg-[#06f]"
              >
                <PlusIcon className="h-6 w-6 text-white " />
              </button>
            </div>
          )}

          <div className="flex p-4 bg-[#EFF1F4]  justify-between rounded-xl items-center flex-col">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className=" text-black/50 text-sm font-medium">Float</th>
                  <th className=" text-black/50 text-sm font-medium">
                    Opening Balance
                  </th>
                  <th className=" text-black/50 text-sm font-medium">
                    Closing Balance
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  {float &&
                    float.map((item, index) => (
                      <div key={index} className="">
                        <td>{item.amount}</td>
                      </div>
                    ))}
                  <td className="text-sm ">6378 USD</td>
                  <td className="text-sm ">367490 AED</td>
                  <td className="text-sm ">2889 AED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default balance;
