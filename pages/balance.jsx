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
  const [collections, setCollections] = useState([]);
  const [rateValue, setRateValue] = useState([]);
  const [closingBalance, setClosingBalance] = useState([]);
  const authUser = () => JSON.parse(localStorage.getItem("user"));


  // post the value that is displayed then also get the value for additional purposes

  // const handlePostClosingBalance = () => {
  //   const currentDate = new Date().toISOString().split("T")[0];

  //   if (currentDate - 1 > 0) {
  //     let float = setFloat;
  //     return (setClosingBalance += float);
  //   }

  //   const url = `http://127.0.0.1:3001/closing?date=${currentDate}&user_id=${
  //     authUser()?.id
  //   }`;
  // };

  // Fetching the Float
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/openings?date=${currentDate}&user_id=${
      authUser()?.id
    }`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        const floatArray = Array.isArray(data) ? data : [data]; // Convert object to array if it's not already an array
        setFloat(floatArray);
        console.log(floatArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const calcUsdToAed = () => {
    if (float.length === 0) {
      return null; // or any other value you want to display when float is empty
    }

    let rate = 3.67;
    float.forEach((item) => {
      rate *= item.amount;
      // Check if the previous day had any closing balance left. If so, add the amount to float(rate) of the new day
      console.log("rate", rate);z
    });

    return rate;
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/rates?date=${currentDate}&user_id=${
      authUser()?.id
    }`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRateValue(response.data[0].amount);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/collections?date=${currentDate}&user_id=${
      authUser()?.id
    }`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCollections(response.data);
        console.log("collections", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Calculating each disbursment
  const calcDisbursements = () => {
    let totalDisbursements = 0;
    // Divide each collection by the rate
    collections.forEach((item) => {
      console.log("Rate Value", rateValue);
      const disbursement = parseFloat(item.amount) / parseFloat(rateValue);
      totalDisbursements += disbursement;
    });

    return totalDisbursements;
  };

  const calcClosingBalance = () => {
    let totalCollections = calcUsdToAed();
    console.log("SDDDDD", totalCollections);
    let totalDisbursements = calcDisbursements();

    console.log("totalDisbursements", totalDisbursements);
    return parseFloat(totalCollections - totalDisbursements)?.toFixed(2);
  };

  const handleAddFloat = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/openings?date=${currentDate}`;

    axios
      .post(url, {
        amount: amount,
        user_id: authUser()?.id,
      })
      .then((response) => {
        console.log(response.data);
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
            {/* <DateSelector />
            <button className="bg-[#ECEFF4] p-2 text rounded-xl">
              Export Report
            </button> */}
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
                  value={amount} // Use amount instead of float
                  onChange={(e) => setAmount(e.target.value)} // Update setAmount instead of setFloat
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
                  <th className=" text-black/50 text-sm font-medium">
                    Float (USD)
                  </th>
                  <th className=" text-black/50 text-sm font-medium">
                    Opening Balance (AED)
                  </th>
                  <th className=" text-black/50 text-sm font-medium">
                    Closing Balance (AED)
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  {Array.isArray(float) && float.length > 0 ? (
                    float.map((item, index) => (
                      <div key={index} className="">
                        <td>{item.amount.toLocaleString()}</td>
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
                  <td>{calcUsdToAed()}</td>
                  <td>{calcClosingBalance()}</td>
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
