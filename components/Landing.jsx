import React from "react";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  ArrowUpRightIcon,
  ArrowTrendingUpIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

function Landing() {
  return (
    <>
      <div className="flex flex-row h-full ">
        <SideBar />
        <div className="flex w-full mr-8 ml-8 flex-col">
          <div className="flex mr-4  items-center mt-16 flex-row w-full justify-between">
            <div className="flex items-center space-x-1">
              <p className="font-normal text-sm">Today </p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="flex items-center bg-[#ECEFF4] p-1 space-x-1 rounded-lg">
              <img src="Images/Export.svg" />
              <p className="font-normal text-sm text-[#0066FF]">
                Export Report{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-4  justify-between space-x-8 items-center">
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-lg">
              <div className="flex flex-col space-y-4">
                <p>Total Transactions</p>
                <p className="font-bold text-3xl">24</p>
                <div className="flex space-x-2 items-center">
                  <div className="bg-[#06f] flex rounded-xl items-center p-1">
                    <ArrowUpRightIcon className="h-4 text-white w-4" />
                    <p className="text-xs  text-white">21%</p>
                  </div>
                  <p className="font-thin text-xs text-black/30">
                    the last 3 months
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-lg">
              <div className="flex flex-col space-y-4">
                <p>Kenyan Shillings</p>
                <p className="font-bold text-3xl">623,340</p>
                <div className="flex space-x-2 items-center">
                  <div className="bg-[#06f] flex rounded-xl items-center p-1">
                    <ArrowUpRightIcon className="h-4 text-white w-4" />
                    <p className="text-xs  text-white">21%</p>
                  </div>
                  <p className="font-thin text-xs text-black/30">
                    the last 3 months
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] shadow-gray-200 shadow p-4 w-full h-full rounded-lg">
              <div className="flex flex-col space-y-4">
                <p>Arab Emirates Dirham </p>
                <p className="font-bold text-3xl">16,633.57</p>
                <div className="flex space-x-2 items-center">
                  <div className="bg-[#06f] flex rounded-xl items-center p-1">
                    <ArrowUpRightIcon className="h-4 text-white w-4" />
                    <p className="text-xs  text-white">21%</p>
                  </div>
                  <p className="font-thin text-xs text-black/30">
                    the last 3 months
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-2/3 flex-col mt-4">
            <div className="bg-[#EFF1F4] rounded-xl p-4 w-full h-5/6">
              <div className="flex justify-between">
                <div className="flex flex-row space-x-2 items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4" />
                  <p className="text-base">Today's Rates = </p>
                  <input
                    placeholder="38.9"
                    className="bg-[#D7DADF] p-1 w-4/12 border text-xs text-center rounded-lg"
                  />
                </div>
                <button className="text-base flex">
                  <PlusIcon className="h-5 rounded-full mr-2 bg-[#D7DADF] w-5" />{" "}
                  Add a collection
                </button>
              </div>
              <div className="flex flex-col px-8  justify-between">
                <div className="border-b flex justify-between w-full">
                  <p className=" text-sm">Name</p>
                  <p className=" text-sm">Collection</p>
                </div>
                <div className="flex-col flex justify-between w-full">
                  <div className="flex  justify-between">
                    <p className=" text-sm">Name</p>
                    <p className=" text-sm">Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
