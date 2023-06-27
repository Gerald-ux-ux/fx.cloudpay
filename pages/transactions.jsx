import SideBar from "@/components/SideBar";
import User from "@/components/User";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Transactions() {
  const [collections, setCollections] = useState([]);
  const [disbursements, setDisbursements] = useState([]);
  const [float, setFloat] = useState([]);
  const [rateValue, setRateValue] = useState([]);

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
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/collections?date=${currentDate}`;
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
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/rates?date=${currentDate}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRateValue(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calcClosingBalance = () => {
    let totalCollections = calcUsdToAed();
    console.log(calcUsdToAed());

    float.forEach(() => {
      totalCollections -= calcDisbursementTotal();

      console.log(calcDisbursementTotal());
    });
    return totalCollections.toLocaleString();
  };

  const calcDisbursements = () => {
    let totalDisbursements = 0;
    if (rateValue && rateValue.length > 0) {
      const rate = rateValue[0].amount;
      // Divide each collection by the rate
      collections.forEach((collection) => {
        const disbursement = collection.amount / rate;
        totalDisbursements += disbursement;
      });
    }

    return totalDisbursements;
  };

  const handleAddDisbursments = (amount) => {
    const url = "http://127.0.0.1:3001/disbursments";

    axios
      .post(url, {
        amount: amount.replace(/[.,]/g, ""),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/disbursments?date=${currentDate}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDisbursements(response.data);
        console.log(response.data);
        const calculatedValue = calcDisbursements();
        handleAddDisbursments(calculatedValue);
        const totalDisbursement = calcDisbursementTotal();
        console.log(totalDisbursement);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calcDisbursementTotal = () => {
    let total = 0;
    disbursements.forEach((item) => {
      if (item.disbursment !== null) {
        total += item.disbursment;
      }

      console.log(total);
    });
    return total;
  };

  const calcNumberTotal = () => {
    const total = collections.length;
    return total.toLocaleString();
  };

  const calculateTotal = () => {
    let total = 0;
    collections.forEach((item) => {
      total += item.amount;
    });
    return total.toLocaleString();
  };

  const calcUsdToAed = () => {
    if (float.length === 0) {
      return 0;
    }

    let rate = 3.67;
    float.forEach((item) => {
      rate *= item.amount;
    });
    return rate.toLocaleString();
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
            <p className="">
              Opening balance{" "}
              <span className="font-semibold">{calcUsdToAed()}</span>
            </p>
            <p className="">
              Closing balance{" "}
              <span className=" font-semibold">{calcClosingBalance()}</span>
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
                {collections && collections.length > 0 ? (
                  collections.map((item, index) => (
                    <tr key={index}>
                      <td className="text-sm font-normal">{index + 1}</td>
                      <td className="text-sm font-normal">{item.name}</td>
                      <td className="text-sm font-normal">
                        {item.amount.toLocaleString()}
                      </td>
                      <td className="text-sm font-normal">
                        {calcDisbursements()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-sm pt-4 pb-4 font-normal text-center"
                    >
                      No transactions were made on this day
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="">
                <tr>
                  <td className="text-sm font-semibold">Total</td>
                  <td className="text-sm font-semibold">{calcNumberTotal()}</td>
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

export default Transactions;
