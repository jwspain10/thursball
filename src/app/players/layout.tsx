import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PlayersLayout({ children }: Props) {
  return (
    <div>
      <h1>Players</h1>
      {children}
    </div>
  );
}
