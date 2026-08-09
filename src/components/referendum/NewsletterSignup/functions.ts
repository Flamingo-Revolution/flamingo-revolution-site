const API_BASE = "/api/newsletter";

export type NewsletterSignupResult =
	| { ok: true; created: boolean }
	| { ok: false; error: string };

export type NewsletterCountResult =
	| { ok: true; count: number }
	| { ok: false; error: string };

export async function fetchNewsletterCount(reason: string): Promise<NewsletterCountResult> {
	try {
		const response = await fetch(`${API_BASE}?reason=${encodeURIComponent(reason)}`);
		const payload = (await response.json().catch(() => null)) as {
			count?: number;
			error?: string;
		} | null;

		if (!response.ok) {
			return {
				ok: false,
				error: payload?.error?.trim() || "Numri i regjistrimeve nuk u lexua."
			};
		}

		return { ok: true, count: Number(payload?.count) || 0 };
	} catch {
		return { ok: false, error: "Nuk u lidh me serverin." };
	}
}

export async function submitNewsletterSignup(input: {
	email: string;
	reason: string;
}): Promise<NewsletterSignupResult> {
	try {
		const response = await fetch(API_BASE, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input)
		});

		const payload = (await response.json().catch(() => null)) as {
			created?: boolean;
			error?: string;
		} | null;

		if (!response.ok) {
			return {
				ok: false,
				error: payload?.error?.trim() || "Regjistrimi dështoi. Provo përsëri."
			};
		}

		return { ok: true, created: Boolean(payload?.created) };
	} catch {
		return { ok: false, error: "Nuk u lidh me serverin. Provo përsëri." };
	}
}
