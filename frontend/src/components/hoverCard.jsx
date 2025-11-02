import React, { useState } from "react";

const HoverCard = ({ children, hoverContent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white shadow-lg rounded-xl p-3 text-sm z-10">
          {hoverContent}
        </div>
      )}
    </div>
  );
};

export default HoverCard;
