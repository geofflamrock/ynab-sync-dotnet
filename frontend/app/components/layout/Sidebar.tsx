import React from "react";
import { HomeNavItem } from "../../routes/index";

export function Sidebar() {
  return (
    <div className="w-20 h-screen bg-gray-800">
      <div className="flex flex-col">
        <HomeNavItem />
      </div>
    </div>
  );
}
