import { AgentFunctionInfoDictonary } from "@/graphai";
import {
  sleeperAgent,
  sleeperAgentDebug,
  stringTemplateAgent,
  nestedAgent,
  mapAgent,
  totalAgent,
  bypassAgent,
  echoAgent,
  copyMessageAgent,
  mergeNodeIdAgent,
  countingAgent,
  copy2ArrayAgent,
  pushAgent,
  popAgent,
  shiftAgent,
  streamMockAgent,
  //  openAIMockAgent.
} from "@/experimental_agents";

// import openAIMockAgent from "@/experimental_agents/llm_agents/openai_agent";

export const defaultTestAgents: AgentFunctionInfoDictonary = {
  bypassAgent,
  echoAgent,
  copyMessageAgent,
  mergeNodeIdAgent,
  sleeperAgent,
  sleeperAgentDebug,
  stringTemplateAgent,
  nestedAgent,
  mapAgent,
  totalAgent,
  countingAgent,
  copy2ArrayAgent,
  pushAgent,
  popAgent,
  shiftAgent,
  streamMockAgent,
  // openAIMockAgent,
};
