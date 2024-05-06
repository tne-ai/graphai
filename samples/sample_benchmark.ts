import "dotenv/config";
import { graphDataTestRunner } from "~/utils/runner";
import { sleeperAgent, groqAgent, fetchAgent, copyAgent } from "@/experimental_agents";

const graph_data = {
  version: 0.2,
  nodes: {
    GSM8: {
      value: {
        url: "https://datasets-server.huggingface.co/rows",
        query: {
          dataset: "gsm8k",
          config: "main",
          split: "train",
          offset: 0,
          length: 10,
        },
      },
    },
    fetch: {
      agent: "fetchAgent",
      inputs: ["GSM8.url", "GSM8.query"],
    },
    rows: {
      agent: (rows: Array<Record<string, any>>) => rows.map((row) => row.row),
      inputs: ["fetch.rows"],
    },
    groq: {
      agent: "groqAgent",
      params: {
        model: "Llama3-8b-8192",
        system: "Answer the question.",
      },
      inputs: ["rows.$0.question"],
    },
    result: {
      agent: "copyAgent",
      inputs: ["groq.choices.$0"],
      isResult: true,
    },
  },
};

export const main = async () => {
  const result = await graphDataTestRunner(
    __filename,
    graph_data,
    {
      groqAgent,
      sleeperAgent,
      fetchAgent,
      copyAgent,
    },
    () => {},
    false,
  );
  console.log(result);
};

if (process.argv[1] === __filename) {
  main();
}
