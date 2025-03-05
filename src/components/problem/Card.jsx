import React from "react";

const Card = ({ title, status, description, date, author, imageUrl }) => {
  return (
    <div className="bg-[#F0F4F8] p-4 rounded-md shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            status === "New"
              ? "bg-purple-100 text-purple-600"
              : status === "Rejected"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{date}</span>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
            <img
              src={imageUrl || "/placeholder.svg"} // Fallback to placeholder if no imageUrl is provided
              className="w-full h-full object-cover"
              alt="User"
            />
          </div>
          <span className="text-xs text-gray-600">By: {author}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;