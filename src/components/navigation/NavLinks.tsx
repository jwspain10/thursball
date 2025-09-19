import { usePathname } from "next/navigation";
import { Box, NavLink } from "@mantine/core";
import { NAV_LINKS } from "@/constants";

export function NavLinks() {
  const router = usePathname();
  const currentPath = router;

  const items = NAV_LINKS.map((item) => (
    <NavLink
      href={item.link}
      key={item.label}
      active={currentPath === item.link}
      label={item.label}
      description={item.description}
    />
  ));

  return <Box w={220}>{items}</Box>;
}
