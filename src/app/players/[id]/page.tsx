import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../../lib/prisma";
import { Params } from "@/app/types";
import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";
import { SubHeader } from "@/components/SubHeader";

export default async function PlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id: +id },
  });

  const birthday = new Date(player?.dob || "");

  return (
    <div>
      <SubHeader goBack>Player Details</SubHeader>
      <LinkButton link={`/players/${id}/edit`} label="Edit Player" />
      <div>{player?.name}</div>
      <div>{getCountry(player?.nationality || "")}</div>
      <div>
        {birthday.toLocaleDateString()} ({getAge(birthday)})
      </div>
    </div>
  );
}
