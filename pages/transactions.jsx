import SideBar from "@/components/SideBar";
import User from "@/components/User";
import axios from "axios";
import React, { useEffect, useState } from "react";

function transactions() {
  const [collections, setCollections] = useState([]);
  const [float, setFloat] = useState([]);

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

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/collections? ${currentDate}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCollections(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  const calcDisbursementTotal = () => {
    let total = 0;
    collections.forEach((item) => {
      total += item.amount;
    });
    return total.toLocaleString();
  };

  const calcNumberTotal = () => {
    let total = 0;
    collections.forEach((item) => {
      total += item.index;
    });
    return total.toLocaleString();
  };

  const calculateTotal = () => {
    let total = 0;
    collections.forEach((item) => {
      total += item.amount;
    });
    return total.toLocaleString();
  };

  return (
    <>
      <div className="bg-[#F6F7F9] flex flex-row h-screen px-32">
        <SideBar />
        <div className="flex flex-col w-full">
          <User />

          <div className="flex mr-4 mb-6  items-center mt-20   flex-row w-full justify-between">
            <p>Today</p>
            <button className="bg-[#ECEFF4] p-2 text rounded-xl">
              Export Report
            </button>
          </div>

          <div className="flex justify-between w-full  p-4 bg-[#EFF1F4] rounded-lg items-center">
            <p className="text-lg">
              Opening balance <span className="font-semibold">34,123 AED</span>
            </p>
            <p className=" text-lg">
              Closing balance
              <span className=" font-semibold">2,334 AED</span>
            </p>
          </div>
          <div className="flex bg-[#EFF1F4] p-4 rounded-xl mt-4 flex-col">
            <table>
              <thead className="mt-2 text-left">
                <tr className=" border-b">
                  <th className="text-sm leading-none text-[#000]/50 font-normal">
                    Number
                  </th>
                  <th className="text-sm text-[#000]/50 font-normal">Name</th>
                  <th className="text-sm text-[#000]/50 font-normal">
                    Collection
                  </th>
                  <th className="text-sm text-[#000]/50 font-normal">
                    Disbursements
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr>
                  {collections && collections.length > 0 ? (
                    collections.map((item, index) => (
                      <div key={index} className="text-sm font-normal">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.amount}</td>
                      </div>
                    ))
                  ) : (
                    <td
                      colSpan="4"
                      className="text-sm pt-4 pb-4 font-normal text-center"
                    >
                      No transactions were made on this day
                    </td>
                  )}
                </tr>
              </tbody>
              <tfoot className="">
                <tr>
                  <td className="text-sm font-semibold">Total</td>
                  <td className="text-sm font-semibold ">
                    {calcNumberTotal()}
                  </td>
                  <td className="text-sm font-semibold">{calculateTotal()}</td>
                  <td className="text-sm font-semibold">
                    {calcDisbursementTotal()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default transactions;
