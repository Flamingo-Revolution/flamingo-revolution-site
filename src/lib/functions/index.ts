import type { Idea, Prisma, VoteValue } from "@prisma/client";

export const MAX_IDEA_LENGTH = 2000;
export const MAX_NAME_LENGTH = 80;

export enum IdeasSort {
	Popular = "popular",
	Controversial = "controversial",
	Newest = "newest",
	Oldest = "oldest",
}

export const IDEA_SORT_ORDER_BY: Record<IdeasSort, Prisma.IdeaOrderByWithRelationInput[]> = {
	[IdeasSort.Popular]: [{ score: "desc" }, { upvoteCount: "desc" }, { createdAt: "desc" }],
	[IdeasSort.Controversial]: [{ downvoteCount: "desc" }, { upvoteCount: "desc" }, { createdAt: "desc" }],
	[IdeasSort.Newest]: [{ createdAt: "desc" }],
	[IdeasSort.Oldest]: [{ createdAt: "asc" }],
};

export type PublicIdea = {
	id: string;
	timestamp: string;
	name: string;
	idea: string;
	status: "VISIBLE" | "HIDDEN";
	score: number;
	upvoteCount: number;
	downvoteCount: number;
	userVote: "UP" | "DOWN" | null;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function parseIdeasSort(value: unknown): IdeasSort {
	if (typeof value !== "string") return IdeasSort.Popular;

	const normalized = value.trim().toLowerCase();

	if ((Object.values(IdeasSort) as string[]).includes(normalized)) {
		return normalized as IdeasSort;
	}

	return IdeasSort.Popular;
}

export function toPublicIdea(idea: Idea, userVote: VoteValue | null = null): PublicIdea {
	return {
		id: idea.id,
		timestamp: idea.createdAt.toISOString(),
		name: idea?.submitterName?.trim() || "",
		idea: idea.content,
		status: idea.status,
		score: idea.score,
		upvoteCount: idea.upvoteCount,
		downvoteCount: idea.downvoteCount,
		userVote,
	};
}

export function parseFingerprint(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const fingerprint = value.trim();

	if (fingerprint.length < 4 || fingerprint.length > 128) return null;

	return fingerprint;
}

export function jsonResponse(payload: unknown, status = 200, cacheControl = "no-store") {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": cacheControl,
		},
	});
}

export function voteDeltas(previous: VoteValue | null, next: VoteValue | null): { upvoteDelta: number; downvoteDelta: number } {
	let upvoteDelta = 0;
	let downvoteDelta = 0;

	if (previous === "UP") upvoteDelta -= 1;
	if (previous === "DOWN") downvoteDelta -= 1;
	if (next === "UP") upvoteDelta += 1;
	if (next === "DOWN") downvoteDelta += 1;

	return { upvoteDelta, downvoteDelta };
}
