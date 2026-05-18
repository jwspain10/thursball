import { Suspense } from "react";
import { LinkButton } from "@/components/navigation/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/navigation/SubHeader";

import PlayerCombinedStats from "../components/PlayerCombinedStats";
import PlayerCombinedStatsLoading from "../components/PlayerCombinedStatsLoading";

import PlayerProfile from "../components/PlayerProfile";
import PlayerProfileLoading from "../components/PlayerProfileLoading";
import { getAuthRole } from "@/utils/getAuthRole";
import { auth } from "../../../../auth";

export default async function PlayerPage({ params }: { params: Params }) {
  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const { id } = await params;

  return (
    <>
      <SubHeader
        goBack
        button={
          isAdmin ? (
            <LinkButton link={`/players/${id}/edit`} label="Edit Player" />
          ) : null
        }
      >
        Player Details
      </SubHeader>

      <Suspense fallback={<PlayerProfileLoading />}>
        <PlayerProfile playerId={id} />
      </Suspense>
      <Suspense fallback={<PlayerCombinedStatsLoading />}>
        <PlayerCombinedStats playerId={id} />
      </Suspense>
    </>
  );
}
