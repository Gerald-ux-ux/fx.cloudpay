import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

function AddCollection({ isOpen, toggle }) {
  const handleClose = () => {
    toggle();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white relative rounded-xl  justify-center items-center flex flex-col p-12 w-2/2">
            <XMarkIcon
              onClick={handleClose}
              className=" bg-[#06f] cursor-pointer text-white absolute top-2 right-4 rounded-full h-6 w-6"
            />
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-between space-x-3 flex-row">
                <div className="">
                  <p className="text-sm">Name</p>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
                <div>
                  <p className="text-sm">Collection</p>
                  <input
                    type="Number"
                    placeholder="32,344"
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-4 flex justify-center items-center mx-4">
              <button className=" font-light justify-center w-full items-center flex rounded-full py-2 bg-[#06f] text-white  ">
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCollection;
