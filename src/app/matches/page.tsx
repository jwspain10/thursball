import React from "react";
import { LinkButton } from "@/components/navigation/LinkButton";
import { NavLink, Stack } from "@mantine/core";
import MatchScoreBox from "./components/MatchScoreBox";
import { auth } from "../../../auth";
import { getAuthRole } from "@/utils/getAuthRole";
import MatchDate from "./components/MatchDate";
import { fetchMatches, PAGE_SIZE } from "./api/fetchMatches";
import ListPagination from "@/components/ListPagination";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const { matches, total } = await fetchMatches({ page: currentPage });

  return (
    <div>
      {isAdmin && <LinkButton link="/matches/add" label="Add Match" />}
      <ListPagination
        total={total}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
      />
      {matches.map((match) => {
        const { id, matchDate, team1, team2, scoreTeam1, scoreTeam2 } = match;
        return (
          <NavLink
            key={id}
            href={`/matches/${id}`}
            label={
              <Stack justify="center" gap="xs">
                <MatchDate date={matchDate} />
                <MatchScoreBox
                  nameTeam1={team1.name}
                  nameTeam2={team2.name}
                  scoreTeam1={scoreTeam1}
                  scoreTeam2={scoreTeam2}
                />
              </Stack>
            }
          />
        );
      })}
    </div>
  );
}
