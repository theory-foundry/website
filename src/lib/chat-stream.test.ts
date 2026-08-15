import assert from "node:assert/strict";
import test from "node:test";

import { extractReasoningFromChunk, extractTextFromChunk } from "./chat-stream.ts";

test("extracts reasoning from current content blocks and legacy summaries", () => {
  assert.equal(
    extractReasoningFromChunk({ contentBlocks: [{ reasoning: "first" }, { thinking: " second" }] }),
    "first second",
  );
  assert.equal(
    extractReasoningFromChunk({
      additional_kwargs: { reasoning: { summary: [{ text: "legacy summary" }] } },
    }),
    "legacy summary",
  );
});

test("extracts only text content from streamed chunks", () => {
  assert.equal(extractTextFromChunk({ content: "plain text" }), "plain text");
  assert.equal(
    extractTextFromChunk({
      content: [{ text: "first", type: "text" }, { type: "image" }, { text: " second", type: "text" }],
    }),
    "first second",
  );
  assert.equal(extractTextFromChunk({ content: null }), "");
});
