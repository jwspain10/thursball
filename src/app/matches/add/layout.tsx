import { BackButton } from "@/components/BackButton";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AddMatchLayout({ children }: Props) {
  return (
    <div>
      <BackButton />
      <h2>Add Match</h2>
      {children}
    </div>
  );
}
