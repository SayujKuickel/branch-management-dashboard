import React from "react";

const NoData = ({ title }) => {
  return (
    <section className="h-96 bg-secondary/25  mx-auto rounded-lg">
      <div className="h-full grid place-items-center">
        <p className="flex flex-col items-center">
          <i className="fi fi-rr-diamond-exclamation flex text-5xl mb-2 text-accent"></i>
          <span className="font-semibold text-lg">
            {title ? title : "No Data Found!"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default NoData;
