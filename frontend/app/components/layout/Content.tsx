import React from "react";

export function Content({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="bg-neutral-100 p-8 flex-grow">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
