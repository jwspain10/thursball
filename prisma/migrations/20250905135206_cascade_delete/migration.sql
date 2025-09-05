-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_team2Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MatchPlayerStats" DROP CONSTRAINT "MatchPlayerStats_matchId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchPlayerStats" ADD CONSTRAINT "MatchPlayerStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
