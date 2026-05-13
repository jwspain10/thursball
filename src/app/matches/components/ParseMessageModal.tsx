"use client";

import { useState } from "react";
import {
  Modal,
  Textarea,
  Button,
  Group,
  Text,
  Alert,
  Select,
  Stack,
  Badge,
  Divider,
} from "@mantine/core";
import { ISelectOptions } from "@/app/types";
import {
  parseMatchMessage,
  ParsedMatchData,
  ParsedPlayerEntry,
} from "../api/parseMatchMessage";
import {
  IMatchDetailsInput,
  IMatchPlayerIdsInput,
  IMatchPlayerStatsInput,
} from "../types";

interface ParsedFormData {
  matchDetails: IMatchDetailsInput;
  matchPlayerIds: IMatchPlayerIdsInput;
  matchPlayerStats: IMatchPlayerStatsInput[];
}

interface Props {
  opened: boolean;
  onClose: () => void;
  playerOptions: ISelectOptions[];
  onParsed: (data: ParsedFormData) => void;
}

type TaggedPlayer = ParsedPlayerEntry & { team: "team1" | "team2" };

function buildFormData(
  parsed: ParsedMatchData,
  allPlayers: TaggedPlayer[],
  resolutions: Record<number, string>,
  playerOptions: ISelectOptions[],
): ParsedFormData {
  const matchDetails: IMatchDetailsInput = {
    matchDate: parsed.matchDate ? new Date(parsed.matchDate) : new Date(),
    nameTeam1: parsed.nameTeam1,
    nameTeam2: parsed.nameTeam2,
    scoreTeam1: parsed.scoreTeam1,
    scoreTeam2: parsed.scoreTeam2,
  };

  const team1Players: string[] = [];
  const team2Players: string[] = [];
  const matchPlayerStats: IMatchPlayerStatsInput[] = [];

  allPlayers.forEach((player, i) => {
    const id = player.confident ? player.matchedId : (resolutions[i] ?? null);
    if (!id) return;

    if (player.team === "team1") team1Players.push(id);
    else team2Players.push(id);

    matchPlayerStats.push({
      playerId: id,
      player: {
        name:
          playerOptions.find((o) => o.value === id)?.label ??
          player.nameInMessage,
      },
      goals: player.goals,
      assists: player.assists,
      mvp: player.mvp,
    });
  });

  return {
    matchDetails,
    matchPlayerIds: { team1Players, team2Players },
    matchPlayerStats,
  };
}

export default function ParseMessageModal({
  opened,
  onClose,
  playerOptions,
  onParsed,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "resolving">("input");
  const [parsed, setParsed] = useState<ParsedMatchData | null>(null);
  const [allPlayers, setAllPlayers] = useState<TaggedPlayer[]>([]);
  const [resolutions, setResolutions] = useState<Record<number, string>>({});

  const handleClose = () => {
    setStep("input");
    setParsed(null);
    setAllPlayers([]);
    setResolutions({});
    setError(null);
    onClose();
  };

  const handleParse = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await parseMatchMessage(message, playerOptions);
      const tagged: TaggedPlayer[] = [
        ...result.team1Players.map((p) => ({ ...p, team: "team1" as const })),
        ...result.team2Players.map((p) => ({ ...p, team: "team2" as const })),
      ];

      const needsConfirmation = tagged.some((p) => !p.confident && p.matchedId);

      if (needsConfirmation) {
        const defaultResolutions: Record<number, string> = {};
        tagged.forEach((p, i) => {
          if (!p.confident && p.matchedId) defaultResolutions[i] = p.matchedId;
        });
        setParsed(result);
        setAllPlayers(tagged);
        setResolutions(defaultResolutions);
        setStep("resolving");
      } else {
        onParsed(buildFormData(result, tagged, {}, playerOptions));
        setMessage("");
        handleClose();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Parse failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const uncertainPlayers = allPlayers
    .map((p, i) => ({ ...p, index: i }))
    .filter((p) => !p.confident && p.matchedId);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        step === "input" ? "Parse WhatsApp message" : "Confirm player matches"
      }
      size="md"
    >
      {step === "input" && (
        <>
          <Text size="sm" c="dimmed" mb="sm">
            Paste your WhatsApp match summary below. The AI will extract the
            match details, teams, players, and stats.
          </Text>
          {error && (
            <Alert color="red" mb="sm">
              {error}
            </Alert>
          )}
          <Textarea
            placeholder="Paste WhatsApp message here..."
            minRows={6}
            autosize
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            mb="md"
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleParse}
              loading={loading}
              disabled={!message.trim()}
            >
              Parse
            </Button>
          </Group>
        </>
      )}

      {step === "resolving" && parsed && (
        <>
          <Text size="sm" c="dimmed" mb="md">
            The AI wasn&apos;t sure about these players. Confirm or change each
            one.
          </Text>
          <Stack gap="md">
            {uncertainPlayers.map((player, i) => (
              <div key={player.index}>
                <Group gap="xs" mb={4}>
                  <Text size="sm" fw={500}>
                    &ldquo;{player.nameInMessage}&rdquo;
                  </Text>
                  <Badge size="xs" variant="light">
                    {player.team === "team1"
                      ? parsed.nameTeam1
                      : parsed.nameTeam2}
                  </Badge>
                </Group>
                <Select
                  data={[
                    { value: "", label: "Skip this player" },
                    ...playerOptions,
                  ]}
                  value={resolutions[player.index] ?? ""}
                  onChange={(val) =>
                    setResolutions((prev) => ({
                      ...prev,
                      [player.index]: val ?? "",
                    }))
                  }
                />
                {i < uncertainPlayers.length - 1 && <Divider mt="md" />}
              </div>
            ))}
          </Stack>
          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={() => setStep("input")}>
              Back
            </Button>
            <Button
              onClick={() => {
                if (!parsed) return;
                onParsed(
                  buildFormData(parsed, allPlayers, resolutions, playerOptions),
                );
                setMessage("");
                handleClose();
              }}
            >
              Confirm
            </Button>
          </Group>
        </>
      )}
    </Modal>
  );
}
