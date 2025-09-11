import { Suspense } from "react";
import { LinkButton } from "@/components/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/SubHeader";

import PlayerMatchStats from "../components/PlayerMatchStats";
import PlayerStatsLoading from "../components/PlayerStatsLoading";

import PlayerProfile from "../components/PlayerProfile";
import PlayerProfileLoading from "../components/PlayerProfileLoading";

import PlayerStats from "../components/PlayerStats";
import PlayerMatchStatsLoading from "../components/PlayerMatchStatsLoading";

export default async function PlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <>
      <SubHeader
        goBack
        button={<LinkButton link={`/players/${id}/edit`} label="Edit Player" />}
      >
        Player Details
      </SubHeader>
      <Suspense fallback={<PlayerProfileLoading />}>
        <PlayerProfile playerId={id} />
      </Suspense>
      <Suspense fallback={<PlayerStatsLoading />}>
        <PlayerStats playerId={id} />
      </Suspense>
      <Suspense fallback={<PlayerMatchStatsLoading />}>
        <PlayerMatchStats playerId={id} />
      </Suspense>
    </>
  );
}
