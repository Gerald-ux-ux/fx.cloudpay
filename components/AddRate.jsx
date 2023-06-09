import axios from "axios";
import React, { useState } from "react";

function AddRate({ handleOpen, openRates }) {
  const [rateValue, setRateValue] = useState("");
  const authUser = () => JSON.parse(localStorage.getItem("user"));

  const handleAddRate = () => {
    const url = "http://127.0.0.1:3001/rates";

    axios
      .post(url, {
        amount: rateValue,
        user_id: authUser()?.id,
      })
      .then((response) => {
        handleOpen();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    handleOpen();
  };

  return (
    <div>
      {openRates && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white relative w-1/3 rounded-xl  justify-center items-center flex flex-col p-12 w-2/2">
            <div className="flex w-full justify-center items-center flex-col">
              <div className="flex w-full items-center justify-between space-x-3 flex-row">
                <form className="flex flex-col justify-between w-full items-center">
                  <div className="flex w-full flex-col">
                    <p>Todays Rate</p>
                    <input
                      type="number"
                      placeholder="38.8"
                      value={rateValue}
                      onChange={(e) => setRateValue(e.target.value)}
                      className="border p-2 rounded-lg w-full"
                    />
                  </div>
                  <div className="w-full mt-4 flex justify-center space-x-4 items-center mx-4">
                    <button
                      onClick={handleAddRate}
                      className=" font-light justify-center w-full items-center flex rounded-xl py-2 bg-[#06f] text-white  "
                    >
                      Add to Collection
                    </button>

                    <button
                      onClick={handleClose}
                      className=" font-light justify-center w-full items-center flex rounded-xl py-2 border border-[#06f] text-black/50  "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRate;
