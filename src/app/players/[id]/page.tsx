import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../../lib/prisma";
import { Params } from "@/app/types";
import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";
import { SubHeader } from "@/components/SubHeader";
import PlayerStats from "@/app/stats/components/PlayerStats";

export default async function PlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id },
  });

  const birthday = new Date(player?.dob || "");

  return (
    <div>
      <SubHeader
        goBack
        button={<LinkButton link={`/players/${id}/edit`} label="Edit Player" />}
      >
        Player Details
      </SubHeader>

      <div>{player?.name}</div>
      <div>{getCountry(player?.nationality || "")}</div>
      <div>
        {birthday.toLocaleDateString()} ({getAge(birthday)})
      </div>
      <PlayerStats playerId={id} />
    </div>
  );
}
