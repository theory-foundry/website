import { createUIMessageStream } from "ai";

type StreamEvent = {
  data?: Record<string, unknown>;
  event?: string;
  name?: string;
  run_id?: string;
};

export const extractReasoningFromChunk = (chunk: Record<string, unknown>) => {
  const kwargs = chunk.kwargs && typeof chunk.kwargs === "object" ? (chunk.kwargs as Record<string, unknown>) : chunk;
  const contentBlocks = kwargs.contentBlocks;

  if (Array.isArray(contentBlocks)) {
    const reasoning = contentBlocks
      .map((block) => {
        if (!block || typeof block !== "object") {
          return null;
        }

        if ("reasoning" in block && typeof block.reasoning === "string") {
          return block.reasoning;
        }

        if ("thinking" in block && typeof block.thinking === "string") {
          return block.thinking;
        }

        return null;
      })
      .filter((value): value is string => Boolean(value))
      .join("");

    if (reasoning) {
      return reasoning;
    }
  }

  const additionalKwargs =
    kwargs.additional_kwargs && typeof kwargs.additional_kwargs === "object"
      ? (kwargs.additional_kwargs as Record<string, unknown>)
      : undefined;
  const reasoningSummary =
    additionalKwargs?.reasoning &&
    typeof additionalKwargs.reasoning === "object" &&
    "summary" in additionalKwargs.reasoning &&
    Array.isArray(additionalKwargs.reasoning.summary)
      ? additionalKwargs.reasoning.summary
      : undefined;

  if (!reasoningSummary) {
    return undefined;
  }

  const reasoning = reasoningSummary
    .map((item) =>
      item && typeof item === "object" && "text" in item && typeof item.text === "string" ? item.text : null,
    )
    .filter((value): value is string => Boolean(value))
    .join("");

  return reasoning || undefined;
};

export const extractTextFromChunk = (chunk: Record<string, unknown>) => {
  const content = chunk.content;

  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object" || !("type" in part) || part.type !== "text" || !("text" in part)) {
        return "";
      }

      return typeof part.text === "string" ? part.text : "";
    })
    .join("");
};

export const createChatMessageStream = (agentStream: AsyncIterable<unknown>) =>
  createUIMessageStream({
    execute: async ({ writer }) => {
      const streamState = {
        messageId: "langchain-msg-1",
        reasoningMessageId: null as string | null,
        reasoningStarted: false,
        started: false,
        textMessageId: null as string | null,
        textStarted: false,
      };

      writer.write({ type: "start" });

      for await (const rawEvent of agentStream) {
        if (!rawEvent || typeof rawEvent !== "object") {
          continue;
        }

        const event = rawEvent as StreamEvent;
        const data = event.data && typeof event.data === "object" ? event.data : undefined;

        if (event.run_id && !streamState.started) {
          streamState.messageId = event.run_id;
        }

        switch (event.event) {
          case "on_chat_model_start": {
            const runId = event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);
            if (runId) {
              streamState.messageId = runId;
            }
            break;
          }
          case "on_chat_model_stream": {
            const chunk = data?.chunk;
            if (!chunk || typeof chunk !== "object") {
              break;
            }

            const chunkRecord = chunk as Record<string, unknown>;

            if (typeof chunkRecord.id === "string") {
              streamState.messageId = chunkRecord.id;
            }

            const reasoning = extractReasoningFromChunk(chunkRecord);
            if (reasoning) {
              if (!streamState.reasoningStarted) {
                streamState.reasoningMessageId = streamState.messageId;
                writer.write({ id: streamState.messageId, type: "reasoning-start" });
                streamState.reasoningStarted = true;
                streamState.started = true;
              }

              writer.write({
                delta: reasoning,
                id: streamState.reasoningMessageId ?? streamState.messageId,
                type: "reasoning-delta",
              });
            }

            const text = extractTextFromChunk(chunkRecord);
            if (!text) {
              break;
            }

            if (streamState.reasoningStarted && !streamState.textStarted) {
              writer.write({
                id: streamState.reasoningMessageId ?? streamState.messageId,
                type: "reasoning-end",
              });
              streamState.reasoningStarted = false;
            }

            if (!streamState.textStarted) {
              streamState.textMessageId = streamState.messageId;
              writer.write({ id: streamState.messageId, type: "text-start" });
              streamState.textStarted = true;
              streamState.started = true;
            }

            writer.write({
              delta: text,
              id: streamState.textMessageId ?? streamState.messageId,
              type: "text-delta",
            });
            break;
          }
          case "on_tool_start": {
            const runId = event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);
            const toolName = event.name ?? (typeof data?.name === "string" ? data.name : undefined);

            if (!runId || !toolName) {
              break;
            }

            writer.write({
              dynamic: true,
              toolCallId: runId,
              toolName,
              type: "tool-input-start",
            });

            if (data && "input" in data) {
              writer.write({
                dynamic: true,
                input: data.input,
                toolCallId: runId,
                toolName,
                type: "tool-input-available",
              });
            }

            break;
          }
          case "on_tool_end": {
            const runId = event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);

            if (!runId) {
              break;
            }

            writer.write({
              output: data?.output,
              toolCallId: runId,
              type: "tool-output-available",
            });
            break;
          }
        }
      }

      if (streamState.reasoningStarted) {
        writer.write({
          id: streamState.reasoningMessageId ?? streamState.messageId,
          type: "reasoning-end",
        });
      }

      if (streamState.textStarted) {
        writer.write({
          id: streamState.textMessageId ?? streamState.messageId,
          type: "text-end",
        });
      }

      writer.write({ type: "finish" });
    },
  });
