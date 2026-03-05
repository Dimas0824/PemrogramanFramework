import type { NextApiRequest, NextApiResponse } from "next";
import { normalizeEvents } from "@/data/communityEvents";
import { retrieveCollection } from "@/utils/db/servicefirebase";

type EventApiResponse = {
  data: ReturnType<typeof normalizeEvents>;
  total: number;
  generatedAt: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<EventApiResponse | { message: string }>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return retrieveCollection("events")
    .then((rawData) => {
      const data = normalizeEvents(rawData as Record<string, unknown>[]);
      return res.status(200).json({
        data,
        total: data.length,
        generatedAt: new Date().toISOString(),
      });
    })
    .catch((error) => {
      console.error("Error fetching /api/events:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
}
