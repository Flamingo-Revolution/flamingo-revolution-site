import type { VoteValue } from "@prisma/client";

export function parseVoteValue(value: unknown): VoteValue | null {
	if (typeof value !== "string") return null;
	const normalized = value.trim().toUpperCase();
	if (normalized === "UP" || normalized === "DOWN") return normalized;
	return null;
}
