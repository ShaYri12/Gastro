"use client";
import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import MainContent from "./MainContent";

const tabs = ["ALL", "ACTIVE", "CONFIRMED", "CANCELLED", "ARCHIVED"];

const restaurants = [
  {
    id: 1,
    name: "Restaurant 1",
    date: "22 JAN, 2025",
    status: "Confirmed",
    time: "09:10 AM",
    isUnread: false,
  },
  {
    id: 2,
    name: "Restaurant 2",
    date: "22 JAN, 2025",
    status: "Cancelled",
    time: "07:53 AM",
    isUnread: true,
  },
  {
    id: 3,
    name: "Restaurant 3",
    date: "22 JAN, 2025",
    status: "In Review",
    time: "LAST DAY",
    isUnread: false,
  },
  {
    id: 4,
    name: "Restaurant 4",
    date: "22 JAN, 2025",
    status: "Adjusted",
    time: "2D AGO",
    isUnread: false,
  },
  {
    id: 5,
    name: "Restaurant 5",
    date: "22 JAN, 2025",
    status: "Accepted",
    time: "5D AGO",
    isUnread: true,
  },
  {
    id: 6,
    name: "Restaurant 6",
    date: "22 JAN, 2025",
    status: "Confirmed",
    time: "5D AGO",
    isUnread: false,
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [messages, setMessages] = useState(mockMessagesByRestaurant);
  const [restaurantsState, setRestaurantsState] = useState(restaurants); // State for restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    setFilteredRestaurants(getFilteredRestaurants());
  }, [restaurantsState, activeTab]); // Recalculate when restaurantsState or activeTab changes

  const getFilteredRestaurants = () => {
    switch (activeTab) {
      case "ACTIVE":
        return restaurantsState.filter((r) =>
          ["In Review", "Accepted", "Adjusted"].includes(r.status)
        );
      case "CONFIRMED":
        return restaurantsState.filter((r) => r.status === "Confirmed");
      case "CANCELLED":
        return restaurantsState.filter((r) => r.status === "Cancelled");
      case "ARCHIVED":
        return restaurantsState.filter((r) => r.status === "Archived");
      case "ALL":
      default:
        return restaurantsState;
    }
  };

  const onSelectAndMarkRead = (restaurant) => {
    setSelectedRestaurant(restaurant);
    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === restaurant.id ? { ...r, isUnread: false } : r
    );
    setRestaurantsState(updatedRestaurants); // Update the main restaurants state
  };

  const updateRestaurantStatus = (id) => {
    // Update selectedRestaurant status
    setSelectedRestaurant((prev) => ({
      ...prev,
      status: "Archived",
    }));

    // Update the status in restaurantsState
    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === id ? { ...r, status: "Archived" } : r
    );
    setRestaurantsState(updatedRestaurants); // Reflect status change in the restaurantsState

    // Optionally, update filteredRestaurants explicitly (not necessary unless you need to do something specific)
    setFilteredRestaurants(getFilteredRestaurants()); // Update filtered restaurants based on activeTab
  };

  const getStatusStyle = (status) => {
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
        return "bg-gray-200/50 text-gray-800";
    }
  };

  const updateTimeAndisUnread = (restaurantId, newTime, isUnread) => {
    // Use functional update to ensure you're working with the latest state
    setRestaurantsState((prevRestaurants) => {
      const updatedRestaurants = prevRestaurants.map((restaurant) =>
        restaurant.id === restaurantId
          ? { ...restaurant, time: newTime, isUnread }
          : restaurant
      );
      return updatedRestaurants;
    });

    // Sync with filteredRestaurants to keep the state consistent
    setFilteredRestaurants((prevFilteredRestaurants) => {
      const updatedFilteredRestaurants = prevFilteredRestaurants.map(
        (restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, time: newTime, isUnread }
            : restaurant
      );
      return updatedFilteredRestaurants;
    });
  };

  const handleAddAutoMessage = (message) => {
    const autoMessage = {
      id: Date.now() + 1,
      sender: "Restaurant",
      content: "Thank you for your message! We will get back to you shortly.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(),
      type: "received",
    };

    const currentTime = autoMessage.time; // Capture the message time

    // Add the automatic message to the messages state
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedRestaurant.id]: [
        ...(prevMessages[selectedRestaurant.id] || []),
        autoMessage,
      ],
    }));

    // Update time and mark as unread only if not currently viewed
    updateTimeAndisUnread(selectedRestaurant.id, currentTime, true);
  };

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
        <RestaurantList
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          onSelectAndMarkRead={onSelectAndMarkRead}
          getStatusStyle={getStatusStyle}
        />
        <MainContent
          selectedRestaurant={selectedRestaurant}
          messages={messages}
          setMessages={setMessages}
          getStatusStyle={getStatusStyle}
          updateRestaurantStatus={updateRestaurantStatus}
          handleAddAutoMessage={handleAddAutoMessage}
          updateTimeAndisUnread={updateTimeAndisUnread}
        />
      </div>
    </div>
  );
}
