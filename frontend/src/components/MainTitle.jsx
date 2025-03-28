import React from "react";

const MainTitle = ({ title }) => {
  return (
    <h2 className="relative w-fit text-4xl text-text font-bold before:bg-accent before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 pb-1 mb-8">
      {title}
    </h2>
  );
};

export default MainTitle;
