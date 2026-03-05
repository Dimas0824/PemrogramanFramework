export type CommunityEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  speaker: string;
  summary: string;
};

const toText = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

export function normalizeEvent(raw: Record<string, unknown>): CommunityEvent | null {
  const id = toText(raw.id);
  const title = toText(raw.title);
  const date = toText(raw.date);
  const location = toText(raw.location);

  if (!id || !title || !date || !location) {
    return null;
  }

  return {
    id,
    title,
    date,
    location,
    category: toText(raw.category) || "General",
    speaker: toText(raw.speaker) || "TBA",
    summary: toText(raw.summary) || "Tidak ada ringkasan.",
  };
}

export function normalizeEvents(rawList: Record<string, unknown>[]): CommunityEvent[] {
  return rawList
    .map((item) => normalizeEvent(item))
    .filter((item): item is CommunityEvent => item !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}
