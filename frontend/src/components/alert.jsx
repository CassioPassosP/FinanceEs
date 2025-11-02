import React from "react";

const Alert = ({ type = "info", message }) => {
  const base = "p-4 rounded-lg text-sm font-medium";
  const types = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return <div className={`${base} ${types[type]}`}>{message}</div>;
};

export default Alert;
