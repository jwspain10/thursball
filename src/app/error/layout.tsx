import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ErrorLayout({ children }: Props) {
  return (
    <div>
      <h1>Error</h1>
      {children}
    </div>
  );
}
