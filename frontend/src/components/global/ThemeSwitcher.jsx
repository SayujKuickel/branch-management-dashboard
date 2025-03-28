// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components";

// const themes = [
//   {
//     name: "Light 1",
//     value: "light1",
//     backgroundColor: "#fcfcf8",
//     primary: "#e7df92",
//   },
//   {
//     name: "Light 2",
//     value: "light2",
//     backgroundColor: "#fefbfa",
//     primary: "#e69880",
//   },

//   {
//     name: "Dark 1",
//     value: "dark1",
//     backgroundColor: "#070703",
//     primary: "#6d6418",
//   },
//   {
//     name: "Dark 2",
//     value: "dark2",
//     backgroundColor: "#040201",
//     primary: "#803119",
//   },
// ];

// const ThemeSwitcher = () => {
//   const [theme, setTheme] = useState("light1");
//   const [isShown, setIsShown] = useState(true);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light1";
//     setTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   const changeTheme = (newTheme) => {
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <div className="fixed bottom-8 right-8">
//       <button
//         onClick={() => setIsShown((v) => !v)}
//         className="z-[99999999] w-12 aspect-square bg-primary/10 border-2 text-primary border-secondary/50 rounded-full grid place-items-center cursor-pointer  "
//       >
//         <i class="fi fi-rr-sun flex text-2xl" />
//       </button>

//       {isShown && (
//         <section className="z-[99999999] absolute bottom-full right-full w-36 rounded-lg bg-text p-4 grid grid-cols-2 gap-2">
//           {themes.map((item) => (
//             <button
//               className={`w-12 h-12 rounded-full outline-2 outline-black overflow-x-hidden flex items-center cursor-pointer`}
//               style={{ background: item.color }}
//               key={item.value}
//               onClick={() => changeTheme(item.value)}
//             >
//               <div
//                 className="h-full w-1/2"
//                 style={{ background: item.backgroundColor }}
//               />
//               <div
//                 className="h-full w-1/2"
//                 style={{ background: item.primary }}
//               />
//             </button>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// };

// export default ThemeSwitcher;

const ThemeSwitcher = () => {
  return null;
};

export default ThemeSwitcher;
