"use client";
import { useState } from "react";
import {
  MonitorPlay,
  Loader2,
} from "lucide-react";
import axios from "axios";

interface TranscriptResponse {
  success: boolean;
  transcript?: string;
  status?: string;
  message?: string;
  jobId?: string;
}

const InputComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    setError("");
    setTranscript("");
    
    try {
      const response = await axios.post<TranscriptResponse>("/api/transcript", 
      {
        url: url.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("API Response:", response.data);

      if (response.data.success) {
        if (response.data.transcript) {
          setTranscript(response.data.transcript);
        } else if (response.data.status) {
          setError(`Status: ${response.data.status}. ${response.data.message || ''}`);
        }
      } else {
        setError("Failed to get transcript");
      }

    } catch (error: any) {
      console.error("Failed to fetch transcript:", error);
      setError(error.response?.data?.error || "Failed to fetch transcript. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setTranscript("");
    setError("");
  };

  return (
    <div className="flex items-center bg-yellow-100 top-12 relative max-h-screen   justify-center px-4 py-8">
      <div className="w-full max-w-3/5 mx-auto">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-background to-muted/20  rounded-3xl overflow-hidden flex flex-col justify-center">
          {/* Header Section */}
          <div className="text-center pt-12 pb-8 px-6 relative">
            {/* Decorative background */}
            <div className="relative">
              {/* Icon Badge */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                  <div className="relative p-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
                    <MonitorPlay />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Video Intelligence AI
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Transform any YouTube video into structured roadmaps, summaries,
                and actionable insights instantly.
              </p>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 px-6 pb-8">
            <input
              className="outline border p-3 flex-1 max-w-xl rounded-lg focus:ring-2 focus:ring-primary"
              type="text"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !url.trim()}
              className="bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer text-white px-6 py-3 rounded-lg gap-2 flex items-center font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Generate"
              )}
            </button>
            {url && !isLoading && (
              <button 
                type="button"
                onClick={handleClear}
                className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-black px-4 py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </form>

          {/* Results Section */}
          <div className="px-6 pb-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}
            
            {transcript && (
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Transcript Result:</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{transcript}</p>
                </div>
              </div>
            )}
            
            {!transcript && !error && !isLoading && (
              <div className="text-center text-muted-foreground py-8">
                <p>Paste a YouTube URL above and click Generate to see the transcript</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
