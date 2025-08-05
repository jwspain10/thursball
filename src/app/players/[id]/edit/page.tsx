import { BackButton } from "@/components/BackButton";
import prisma from "../../../../../lib/prisma";
import { Params } from "@/app/types";

export default async function EditPlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id: +id },
  });

  return (
    <div>
      <h2>{player?.name}</h2>
      <BackButton />
      <div>Edit Player page</div>
    </div>
  );
}
