"use client";

import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Button onClick={() => signOut()} color="pink">
      Sign out
    </Button>
  );
}
