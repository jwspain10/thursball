import { usePathname } from "next/navigation";
import { Box, NavLink } from "@mantine/core";
import { NAV_LINKS, ROLES } from "@/constants";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function NavLinks() {
  const router = usePathname();
  const { data } = useSession();
  const currentPath = router;
  const filteredLinks = NAV_LINKS.filter((link) => link.auth !== ROLES.ADMIN);
  const [links, setLinks] = useState(filteredLinks);

  useEffect(() => {
    const isAdmin = data?.user.role === ROLES.ADMIN;

    if (isAdmin) {
      setLinks(NAV_LINKS);
    }
  }, [data]);

  const items = links.map((item) => (
    <NavLink
      href={item.link}
      key={item.label}
      active={currentPath === item.link}
      label={item.label}
    />
  ));

  return <Box w={220}>{items}</Box>;
}
