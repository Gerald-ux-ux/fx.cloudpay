import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

function AddRate({ handleOpen, openRates }) {
  const [rateValue, setRateValue] = useState("");

  const handleAddRate = () => {};

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
                      // value={nameValue}
                      // onChange={(e) => setNameValue(e.target.value)}
                      className="border p-2 rounded-lg w-full"
                    />
                  </div>
                  <div className="w-full mt-4 flex justify-center space-x-4 items-center mx-4">
                    <button
                      // onClick={handleAddToCollection}
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
