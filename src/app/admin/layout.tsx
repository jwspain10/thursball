import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <h1>Admin</h1>
      {children}
    </div>
  );
}
