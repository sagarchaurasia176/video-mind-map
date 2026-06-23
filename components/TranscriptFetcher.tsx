"use client";

import { useState } from "react";
import { fetchTranscript } from "@/app/utils/transcript-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TranscriptFetcher() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    setError(null);
    setTranscript(null);
    try {
      const result = await fetchTranscript(url);
      if (result.success && result.data) {
        setTranscript(result.data.text || JSON.stringify(result.data, null, 2));
      } else {
        setError(result.error || result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Video Transcript Extractor
        </h1>
        <p className="text-muted-foreground">
          Extract transcripts from YouTube, TikTok, Instagram, and X (Twitter) videos
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            placeholder="Paste your video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-1 h-11 text-base"
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="h-11 px-8 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Get Transcript"
            )}
          </Button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-8 rounded-lg border border-destructive/50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-1">Error</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Result */}
      {transcript && (
        <div className="rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-lg">Transcript</h3>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="rounded-md border bg-muted/30 p-4 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                {transcript}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!transcript && !error && !loading && (
        <div className="rounded-lg border border-dashed py-12">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <svg className="h-12 w-12 text-muted-foreground/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No transcript yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Enter a video URL above to extract and view its transcript
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
