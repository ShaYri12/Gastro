"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function OrderCard({
  order,
  setOrders,
  showPopup,
  setShowPopup,
  setShowDeletePopup,
  setShowCancelPopup,
  handleDelete,
  handleCancel,
}) {
  const handlePopupToggle = () => {
    setShowPopup((prev) => (prev === order.id ? null : order.id));
  };

  return (
    <div
      key={order.id}
      className="relative flex items-center justify-between p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition"
    >
      <div className="flex space-x-6 w-full">
        <div className="relative bg-white w-[190px] h-[180px] rounded-lg overflow-hidden">
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: `.custom-swiper-button-next-${order.id}`,
              prevEl: `.custom-swiper-button-prev-${order.id}`,
            }}
            className="mySwiper h-full"
          >
            <SwiperSlide className="h-full">
              <img
                src="/image.jfif"
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full">
              <img
                src="/image.jfif"
                alt=""
                className="w-full h-[260px] object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full">
              <img
                src="/image.jfif"
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>

          <button
            className={`custom-swiper-button-prev-${order.id} absolute bottom-[10px] left-[10px] z-10`}
          >
            <Image
              src="/left-arrow.svg"
              alt="left-arrow"
              width={20}
              height={20}
            />
          </button>

          <button
            className={`custom-swiper-button-next-${order.id} bg-black text-white z-50 absolute bottom-[10px] right-[10px]`}
          >
            <Image
              src="/right-arrow.svg"
              alt="right-arrow"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="flex-grow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] font-[600]">{order.location}</h2>
            <div className="flex gap-3 items-center">
              <span className="text-[18px] font-[600]">{order.amount}</span>
              <button onClick={handlePopupToggle}>
                <img
                  src="/Vector.png"
                  className="h-[20px] w-auto object-cover"
                />
              </button>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="space-y-2 border-r border-[#CCCCCC] pr-14">
              <div className="flex gap-3 items-center">
                <img
                  src="/group.svg"
                  className="h-[20px] w-[20px] object-cover"
                />
                <p className="text-[16px] font-[600]">{order.persons}</p>
              </div>

              <div className="flex gap-3 items-center">
                <img
                  src="/calendar_today.svg"
                  className="h-[20px] w-[20px] object-cover"
                />
                <p className="text-[16px] font-[600]">{order.date}</p>
              </div>

              <div className="flex gap-3 items-center">
                <img
                  src="/checklist.svg"
                  className="h-[20px] w-[20px] object-cover"
                />
                <p className="text-[16px] font-[600]">{order.meal}</p>
              </div>
            </div>

            <div>
              <p className="px-8 text-[14px] font-[400]">{order.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-6 items-center">
              <span
                className={`px-3 py-2 rounded-full text-[14px] font-bold w-[150px] text-center ${order.status === "Confirmed"
                  ? "bg-[#28FF4833]/20 text-[#00B61B]"
                  : order.status === "In Review"
                    ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                    : order.status === "Adjusted"
                      ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                      : order.status === "Accepted"
                        ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                        : "bg-[#E65100]/20 text-[#E65100]"
                  }`}
              >
                {order.status}
              </span>
              <div className="flex gap-3 items-center">
                <img src="/help.svg" className="h-[20px] w-auto" />
                <p className="text-[14px] font-[400]">{order.note}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-5 items-center">
                <button>
                  {order.isMessaged ? (
                    <img
                      src="/chat.png"
                      className="w-[20px] h-[20px] object-cover"
                    />
                  ) : (
                    <img
                      src="/chat (1).png"
                      className="w-[20px] h-[20px] object-cover"
                    />
                  )}
                </button>
                <button className="px-8 py-2 bg-[#821101] uppercase text-white transition">
                  View Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup === order.id && (
        <div className="absolute bg-white border rounded-lg text-[black]/70 shadow-lg p-3 mt-2 w-[200px] top-12 right-4">
          <div
            onClick={() => setShowPopup(order.id)}
            className="flex items-center gap-[12px] cursor-pointer py-2 px-4 hover:bg-gray-100"
          >
            <img src="/info.svg" className="h-[20px] w-auto" />
            <span>View Details</span>
          </div>
          {order.status === "Confirmed" && (
            <>
              <div
                onClick={() => handleDelete(order)}
                className="flex items-center gap-[12px] cursor-pointer py-2 px-4 hover:bg-gray-100"
              >
                <img src="/delete.svg" className="h-[20px] w-auto" />
                <span>Delete</span>
              </div>
              <div
                onClick={() => handleCancel(order)}
                className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-gray-100"
              >
                <img src="/cancel.svg" className="h-[20px] w-auto" />
                <span>Cancel</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
