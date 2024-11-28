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
        <h1 className="p-4 text-[24px] font-[600]">Messages</h1>

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

      <div className="flex">
        {/* Restaurant list */}
        <div className="lg:w-[30%] w-[300px] space-y-[12px]">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="p-4 hover:bg-gray-100 cursor-pointer relative border border-[#00000040] rounded-[4px]"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg">
                  <img
                    src="/restaurent-img.jpg"
                    className="w-full h-full object-cover"
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
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(
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
        <div className="flex-1 flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-center">
              <span className="text-sm text-gray-500">
                CREATED ON: 22 JAN, 2025
              </span>
            </div>

            {(messages[selectedRestaurant.id] || []).map((msg) => (
              <div
                key={msg.id}
                className={`${
                  msg.sender.startsWith("ME") ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`${
                    msg.sender.startsWith("ME") ? "bg-red-50" : "bg-gray-50"
                  } p-4 rounded-lg max-w-[80%]`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {msg.sender.startsWith("ME") ? (
                      <FaUser className="w-5 h-5" />
                    ) : (
                      <ImSpoonKnife className="w-5 h-5" />
                    )}
                    <span className="font-medium">{msg.sender}</span>
                    <span className="text-sm text-gray-500">{msg.time}</span>
                  </div>
                  <p
                    className={`${
                      msg.type === "update" ? "text-red-700 font-medium" : ""
                    } mb-2`}
                  >
                    {msg.content}
                  </p>
                  {msg.details && (
                    <p className="text-gray-700 whitespace-pre-line">
                      {msg.details}
                    </p>
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
                className="px-6 py-2 bg-red-700 text-white rounded-lg flex items-center gap-2"
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
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    case "In Review":
      return "bg-yellow-100 text-yellow-800";
    case "Adjusted":
      return "bg-orange-100 text-orange-800";
    case "Accepted":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
