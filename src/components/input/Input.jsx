import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Input({ placeholder, type, onChange, icon }) {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 pl-10 bg-gray-100 rounded-md border-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        onChange={onChange}
      />
    </div>
  );
}
