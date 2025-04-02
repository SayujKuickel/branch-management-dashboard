"use client";
import React, { useEffect, useState } from "react";

const themes = [
  {
    name: "Light 1",
    value: "light1",
    backgroundColor: "#fbfbfe",
    primary: "#2f27ce",
  },
  {
    name: "Light 2",
    value: "light2",
    backgroundColor: "#fefbfa",
    primary: "#e69880",
  },
  {
    name: "Dark 1",
    value: "dark1",
    backgroundColor: "#070703",
    primary: "#6d6418",
  },
  {
    name: "Dark 2",
    value: "dark2",
    backgroundColor: "#040201",
    primary: "#803119",
  },
];

const ThemeSwitcher = () => {
  const [isShown, setIsShown] = useState(false);
  const [theme, setTheme] = useState("light1");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light1";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  function changeTheme(newTheme) {
    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <div className="">
      <div className="fixed w-12 aspect-square bottom-8 right-8">
        <div
          onClick={() => setIsShown((value) => !value)}
          className="w-full h-full grid place-items-center rounded-full bg-primary/10 hover:bg-accent/15 border-2 border-primary/15 text-primary/50 cursor-pointer hover:text-primary"
        >
          {!isShown ? (
            <i className="fi fi-rr-brightness flex text-2xl"></i>
          ) : (
            <i className="fi fi-br-cross flex "></i>
          )}
        </div>

        {isShown && (
          <div className="absolute bottom-full right-full rounded-lg grid grid-cols-2 gap-2 p-4 w-36 bg-primary/40">
            {themes.map((item) => (
              <button
                key={item.value}
                className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden cursor-pointer outline-2 outline-gray-300"
                style={{ background: item.backgroundColor }}
                onClick={() => changeTheme(item.value)}
              >
                <div
                  className="h-full w-1/2"
                  style={{ background: item.backgroundColor }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ background: item.primary }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
