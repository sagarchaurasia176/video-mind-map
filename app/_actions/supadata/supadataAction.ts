import { Supadata } from "@supadata/js";

// Initialize the client
export function supadataAction() {
  const supadata = new Supadata({
    apiKey: process.env.YOUTUBE_TRANSCRIPT as string,
  });

  if (!supadata) {
    throw new Error("something went wrong to invalid url");
  }
  return supadata;
}
