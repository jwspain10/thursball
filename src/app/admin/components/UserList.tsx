"use client";

import CustomTable from "@/components/CustomTable";
import { ISelectOptions } from "@/app/types";
import { ROLES } from "@/constants";
import RoleForm from "./RoleForm";
import { Role, User } from "@prisma/client";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { updateUserRole } from "../api/updateUserRole";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  const router = useRouter();

  const roleOptions: ISelectOptions[] = [
    { label: "Admin", value: ROLES.ADMIN },
    { label: "User", value: ROLES.USER },
  ];

  const onSubmit = (id: string, data: { role: Role }) => {
    updateUserRole(id, data)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Role updated successfully",
          color: "green",
        });
        router.push("/admin");
      })
      .catch((error) => {
        console.error("client error", error);
        notifications.show({
          title: "Error",
          message: "Something went wrong while updating the user",
          color: "red",
        });
      });
  };

  const rows = users?.map((user) => {
    const { name, role, id } = user;
    return {
      name: name,
      role: (
        <RoleForm
          userId={id}
          values={{ role }}
          onSubmit={onSubmit}
          roleOptions={roleOptions}
        />
      ),
    };
  });

  const columns = [
    { key: "name", label: "" },
    { key: "role", label: "Role" },
  ];

  return <CustomTable rows={rows} columns={columns} />;
}
