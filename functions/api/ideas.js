const EMPTY_PAYLOAD = {
  ideas: [],
  stats: {
    approved: 0,
    pending: 0,
    rejected: 0
  }
};
const UPSTREAM_TIMEOUT_MS = 30_000;
const DATA_UNAVAILABLE_ERROR = "Burimi i te dhenave nuk eshte i disponueshem.";

function isRecord(value) {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function emptyPayload() {
  return {
    ideas: [...EMPTY_PAYLOAD.ideas],
    stats: { ...EMPTY_PAYLOAD.stats }
  };
}

function parseIdeasPayload(value) {
  if (!isRecord(value) || !Array.isArray(value.ideas) || !isRecord(value.stats)) {
    throw new Error("Apps Script returned an unexpected JSON shape.");
  }

  if (value.ok === false) {
    throw new Error(
      typeof value.error === "string"
        ? value.error
        : "Apps Script reported an unknown error."
    );
  }

  const ideas = value.ideas
    .filter(isRecord)
    .filter((item) => item.status === "APPROVED")
    .map((item) => ({
      timestamp: typeof item.timestamp === "string" ? item.timestamp : "",
      name: typeof item.name === "string" ? item.name : "",
      idea: typeof item.idea === "string" ? item.idea : "",
      status: "APPROVED",
      score: isFiniteNumber(item.score) ? item.score : 0,
      reason: typeof item.reason === "string" ? item.reason : ""
    }))
    .filter((item) => item.idea.trim().length > 0);

  const { stats } = value;

  if (
    !isFiniteNumber(stats.approved) ||
    !isFiniteNumber(stats.pending) ||
    !isFiniteNumber(stats.rejected)
  ) {
    throw new Error("Apps Script returned invalid statistics.");
  }

  return {
    ideas,
    stats: {
      approved: stats.approved,
      pending: stats.pending,
      rejected: stats.rejected
    }
  };
}

async function fetchIdeas(apiUrl) {
  if (!apiUrl) {
    throw new Error("APPS_SCRIPT_API_URL is not configured.");
  }

  const url = new URL(apiUrl);
  url.searchParams.set("format", "json");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  });
  const contentType = response.headers.get("content-type") || "";

  if (response.redirected && response.url.includes("accounts.google.com")) {
    throw new Error(
      "Apps Script requires Google sign-in. Redeploy the web app with access set to Anyone."
    );
  }

  if (!response.ok) {
    throw new Error(`Apps Script returned HTTP ${response.status}.`);
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(`Apps Script returned ${contentType || "an unknown content type"}, not JSON.`);
  }

  return parseIdeasPayload(await response.json());
}

function jsonResponse(payload, status, cacheControl) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl
    }
  });
}

export async function onRequestGet(context) {
  try {
    const data = await fetchIdeas(context.env.APPS_SCRIPT_API_URL);

    return jsonResponse(data, 200, "public, s-maxage=5, stale-while-revalidate=10");
  } catch (error) {
    console.error("Ideas API error:", error);

    return jsonResponse(
      {
        ...emptyPayload(),
        error: DATA_UNAVAILABLE_ERROR
      },
      502,
      "no-store"
    );
  }
}
