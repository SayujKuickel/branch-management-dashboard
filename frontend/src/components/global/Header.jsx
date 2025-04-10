"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { siteRoutes } from "@/utils/siteRoutes";
import { ThemeSwitcher, Button } from "@/components";

const Header = ({ onLogout }) => {
  const router = useRouter();

  function handleGotoHome() {
    router.push("/");
  }

  function handleGoBack() {
    router.back();
  }

  function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("access-token");
      onLogout("Logged out");
      router.push("/login");
    }
  }

  return (
    <>
      <header className="bg-secondary/25 shadow-xl shadow-primary/4">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4 justify-between">
          <div
            onClick={handleGotoHome}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={"/assets/logo.png"}
              width={300}
              height={300}
              className="aspect-square w-8 brightness-0 invert"
              alt="Page Logo"
            />

            <div className="text-lg flex flex-col ">
              <span className="text-primary font-serif text-3xl ">Branch</span>
              <span className="text-base -mt-2">Management</span>
            </div>
          </div>

          <nav>
            <ul className="flex items-center gap-2">
              {Object.keys(siteRoutes).map((item) => (
                <li key={item} className="capitalize">
                  <Button
                    className={"text-sm font-semibold capitalize"}
                    href={`/${siteRoutes[item]}`}
                    title={siteRoutes[item]}
                    btnType="tertiary"
                  />
                </li>
              ))}

              <div onClick={handleLogout} className="">
                <Button
                  className={
                    "text-xs py-3.5 text-red-500 font-semibold capitalize"
                  }
                  icon={"fi fi-rr-exit"}
                  btnType="tertiary"
                />
              </div>
            </ul>
          </nav>
        </div>
      </header>

      <ThemeSwitcher />
    </>
  );
};

export default Header;
