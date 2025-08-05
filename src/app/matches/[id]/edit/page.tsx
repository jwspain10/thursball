import { BackButton } from "@/components/BackButton";
import prisma from "../../../../../lib/prisma";
import { Params } from "@/app/types";

export default async function EditMatchPage({ params }: { params: Params }) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id: +id },
  });

  return (
    <div>
      <h2>ID: {match?.id}</h2>
      <BackButton />
      <div>Edit Match page</div>
    </div>
  );
}
