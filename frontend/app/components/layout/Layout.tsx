import React from "react";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
