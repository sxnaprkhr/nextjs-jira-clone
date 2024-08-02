"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const NavToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="text-white cursor-pointer mt-3 sm:mt-0">
      {theme === "light" ? (
        <SunIcon width={25} height={25} onClick={() => setTheme("dark")} />
      ) : (
        <MoonIcon width={25} height={25} onClick={() => setTheme("light")} />
      )}
    </div>
  );
};

export default NavToggle;
