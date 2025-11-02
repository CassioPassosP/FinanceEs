import React from "react";

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow p-5 ${className}`}>
    {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
    {children}
  </div>
);

export default Card;
