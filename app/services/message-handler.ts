import { api } from "@/lib/api";

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
}

// ✅ Correct
export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
}
export interface Roadmap {
  title: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export interface RoadmapResponse {
  success: boolean;
  message: string;
  data: Roadmap;
  error?: string;
}

export async function generateRoadMapHandler(
  transcript: any,
): Promise<Roadmap> {
  const response = await api<RoadmapResponse>("/api/roadmap", {
    method: "POST",
    body: JSON.stringify({
      transcript,
    }),
  });

  return response.data;
}