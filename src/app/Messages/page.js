"use client";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { FaUser } from "react-icons/fa";
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
      type: "update",
    },
    {
      id: 2,
      sender: "ME - FILIP",
      content: "REQUESTED OFFER",
      time: "11:24 AM",
      type: "request",
    },
    {
      id: 3,
      sender: "ME - FILIP",
      content: "OFFER APPROVED",
      time: "08:53 PM",
      type: "approval",
    },
  ],
  2: [
    {
      id: 1,
      sender: "RESTAURANT 2",
      content: "TABLE RESERVED",
      time: "12:30 PM",
      type: "info",
    },
  ],
  3: [
    {
      id: 1,
      sender: "RESTAURANT 3",
      content: "OFFER UNDER REVIEW",
      time: "10:00 AM",
      type: "review",
    },
  ],
};

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [message, setMessage] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [messages, setMessages] = useState(mockMessagesByRestaurant);

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
    <div className="h-screen bg-white px-[24px]">
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

      <div className="flex pt-[24px]">
        {/* Restaurant list */}
        <div className="lg:w-[30%] w-[300px] custom-scrollbar space-y-[12px] overflow-y-auto h-[87vh] pb-1">
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
                <div className="w-[114px] h-[93px] bg-gray-200 rounded-[4px]">
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
                  <p className="text-sm text-gray-600">{restaurant.date}</p>
                  <div className="flex flex-wrap justify-between items-center mt-1">
                    <span
                      className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center  font-[700] rounded-full ${getStatusStyle(
                        restaurant.status
                      )}`}
                    >
                      {restaurant.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {restaurant.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-[24px] h-[88vh] p-[16px]">
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
                <div className="flex gap-[12px] items-center">
                  <span
                    className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center font-[700] rounded-full ${getStatusStyle(
                      selectedRestaurant.status
                    )}`}
                  >
                    {selectedRestaurant.status}
                  </span>
                  <p className="text-[15px] uppercase font-[500] text-[#00000099]">
                    CREATED ON:{" "}
                    <span className="text-black">
                      {selectedRestaurant.date}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-[22px] py-[8px] bg-[#821101] text-[15px] text-white rounded-[4px]">
                VIEW OFFER
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar lg:pe-1">
            {(messages[selectedRestaurant.id] || []).map((msg) => (
              <div
                key={msg.id}
                className={`${
                  msg.sender.startsWith("ME")
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender.startsWith("ME")
                      ? "bg-[#8211010D] border border-[#821101] rounded-r-lg"
                      : "bg-gray-50 border border-gray-300 rounded-l-lg"
                  } p-4 max-w-[80%] flex flex-col`}
                >
                  {/* Sender and Time */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {msg.sender.startsWith("ME") ? (
                        <FaUser className="w-5 h-5 text-[#821101]" />
                      ) : (
                        <ImSpoonKnife className="w-5 h-5 text-[#821101]" />
                      )}
                      <span className="font-medium">{msg.sender}</span>
                    </div>
                    <span className="text-sm text-gray-500">{msg.time}</span>
                  </div>

                  {/* Message Content */}
                  <p
                    className={`${
                      msg.type === "update"
                        ? "text-red-700 font-medium"
                        : "text-black"
                    } mb-2`}
                  >
                    {msg.content}
                  </p>

                  {/* Message Details */}
                  {msg.details && (
                    <p className="text-gray-700 whitespace-pre-line">
                      {msg.details}
                    </p>
                  )}

                  {/* If there is a restaurant */}
                  {msg.restaurant && (
                    <div className="flex items-center gap-2 text-gray-900 font-medium mt-2">
                      <FaUtensils className="text-red-600" />
                      <span>{msg.restaurant}</span>
                    </div>
                  )}

                  {/* If there is a status */}
                  {msg.status && (
                    <div
                      className={`p-4 rounded-lg ${
                        msg.status === "REQUESTED OFFER"
                          ? "bg-red-50 text-red-700"
                          : msg.status === "OFFER APPROVED"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-gray-700"
                      } mt-2`}
                    >
                      {msg.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <button
                onClick={handleSendMessage}
                className="px-[22px] py-[15px] bg-[#821101] text-white rounded-[4px] flex items-center gap-2"
              >
                SEND
                <MdSend className="w-4 h-4" />
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
