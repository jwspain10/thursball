import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../../lib/prisma";
import { BackButton } from "@/components/BackButton";
import { Params } from "@/app/types";

export default async function PlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id: +id },
  });

  return (
    <div>
      <LinkButton link={`/matches/${id}/edit`} label="Edit Match" />
      <h2>Match Details</h2>
      <BackButton />
      <div>{match?.id}</div>
    </div>
  );
}
