import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddCollection({ isOpen, toggle }) {
  const [nameValue, setNameValue] = useState("");
  const [collectionValue, setCollectionValue] = useState("");

  const handleAddToCollection = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/collections?date=${currentDate}`;
    const formData = {
      collection: {
        amount: collectionValue,
        user_id: user?.id,
        name: nameValue,
      },
    };
    console.log("form data", formData);

    axios
      .post(url, formData)
      .then((response) => {
        toggle();
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleClose = () => {
    toggle();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white relative rounded-xl  justify-center items-center flex flex-col p-12 w-2/2">
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-between space-x-3 flex-row">
                <div className="">
                  <p className="text-sm">Name</p>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
                <div>
                  <p className="text-sm">Collection</p>
                  <input
                    type="Number"
                    placeholder="32,344"
                    value={collectionValue}
                    onChange={(e) => setCollectionValue(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-4 flex justify-center space-x-4 items-center mx-4">
              <button
                onClick={handleAddToCollection}
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
          </div>
        </div>
      )}
    </>
  );
}

export default AddCollection;
