import React from "react";
import { Content } from "./Content";
import { NavBar } from "./NavBar";

export function Layout({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="flex flex-col h-screen">
      {/* <Sidebar /> */}
      <NavBar />
      <Content>{children}</Content>
    </div>
  );
}
