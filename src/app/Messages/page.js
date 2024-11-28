"use client";
import { useState } from "react";
import { PiPaperPlaneRightLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { HiOutlineDotsVertical } from "react-icons/hi";

const tabs = ["ALL", "ACTIVE", "CONFIRMED", "CANCELLED", "ARCHIVED"];

const restaurants = [
  {
    id: 1,
    name: "Restaurant 1",
    date: "22 JAN, 2025",
    status: "Confirmed",
    time: "09:10 AM",
    isActive: true,
  },
  {
    id: 2,
    name: "Restaurant 2",
    date: "22 JAN, 2025",
    status: "Cancelled",
    time: "07:53 AM",
  },
  {
    id: 3,
    name: "Restaurant 3",
    date: "22 JAN, 2025",
    status: "In Review",
    time: "LAST DAY",
  },
  {
    id: 4,
    name: "Restaurant 4",
    date: "22 JAN, 2025",
    status: "Adjusted",
    time: "2D AGO",
  },
  {
    id: 5,
    name: "Restaurant 5",
    date: "22 JAN, 2025",
    status: "Accepted",
    time: "5D AGO",
    isActive: true,
  },
  {
    id: 6,
    name: "Restaurant 6",
    date: "22 JAN, 2025",
    status: "Confirmed",
    time: "5D AGO",
  },
];

// Mock messages for each restaurant
const mockMessagesByRestaurant = {
  1: [
    {
      id: 1,
      sender: "RESTAURANT 1",
      content: "OFFER WAS UPDATED",
      details: 'SUMMARY:\nREPLACED "STEAK" WITH "FISH"',
      time: "11:55 AM",
      date: "11/28/2024", // Add date field
      type: "update",
    },
    {
      id: 2,
      sender: "ME - FILIP",
      content: "REQUESTED OFFER",
      time: "11:24 AM",
      date: "11/28/2024", // Add date field
      type: "request",
    },
    {
      id: 3,
      sender: "ME - FILIP",
      content: "OFFER APPROVED",
      time: "08:53 PM",
      date: "11/28/2024", // Add date field
      type: "approval",
    },
  ],
  2: [
    {
      id: 1,
      sender: "RESTAURANT 2",
      content: "TABLE RESERVED",
      time: "12:30 PM",
      date: "11/28/2024", // Add date field
      type: "info",
    },
  ],
  3: [
    {
      id: 1,
      sender: "RESTAURANT 3",
      content: "OFFER UNDER REVIEW",
      time: "10:00 AM",
      date: "11/28/2024", // Add date field
      type: "review",
    },
  ],
};

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [message, setMessage] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [messages, setMessages] = useState(mockMessagesByRestaurant);
  const [isFocused, setIsFocused] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "ME - FILIP",
      content: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(), // Add the current date
      type: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedRestaurant.id]: [
        ...(prev[selectedRestaurant.id] || []),
        newMessage,
      ],
    }));

    setMessage("");
  };

  const getFilteredRestaurants = () => {
    switch (activeTab) {
      case "ACTIVE":
        return restaurants.filter((restaurant) => restaurant.isActive);
      case "CONFIRMED":
        return restaurants.filter(
          (restaurant) => restaurant.status === "Confirmed"
        );
      case "CANCELLED":
        return restaurants.filter(
          (restaurant) => restaurant.status === "Cancelled"
        );
      case "ARCHIVED":
        return []; // Placeholder for archived logic
      case "ALL":
      default:
        return restaurants;
    }
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <div className="h-screen bg-white px-4 lg:px-[24px]">
      {/* Header */}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[24px] font-[600]">Messages</h1>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-[#CCCCCC33] rounded-[8px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[32px] py-[16px] font-roboto whitespace-nowrap font-[500] text-[14px] ${
                activeTab === tab
                  ? "text-[#821101] border-b-2 border-[#821101]"
                  : "text-[#000000B2]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex pt-[24px] gap-[16px]">
        {/* Restaurant list */}
        <div className="lg:w-[30%] w-[280px] custom-scrollbar space-y-[12px] overflow-y-auto h-[87vh]">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`p-[12px] hover:bg-gray-100 cursor-pointer relative rounded-[4px] ${
                selectedRestaurant.id === restaurant.id
                  ? "border border-[#82110140] bg-[#8211010D]"
                  : "border border-[#00000040]"
              }`}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="flex gap-4">
                <div className="lg:w-[114px] w-[80px] lg:h-[93px] h-[80px] bg-gray-200 rounded-[4px]">
                  <img
                    src="/restaurent-img.jpg"
                    className="w-full h-full object-cover rounded-[4px]"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{restaurant.name}</h3>
                    {restaurant.isActive && (
                      <span className="w-[12px] h-[12px] bg-[#821101] rounded-full"></span>
                    )}
                  </div>
                  <p className="text-[15px] font-[500] text-black font-satoshi mt-[4px] mb-[8px]">
                    {restaurant.date}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-1">
                    <span
                      className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center font-[700] rounded-full ${getStatusStyle(
                        restaurant.status
                      )}`}
                    >
                      {restaurant.status}
                    </span>
                    <span className="text-[14px] text-black font-satoshi">
                      {restaurant.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-[24px] h-[88vh] p-[16px] border border-[#0000001A] rounded-[4px]">
          {/* Selected restaurant header */}
          <div className="flex items-center justify-between border-b border-[#CCCCCC80] bg-white pb-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[93px] h-[63px] bg-gray-200 rounded-[4px]">
                <img
                  src="/restaurent-img.jpg"
                  className="w-full h-full object-cover rounded-[4px]"
                />
              </div>
              <div>
                <h2 className="font-medium pb-[8px]">
                  {selectedRestaurant.name}
                </h2>
                <div className="flex flex-wrap gap-[12px] items-center">
                  <span
                    className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center font-[700] rounded-full ${getStatusStyle(
                      selectedRestaurant.status
                    )}`}
                  >
                    {selectedRestaurant.status}
                  </span>
                  <p className="text-[15px] uppercase font-[500] font-satoshi text-[#00000099]">
                    CREATED ON:{" "}
                    <span className="text-black">
                      {selectedRestaurant.date}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-[22px] py-[8px] bg-[#821101] satoshi text-[15px] text-white rounded-[4px]">
                VIEW OFFER
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar lg:pe-1 font-satoshi">
            {/* Grouping messages by date */}
            {Object.entries(
              (messages[selectedRestaurant.id] || []).reduce((acc, msg) => {
                const dateString = msg.date;
                if (!acc[dateString]) {
                  acc[dateString] = [];
                }
                acc[dateString].push(msg);
                return acc;
              }, {})
            ).map(([date, msgs], index) => {
              const isToday = date === new Date().toLocaleDateString(); // Check if the date is today's date
              const displayDate = isToday ? "Today" : date; // Show "Today" if it's the current date

              return (
                <div key={index} className="space-y-[24px]">
                  {/* Message Date */}
                  <div className="flex justify-center">
                    <span className="px-[24px] py-[4px] bg-[#0000000D] rounded-full text-[13px] font-[#0000000D] text-gray-600">
                      {displayDate}
                    </span>
                  </div>

                  {/* Message Events */}
                  {msgs.map((msg, index) => (
                    <div
                      key={index}
                      className={`space-y-[24px] w-full flex justify-${
                        msg.sender.startsWith("ME") ? "end" : "start"
                      }`}
                    >
                      <div className="space-y-[8px] w-1/2">
                        {/* Sender and Time */}
                        <div
                          className={`flex items-center w-full justify-between gap-2`}
                        >
                          {!msg.sender.startsWith("ME") && (
                            <div className="flex items-center gap-[8px]">
                              <span className="w-[20px] h-[20px] rounded-full flex items-center justify-center">
                                <ImSpoonKnife className="text-[#821101] text-[24px]" />
                              </span>
                              <span className="text-[15px] font-[700] font-satoshi">
                                {msg.sender}
                              </span>
                            </div>
                          )}
                          <span className="text-[15px] font-[500] font-satoshi text-black">
                            {msg.time}
                          </span>
                          {msg.sender.startsWith("ME") && (
                            <div className="flex items-center gap-1">
                              <span className="text-[15px] font-[700] font-satoshi">
                                <span className="text-[#00000099]">Me -</span>{" "}
                                <span className="text-black">
                                  {msg.sender.slice(5)}{" "}
                                  {/* Remove "Me -" and show the rest */}
                                </span>
                              </span>
                              <span className="w-[24] h-[24px] mb-[2px] rounded-full flex items-center justify-center">
                                <FaRegUser size={16} strokeWidth={2} />
                              </span>
                            </div>
                          )}
                        </div>

                        <div
                          className={`p-[12px] bg-[#8211010D] rounded-[4px] ${
                            msg.sender.startsWith("ME")
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {/* Message Content */}
                          <p className="font-[500] font-satoshi text-[#821101] italic">
                            {msg.content}
                          </p>

                          {/* Message Details */}
                          {msg.details && (
                            <p className="text-black font-satoshi whitespace-pre-line mt-2">
                              {msg.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Message input */}
          <div className="pt-[16px]">
            <div className="flex gap-[12px]">
              <div className="relative w-full">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(); // Trigger message send on Enter
                    }
                  }}
                  className="peer w-full rounded-[4px] border border-gray-300 px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  placeholder="Message"
                />
                <label
                  className={`absolute left-2 -top-2.5 bg-white px-1 text-sm transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
        peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
        ${isFocused || message ? "text-gray-600" : "text-gray-400"}`}
                >
                  Message
                </label>
              </div>
              <button
                onClick={handleSendMessage}
                className="px-[22px] py-[15px] bg-[#821101] text-white rounded-[4px] flex items-center gap-2"
              >
                SEND
                <PiPaperPlaneRightLight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "Confirmed":
      return "bg-[#28FF4833] text-[#00B61B]";
    case "Cancelled":
      return "bg-[#E6000033] text-[#E65100]";
    case "In Review":
      return "bg-[#FFA11426] text-[#D37E00]";
    case "Adjusted":
      return "bg-[#FFF1DC] text-[#D88C1C]";
    case "Accepted":
      return "bg-[#FFF1DC] text-[#D88C1C]";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
