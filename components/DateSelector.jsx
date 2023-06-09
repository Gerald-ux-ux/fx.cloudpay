import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const selector = [
  {
    name: "Today",
    getDateRange: () => {
      const today = new Date();
      return {
        startDate: today,
        endDate: today,
      };
    },
  },
  {
    name: "This week",
    getDateRange: () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      return {
        startDate,
        endDate: today,
      };
    },
  },
  {
    name: "This month",
    getDateRange: () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        startDate,
        endDate: today,
      };
    },
  },
];

function DateSelector() {
  const [showDrop, setShowDrop] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(selector[0]);

  // const Tags = ["Today", "This Week", "This Month"];

  // if (Tags === "Today") {
  //   return new Date();
  // } else if (Tags === "This Week") {
  //   const Today = new Date();
  //   const startDate = new Date(Today);
  //   startDate.setDate(Today.getDate() - 6);
  //   return {
  //     startDate,
  //     endDate: Today,
  //   };
  // } else

  const handleDrop = () => {
    setShowDrop(!showDrop);
  };

  const handleTimelineSelect = (timeline) => {
    setSelectedTimeline(timeline);
    setShowDrop(false);

    // Perform data update or fetch based on the selected timeline
    const { startDate, endDate } = timeline.getDateRange();
    console.log("Selected timeline:", timeline);
    console.log("Selected timeline date range:", startDate, endDate);
    // Update data or fetch data based on the selected timeline
    updateData(startDate, endDate);
  };

  const updateData = (startDate, endDate) => {
    // Placeholder function for updating data based on the selected timeline
    // You can implement your actual data update or fetch logic here
    const url = `http://127.0.0.1:3001/collections?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;

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
  };

  return (
    <div className="relative">
      <div
        onClick={handleDrop}
        className="flex w-42 bg-white shadow-xl p-2 rounded-lg cursor-pointer"
      >
        <p>{selectedTimeline.name}</p>
        {showDrop ? (
          <ChevronUpIcon className="w-6 h-6 mb-1" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 mb-1" />
        )}
      </div>

      {showDrop && (
        <div className="absolute top-10 left-0 w-48 mt-4 bg-white z-50 rounded-lg shadow-md">
          <div className="p-6 flex flex-col cursor-pointer space-y-2">
            {selector.map((timeline, index) => (
              <div
                key={index}
                className="flex hover:border p-2 rounded-lg flex-col"
                onClick={() => handleTimelineSelect(timeline)}
              >
                <p>{timeline.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateSelector;
