"use client";
import { useEffect, useState } from "react";
import RoadMapGenerateFlow from "@/app/Dashboard/dashboard-components/ui/react-flow/RoadmapGenerator";
import { Roadmap } from "@/app/services/message-handler";

export default function RoadmapGeneratePage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("roadmap");
    if (stored) {
      setRoadmap(JSON.parse(stored));
    }
  }, []);

  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="text-base text-gray-600 mb-4">No roadmap found</p>
        <a
          href="/Dashboard"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Go back and generate one
        </a>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 p-8">
      <RoadMapGenerateFlow roadmap={roadmap} />
    </div>
  );
}
