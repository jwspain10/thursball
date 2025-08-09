import React from "react";
import { SubHeader } from "@/components/SubHeader";

interface Props {
  children: React.ReactNode;
}

export default function AddPlayerLayout({ children }: Props) {
  return (
    <div>
      <SubHeader goBack>Add Player</SubHeader>
      {children}
    </div>
  );
}
