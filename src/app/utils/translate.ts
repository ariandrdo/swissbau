// Keys that should never be translated (IDs, URLs, icons, numbers, etc.)
const SKIP_KEYS = new Set(["id", "icon", "image", "logo", "href", "src", "path", "value", "tel", "color", "bg"]);
const SKIP_SUFFIX = /(?:Link|Url|Image|Icon|Phone|Email|Href|Src|Path|Color|Bg)$/i;

function isSkippable(key: string): boolean {
  return SKIP_KEYS.has(key.toLowerCase()) || SKIP_SUFFIX.test(key);
}

async function translateString(text: string, targetLang: string): Promise<string> {
  if (!text || !text.trim()) return text;
  // Skip URL paths and external URLs
  if (text.startsWith("/") || text.startsWith("http")) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    return (data[0] as [string][]).map(([t]) => t).join("");
  } catch {
    return text;
  }
}

async function translateValue(val: unknown, targetLang: string, key = ""): Promise<unknown> {
  if (typeof val === "string") {
    if (isSkippable(key)) return val;
    return translateString(val, targetLang);
  }
  if (Array.isArray(val)) {
    // Translate array items sequentially to avoid rate limiting
    const result: unknown[] = [];
    for (const item of val) {
      result.push(await translateValue(item, targetLang));
    }
    return result;
  }
  if (val && typeof val === "object") {
    const entries = await Promise.all(
      Object.entries(val as Record<string, unknown>).map(async ([k, v]) => [k, await translateValue(v, targetLang, k)])
    );
    return Object.fromEntries(entries);
  }
  return val;
}

export async function translateSection<T>(section: T, targetLang: string): Promise<T> {
  return translateValue(section, targetLang) as Promise<T>;
}
