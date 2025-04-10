import React from "react";

const MainTitle = ({ title, subtitle }) => {
  return (
    <h2
      className={`relative w-fit text-text font-bold before:bg-accent before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 pb-1 ${
        title ? "text-4xl mb-8" : "text-2xl mb-4"
      }`}
    >
      {title || subtitle}
    </h2>
  );
};

export default MainTitle;
