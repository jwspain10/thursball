"use client";

import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ListPaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function ListPagination({
  total,
  pageSize,
  currentPage,
}: ListPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination
      total={totalPages}
      value={currentPage}
      onChange={handlePageChange}
      mt="md"
    />
  );
}
