import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import AddCollection from "./AddCollection";
import User from "./User";
import axios from "axios";
import DateSelector from "./DateSelector";
import AddRate from "./AddRate";

function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [float, setFloat] = useState([]);
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);

  const toggle = () => setIsOpen(!isOpen);

  const [openRates, setOpenRates] = useState(false);

  const handleOpen = () => setOpenRates(!openRates);

  useEffect(() => {
    const _user = localStorage.getItem("user");
    if (_user) {
      const capitalizedUser = _user.charAt(0).toUpperCase() + _user.slice(1);
      setUser(JSON.parse(capitalizedUser));
    }
    console.log(typeof _user);
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

  const calcTotalTransactions = () => {
    let total = 0;
    collections.forEach((item) => {
      if (Array.isArray(item.amount)) {
        total += item.amount.length;
      } else if (typeof item.amount === "number") {
        total++;
      }
    });
    return total.toLocaleString();
  };

  const calcTotalCollections = () => {
    let total = 0;
    collections.forEach((item) => {
      total += item.amount;
    });
    return total.toLocaleString();
  };

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
          total += item.amount;
        });
        total /= usdToAEDRate;
      }
      return total;
    } catch (error) {
      console.error("Error calculating total in AED:", error);
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-row h-full ">
        <SideBar />
        <div className="flex w-full mr-8 ml-8 flex-col">
          <User />
          <div className="flex mr-4  items-center mt-20 flex-row w-full justify-between">
            <DateSelector />
            {user && (
              <p className="text-sm font-semibold">Welcome Back {user.name}</p>
            )}

            <div className="flex items-center bg-[#ECEFF4] p-1 space-x-1 rounded-lg">
              <img src="Images/Export.svg" />
              <button className="font-normal text-sm text-[#0066FF]">
                Export Report{" "}
              </button>
            </div>
          </div>
          <div className="flex flex-row mt-4  justify-between space-x-8 items-center">
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-xl">
              <div className="flex flex-col space-y-4">
                <p>Total Transactions</p>
                <p className="font-bold text-3xl">{calcTotalTransactions()}</p>
              </div>
            </div>
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-xl">
              <div className="flex flex-col space-y-4">
                <p>Kenyan Shillings</p>
                <p className="font-bold text-3xl">{calcTotalCollections()}</p>
              </div>
            </div>
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-xl">
              <div className="flex flex-col space-y-4">
                <p>Arab Emirates Dirham </p>
                <p className="font-bold text-3xl">{calcUsdToAed()}</p>
              </div>
            </div>
          </div>

          <div className="flex h-2/3 flex-col mt-4">
            <div className="bg-[#EFF1F4] rounded-xl p-4 w-full ">
              <div className="flex mb-4 justify-between">
                <div className="flex flex-row space-x-2 items-center">
                  <AddRate handleOpen={handleOpen} openRates={openRates} />
                  <button
                    onClick={handleOpen}
                    className="p-2 justify-center  hover:bg-slate-200 rounded-lg items-center text-base flex"
                  >
                    Set Rate
                  </button>
                </div>
                <button
                  onClick={toggle}
                  className="p-2 justify-center  hover:bg-slate-200 rounded-lg items-center text-base flex"
                >
                  <PlusIcon className="h-5 rounded-xl mr-2 bg-[#D7DADF] w-5" />
                  Add a collection
                </button>
                <AddCollection toggle={toggle} isOpen={isOpen} />
              </div>
              <div className="justify-center flex items-center">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left ">
                      <th className=" text-black/50 text-sm font-medium">
                        Name
                      </th>
                      <th className=" text-black/50 text-sm font-medium">
                        Collection
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections && collections.length > 0 ? (
                      collections.map((item, index) => (
                        <tr key={index} className="text-left">
                          <td>{item.name}</td>
                          <td>{item.amount.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr
                        colSpan="4"
                        className="text-sm pt-4 pb-4 font-normal text-center"
                      >
                        <td>No transactions were made on this day</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
