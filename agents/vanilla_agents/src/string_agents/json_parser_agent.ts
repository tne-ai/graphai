import { AgentFunction, AgentFunctionInfo } from "graphai";
import type { GraphAIWithOptionalTextAndData } from "@graphai/agent_utils";

export const jsonParserAgent: AgentFunction<null, unknown, GraphAIWithOptionalTextAndData> = async ({ namedInputs }) => {
  const { text, data } = namedInputs;

  if (data) {
    return JSON.stringify(data, null, 2);
  }
  const match = ("\n" + text).match(/\n```[a-zA-z]*([\s\S]*?)\n```/);
  if (match) {
    return JSON.parse(match[1]);
  }
  return JSON.parse(text ?? "");
};

const sample_object = { apple: "red", lemon: "yellow" };

const json_str = JSON.stringify(sample_object);
const md_json1 = ["```", json_str, "```"].join("\n");

const md_json2 = ["```json", json_str, "```"].join("\n");

const md_json3 = ["```JSON", json_str, "```"].join("\n");

const jsonParserAgentInfo: AgentFunctionInfo = {
  name: "jsonParserAgent",
  agent: jsonParserAgent,
  mock: jsonParserAgent,
  inputs: {
    anyOf: [{ type: "string" }, { type: "integer" }, { type: "object" }, { type: "array" }],
  },
  output: {
    type: "string",
  },
  samples: [
    {
      inputs: { data: sample_object },
      params: {},
      result: JSON.stringify(sample_object, null, 2),
    },
    {
      inputs: { text: JSON.stringify(sample_object, null, 2) },
      params: {},
      result: sample_object,
    },
    {
      inputs: { text: md_json1 },
      params: {},
      result: sample_object,
    },
    {
      inputs: { text: md_json2 },
      params: {},
      result: sample_object,
    },
    {
      inputs: { text: md_json3 },
      params: {},
      result: sample_object,
    },
  ],
  description: "Template agent",
  category: ["string"],
  author: "Satoshi Nakajima",
  repository: "https://github.com/receptron/graphai",
  source: "https://github.com/receptron/graphai/blob/main/agents/vanilla_agents/src/string_agents/json_parser_agent.ts",
  package: "@graphai/vanilla",
  license: "MIT",
};
export default jsonParserAgentInfo;
