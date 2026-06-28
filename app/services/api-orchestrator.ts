import { generateRoadMapHandler } from "./message-handler";
import { fetchTranscript } from "./transcript-handler";

export enum LoaderStep {
  TranscriptConnecting,
  TranscriptDownloading,
  TranscriptParsing,
  GeneratingRoadmap,
  Preparing,
  Finished,
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateRoadmapFromVideo(
  url: string,
  onStepChange?: (step: LoaderStep) => void,
) {
  const transcriptPromise = fetchTranscript(url);

  onStepChange?.(LoaderStep.TranscriptConnecting);
  await wait(800);

  onStepChange?.(LoaderStep.TranscriptDownloading);
  await wait(900);

  onStepChange?.(LoaderStep.TranscriptParsing);

  const [transcript] = await Promise.all([
    transcriptPromise.catch((err: unknown) => ({
      success: false as const,
      message: "Failed to fetch transcript",
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    })),
    wait(1200),
  ]);
  const transcriptText: string | null =
    transcript.success && transcript.data
      ? ((transcript.data as any).content ?? null)
      : null;

  const transcriptError = !transcriptText
    ? new Error(
        transcript.success
          ? "No transcript content returned"
          : (transcript.error ?? transcript.message),
      )
    : null;

  onStepChange?.(LoaderStep.GeneratingRoadmap);

  const roadmapPromise = transcriptError
    ? Promise.resolve(null)
    : generateRoadMapHandler(transcriptText!).catch(() => null);

  const [roadmap] = await Promise.all([roadmapPromise, wait(2000)]);

  const roadmapError =
    !transcriptError && !roadmap
      ? new Error("Failed to generate roadmap")
      : null;

  onStepChange?.(LoaderStep.Preparing);
  await wait(1000);

  onStepChange?.(LoaderStep.Finished);

  if (transcriptError) throw transcriptError;
  if (roadmapError) throw roadmapError;

  return roadmap!;
}
