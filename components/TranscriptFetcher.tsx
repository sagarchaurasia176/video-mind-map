"use client";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  generateRoadmapFromVideo,
  LoaderStep,
} from "@/app/services/api-orchestrator";
import RoadmapLoader from "@/app/Dashboard/dashboard-components/ui/MessageLoader";

export function TranscriptFetcher() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderStep, setLoaderStep] = useState<LoaderStep>(
    LoaderStep.TranscriptConnecting,
  );
  const [error, setError] = useState<string | null>(null);
  const readyToNavigate = useRef(false);
  const loaderDone = useRef(false);

  const tryNavigate = () => {
    if (readyToNavigate.current && loaderDone.current) {
      router.push("/Dashboard/Roadmap-generate");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    setError(null);
    readyToNavigate.current = false;
    loaderDone.current = false;
    setLoaderStep(LoaderStep.TranscriptConnecting);

    try {
      const roadmapData = await generateRoadmapFromVideo(url, setLoaderStep);
      sessionStorage.setItem("roadmap", JSON.stringify(roadmapData));
      readyToNavigate.current = true;
      tryNavigate();
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  const handleLoaderComplete = () => {
    loaderDone.current = true;
    tryNavigate();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Page Title and Breadcrumb */}
      <div className="mb-10">
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <span>Home</span>
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-900 font-medium">Generate roadmap</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Generate roadmap
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Drop in a YouTube link and get a structured learning path from the video.
        </p>
      </div>

      {/* Input Card */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm overflow-hidden">
        {/* Signature: filmstrip rail referencing the video source, animates while loading */}
        <div
          aria-hidden="true"
          className={`absolute left-0 top-0 h-full w-1 transition-colors duration-300 ${
            loading
              ? "bg-indigo-500"
              : url.trim()
                ? "bg-indigo-300"
                : "bg-slate-200"
          }`}
        >
          {loading && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-y-full w-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-[filmstrip_1.4s_linear_infinite]" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pl-2">
          <div>
            <label
              htmlFor="youtube-url"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              YouTube URL
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-2.36a.75.75 0 011.06.67v6.38a.75.75 0 01-1.06.67l-4.72-2.36M4.5 7.5h9a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0113.5 16.5h-9A2.25 2.25 0 012.25 14.25v-4.5A2.25 2.25 0 014.5 7.5z" />
                </svg>
              </span>
              <input
                id="youtube-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                disabled={loading}
                className="w-full pl-11 pr-4 py-3 text-base font-mono text-slate-900 placeholder:text-slate-400 placeholder:font-sans bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating roadmap
              </>
            ) : (
              "Generate roadmap"
            )}
          </button>
        </form>
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-6">
          <RoadmapLoader
            loaderStep={loaderStep}
            onComplete={handleLoaderComplete}
          />
        </div>
      )}

      {/* Error Card */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900 mb-0.5">
                That didn't work
              </h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 mb-4">
            <svg
              className="w-7 h-7 text-indigo-400"
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
          </div>
          <p className="text-base text-slate-500">
            Paste a YouTube URL above to generate your roadmap.
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes filmstrip {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}