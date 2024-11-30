import React from "react";

export default function RestaurantList({
  restaurants,
  selectedRestaurant,
  onSelectAndMarkRead,
  getStatusStyle,
}) {
  return (
    <div className="lg:w-[30%] w-[280px] custom-scrollbar space-y-[12px] overflow-y-auto h-[87vh]">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className={`p-[12px] hover:bg-gray-100 cursor-pointer relative rounded-[4px] ${
            selectedRestaurant.id === restaurant.id
              ? "border border-[#82110140] bg-[#8211010D]"
              : "border border-[#00000040]"
          }`}
          onClick={() => onSelectAndMarkRead(restaurant)}
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
                {restaurant.isUnread && (
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
  );
}
