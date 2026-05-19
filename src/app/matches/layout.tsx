import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function MatchesLayout({ children }: Props) {
  return <div>{children}</div>;
}
