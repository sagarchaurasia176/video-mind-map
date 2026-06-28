export const prompt = `
    You are an expert learning assistant.

Convert the following YouTube transcript into a learning roadmap.

Rules:
- Ignore ads, intros and repeated content.
- Extract the main topic.
- Break it into concepts.
- Break concepts into subtopics.
- Return ONLY valid JSON.
- Do not use markdown.

Return format:

{
  "title": "",
  "children": [
    {
      "title": "",
      "description": "",
      "children": []
    }
  ]
}

Transcript:
`