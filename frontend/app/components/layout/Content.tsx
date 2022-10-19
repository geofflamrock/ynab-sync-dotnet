import React from "react";

export function Content({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="flex-grow overflow-y-auto bg-neutral-100 p-4">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
