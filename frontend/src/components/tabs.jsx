import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex space-x-2 border-b mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium ${
              active === i
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
};

export default Tabs;
