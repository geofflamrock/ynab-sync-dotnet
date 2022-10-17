import React from "react";

export function Content({ children }: React.PropsWithChildren<any>) {
  return <div className="bg-neutral-100 p-4 flex-grow">{children}</div>;
}
