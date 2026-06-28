"use client";

import { Book, Brain, Projector } from "lucide-react";
import { useEffect, useState } from "react";

export const LOADER_STEP_TO_UI_STEP: Record<number, number> = {
  0: 0, // TranscriptConnecting  → UI step 0 (Extracting transcript)
  1: 0, // TranscriptDownloading → UI step 0
  2: 0, // TranscriptParsing     → UI step 0
  3: 1, // GeneratingRoadmap     → UI step 1 (AI analyzing)
  4: 2, // Preparing             → UI step 2 (Generating roadmap)
  5: 3, // Finished              → UI step 3 (Preparing interactive map)
};

const STEPS = [
  {
    id: 0,
    label: "Extracting transcript",
  },
  {
    id: 1,
    label: "AI analyzing transcript",
  },
  {
    id: 2,
    label: "Generating roadmap",
  },
  {
    id: 3,
    label: "Preparing interactive map",
  },
];

interface StepProps {
  step: (typeof STEPS)[number];
  state: "pending" | "active" | "done";
  isLast: boolean;
}

interface RoadmapLoaderProps {
  loaderStep: number;
  onComplete?: () => void;
}

function StepIcon({ state }: { state: "pending" | "active" | "done" }) {
  if (state === "done") {
    return (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-50 border-2 border-green-400">
        <svg
          className="w-3.5 h-3.5 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  }

  if (state === "active") {
    return (
      <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 bg-white">
        <svg
          className="w-3.5 h-3.5 text-indigo-600 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 border-2 border-gray-200">
      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
    </div>
  );
}

function Step({ step, state, isLast }: StepProps) {
  return (
    <div className="flex gap-3 relative">
      {!isLast && (
        <div
          className={`absolute left-3 top-8 w-0.5 h-6 ${
            state === "done" ? "bg-green-300" : "bg-gray-200"
          }`}
        />
      )}
      <div className="pt-0.5">
        <StepIcon state={state} />
      </div>
      <div className="pb-6 flex items-center gap-2">
        <p
          className={`text-sm font-medium ${
            state === "active"
              ? "text-gray-900"
              : state === "done"
                ? "text-gray-600"
                : "text-gray-400"
          }`}
        >
          {state === "done" ? (
            <Projector />
          ) : state === "active" ? (
            <Brain />
          ) : (
            <Book />
          )}{" "}
          {step.label}
        </p>
      </div>
    </div>
  );
}

export default function RoadmapLoader({
  loaderStep,
  onComplete,
}: RoadmapLoaderProps) {
  const [elapsed, setElapsed] = useState(0);

  const uiStep = LOADER_STEP_TO_UI_STEP[loaderStep] ?? 0;
  const isFinished = loaderStep >= 5;

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isFinished) return;
    const timer = setTimeout(() => onComplete?.(), 800);
    return () => clearTimeout(timer);
  }, [isFinished, onComplete]);

  const stepStates: ("pending" | "active" | "done")[] = STEPS.map(
    (_, index) => {
      if (isFinished) return "done";
      if (index < uiStep) return "done";
      if (index === uiStep) return "active";
      return "pending";
    },
  );

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 card-shadow">
      <div className="mb-6">
        {STEPS.map((item, index) => (
          <Step
            key={item.id}
            step={item}
            state={stepStates[index]}
            isLast={index === STEPS.length - 1}
          />
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
        <span
          className={`w-2 h-2 rounded-full ${
            isFinished ? "bg-green-500" : "bg-indigo-600 animate-pulse"
          }`}
        />
        <p
          className={`text-xs font-medium ${
            isFinished ? "text-green-700" : "text-gray-600"
          }`}
        >
          {isFinished ? "Roadmap generated successfully!" : "Processing..."}
        </p>
        <span className="ml-auto text-xs text-gray-500 font-medium">
          {elapsed}s
        </span>
      </div>
    </div>
  );
}
