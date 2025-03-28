import React from "react";

const Loading = ({ loading, children }) => {
  if (loading)
    return (
      <section className="h-96 bg-primary/10  mx-auto rounded-lg">
        <div className="h-full grid place-items-center">
          <i className="fi fi-br-spinner grid place-items-center text-2xl w-10 aspect-square text-primary animate-spin"></i>
        </div>
      </section>
    );

  return <>{children}</>;
};

export default Loading;
