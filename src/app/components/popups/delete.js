"use client";
export default function DeletePopup({ handleClosePopup, confirmDelete }) {
  return (
    <div className="fixed inset-0 flex  justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white max-w-[350px] p-4 rounded-lg">
        <h3 className="text-[20px] font-bold mb-4">Delete?</h3>
        <p className="text-[16px]">
          Are you sure to delete the item? Make sure this action will not
          reversible.
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleClosePopup}
            className="px-6 py-2 uppercase bg-[#CCCCCC] rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-6 py-2 uppercase bg-[#D32F2F] text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
