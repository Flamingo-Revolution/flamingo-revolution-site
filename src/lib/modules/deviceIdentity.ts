/**
 * Device Identity Helper
 *
 * Generates a browser fingerprint from multiple device/browser characteristics.
 * Used to identify devices for idea submission and voting.
 *
 * Note: This is not 100% unique, but provides reasonable differentiation
 * between devices on the same network.
 *
 * Design principle: every signal is collected independently. A failed signal
 * is recorded in `errors` and stored as 'null' in `components` so the hash
 * still reflects its absence consistently across sessions on the same device.
 */

type NavigatorExtended = Navigator & {
  deviceMemory?: number;
  pdfViewerEnabled?: boolean;
  connection?: { effectiveType?: string };
};

function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function getWebGLFingerprint(): string | null {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) return null;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return null;

    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";

    return hashCode(`${vendor}|${renderer}`);
  } catch {
    return null;
  }
}

function getAudioFingerprint(): string | null {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    const fingerprint = `${ctx.sampleRate}|${ctx.destination.maxChannelCount}`;
    ctx.close();

    return hashCode(fingerprint);
  } catch {
    return null;
  }
}

export interface FingerprintResult {
  fingerprint: string | null;
  rawFingerprint: string | null;
  components: Record<string, string>;
  /** Keys of signals that could not be collected. */
  errors: string[];
}

function buildComponents(): Pick<FingerprintResult, "components" | "errors"> {
  const nav = navigator as NavigatorExtended;
  const components: Record<string, string> = {};
  const errors: string[] = [];

  function collect(key: string, getValue: () => string | null | undefined): void {
    try {
      const value = getValue();
      if (value === null || value === undefined || value === "") {
        errors.push(key);
        components[key] = "null";
      } else {
        components[key] = value;
      }
    } catch {
      errors.push(key);
      components[key] = "null";
    }
  }

  collect("scr", () => `${screen.width}x${screen.height}`);
  collect("avail", () => `${screen.availWidth}x${screen.availHeight}`);
  collect("color", () => String(screen.colorDepth));
  collect("pixel", () => String(screen.pixelDepth));
  collect("ratio", () => String(window.devicePixelRatio || 1));

  collect("tz", () => String(new Date().getTimezoneOffset()));
  collect("tzname", () => Intl.DateTimeFormat().resolvedOptions().timeZone);

  collect("cores", () => String(nav.hardwareConcurrency || "unknown"));
  collect("mem", () => String(nav.deviceMemory ?? "unknown"));
  collect("touch", () => String(nav.maxTouchPoints || 0));

  collect("plat", () => nav.platform);
  collect("lang", () => nav.language);

  collect("cookie", () => String(nav.cookieEnabled));
  collect("pdfviewer", () => String(nav.pdfViewerEnabled ?? "unknown"));

  collect("conn", () => nav.connection?.effectiveType ?? "unknown");

  collect("webgl", () => getWebGLFingerprint());
  collect("audio", () => getAudioFingerprint());

  return { components, errors };
}

/**
 * Full device identity for idea submission and voting.
 * Always resolves — never rejects or throws.
 */
export async function getDeviceIdentity(): Promise<FingerprintResult> {
  try {
    const { components, errors } = buildComponents();
    const rawFingerprint = Object.entries(components)
      .map(([k, v]) => `${k}:${v}`)
      .join("|");

    const fingerprint = hashCode(rawFingerprint);

    return { fingerprint, rawFingerprint, components, errors };
  } catch {
    return {
      fingerprint: null,
      rawFingerprint: null,
      components: {},
      errors: ["catastrophic-failure"]
    };
  }
}
