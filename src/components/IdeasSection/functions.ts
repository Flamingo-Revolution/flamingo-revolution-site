import { IdeasSort, type PublicIdea } from "@lib/functions";
import { getDeviceIdentity } from "@lib/modules/deviceIdentity";

export { IdeasSort };
export type { PublicIdea };

export type VoteValue = "UP" | "DOWN";

export type IdeasResponse = {
	ideas: PublicIdea[];
	stats: { approved: number };
	error?: string;
};

export type IdeaMutationResponse = {
	idea?: PublicIdea;
	error?: string;
};

const API_BASE = "/api/ideas";

export async function resolveFingerprint(): Promise<string | null> {
	const identity = await getDeviceIdentity();
	return identity.fingerprint;
}

export async function fetchIdeas(
	fingerprint: string | null,
	sort: IdeasSort = IdeasSort.Popular,
): Promise<IdeasResponse> {
	const url = new URL(API_BASE, window.location.origin);
	const headers = new Headers();

	url.searchParams.set("sort", sort);

	if (fingerprint) {
		url.searchParams.set("fingerprint", fingerprint);
		headers.set("X-Device-Fingerprint", fingerprint);
	}

	const response = await fetch(url, { cache: "no-store", headers });
	const data = (await response.json()) as IdeasResponse;

	if (!response.ok) {
		throw new Error(typeof data.error === "string" ? data.error : "Failed to load ideas.");
	}

	return data;
}

export async function submitIdea(props: {
	content: string;
	fingerprint: string;
	name?: string;
}): Promise<IdeaMutationResponse> {
	const { content, fingerprint, name } = props;

	try {
		const response = await fetch(API_BASE, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content,
				fingerprint,
				...(name ? { name } : {}),
			}),
		});

		const data = (await response.json()) as IdeaMutationResponse;

		if (!response.ok || !data.idea) {
			return { error: typeof data.error === "string" ? data.error : "Submit failed." };
		}

		return { idea: data.idea };
	} catch (error) {
		console.error("submitIdea failed", error);
		return { error: "Submit failed." };
	}
}

export async function updateIdeaName(props: {
	ideaId: string;
	fingerprint: string;
	name: string;
}): Promise<IdeaMutationResponse> {
	const { ideaId, fingerprint, name } = props;

	try {
		const response = await fetch(`${API_BASE}/${ideaId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ fingerprint, name }),
		});

		const data = (await response.json()) as IdeaMutationResponse;

		if (!response.ok || !data.idea) {
			return { error: typeof data.error === "string" ? data.error : "Update failed." };
		}

		return { idea: data.idea };
	} catch (error) {
		console.error("updateIdeaName failed", error);
		return { error: "Update failed." };
	}
}

export async function castVote(props: {
	ideaId: string;
	fingerprint: string;
	value: VoteValue;
}): Promise<IdeaMutationResponse> {
	const { ideaId, fingerprint, value } = props;

	try {
		const response = await fetch(`${API_BASE}/${ideaId}/vote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Device-Fingerprint": fingerprint,
			},
			body: JSON.stringify({ fingerprint, value }),
			signal: AbortSignal.timeout(5000),
		});

		const data = (await response.json()) as IdeaMutationResponse;

		if (!response.ok || !data.idea) {
			return { error: typeof data.error === "string" ? data.error : "Vote failed." };
		}

		return { idea: data.idea };
	} catch (error) {
		console.error("castVote failed", error);
		return { error: "Vote failed." };
	}
}

export function nextVoteValue(current: VoteValue | null, clicked: VoteValue): VoteValue | null {
	return current === clicked ? null : clicked;
}

export function applyVoteLocally(idea: PublicIdea, next: VoteValue | null) {
	const previous = idea.userVote;

	if (previous === "UP") idea.upvoteCount -= 1;
	if (previous === "DOWN") idea.downvoteCount -= 1;
	if (next === "UP") idea.upvoteCount += 1;
	if (next === "DOWN") idea.downvoteCount += 1;

	idea.userVote = next;
	idea.score = idea.upvoteCount - idea.downvoteCount;
}

function snapshotVote(idea: PublicIdea) {
	return {
		userVote: idea.userVote,
		upvoteCount: idea.upvoteCount,
		downvoteCount: idea.downvoteCount,
		score: idea.score,
	};
}

function restoreVote(
	idea: PublicIdea,
	snapshot: ReturnType<typeof snapshotVote>,
) {
	idea.userVote = snapshot.userVote;
	idea.upvoteCount = snapshot.upvoteCount;
	idea.downvoteCount = snapshot.downvoteCount;
	idea.score = snapshot.score;
}

/** Optimistic upvote / downvote with rollback on failure. */
export async function manageVote(props: {
	idea: PublicIdea;
	value: VoteValue;
	fingerprint: string;
}) {
	const { idea, value, fingerprint } = props;
	const previous = snapshotVote(idea);
	const next = nextVoteValue(idea.userVote, value);

	applyVoteLocally(idea, next);

	try {
		const response = await castVote({
			ideaId: idea.id,
			fingerprint,
			value,
		});

		if (response.error || !response.idea) {
			throw response.error ?? new Error("Vote failed.");
		}

		idea.userVote = response.idea.userVote;
		idea.upvoteCount = response.idea.upvoteCount;
		idea.downvoteCount = response.idea.downvoteCount;
		idea.score = response.idea.score;
	} catch (error) {
		restoreVote(idea, previous);
		console.error(error);
	}
}

export function formatIdeaIndex(index: number) {
	return String(index + 1).padStart(2, "0");
}
