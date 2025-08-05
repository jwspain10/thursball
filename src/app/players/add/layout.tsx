import { BackButton } from "@/components/BackButton";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AddPlayerLayout({ children }: Props) {
  return (
    <div>
      <BackButton />
      <h2>Add Player</h2>
      {children}
    </div>
  );
}
