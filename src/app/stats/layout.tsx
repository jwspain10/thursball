import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function StatsLayout({ children }: Props) {
  return (
    <div>
      <h1>Stats</h1>
      {children}
    </div>
  );
}
