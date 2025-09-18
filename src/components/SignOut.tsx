import { Button } from "@mantine/core";
import { signOut } from "../../auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" color="pink">
        Sign out
      </Button>
    </form>
  );
}
