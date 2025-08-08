import { BackButton } from "@/components/BackButton";
import prisma from "../../../../../lib/prisma";
import { Params } from "@/app/types";
import PlayerForm from "../../PlayerForm";

export default async function EditPlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id: +id },
  });

  const defaultValues = player
    ? {
        name: player.name ?? "",
        dob: player.dob ?? "",
        nationality: player.nationality ?? "",
        isActive: player.isActive ?? false,
      }
    : null;

  return (
    <div>
      <h2>{player?.name}</h2>
      <BackButton />
      <PlayerForm defaultValues={defaultValues} />
    </div>
  );
}
