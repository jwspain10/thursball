import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function StatsLayout({ children }: Props) {
  return <div>{children}</div>;
}
