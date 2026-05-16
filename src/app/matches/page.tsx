import React, { Suspense } from "react";
import { LinkButton } from "@/components/navigation/LinkButton";
import { auth } from "../../../auth";
import { getAuthRole } from "@/utils/getAuthRole";
import MatchesList from "./components/MatchesList";
import CustomLoader from "@/components/CustomLoader";
import { fetchMatchesCount, PAGE_SIZE } from "./api/fetchMatches";
import ListPagination from "@/components/ListPagination";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [session, total] = await Promise.all([auth(), fetchMatchesCount()]);
  const { isAdmin } = getAuthRole(session);

  return (
    <div>
      {isAdmin && <LinkButton link="/matches/add" label="Add Match" />}
      <ListPagination
        total={total}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
      />
      <Suspense
        key={currentPage}
        fallback={<CustomLoader label="Loading matches..." />}
      >
        <MatchesList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
