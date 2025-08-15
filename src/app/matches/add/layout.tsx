import { SubHeader } from "@/components/SubHeader";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AddMatchLayout({ children }: Props) {
  return (
    <div>
      <SubHeader goBack>Add Match</SubHeader>
      {children}
    </div>
  );
}
