# @graphai/step_runner_agent_filter for GraphAI

Agent filter for step-by-step execution of GraphAI's agents for debugging purposes.


## Install

```
yarn add @graphai/step_runner_agent_filter
```

### USAGE

To debug graph data in the console, you can execute each agent step by step.

It can be used via:

```typescript

import { consoleStepRunner } from "@graphai/step_runner_agent_filter";

const agentFilters = [
  {
    name: "consoleStepRunner",
    agent: consoleStepRunner,
  },
];

const graph = new GraphAI(
  graph_data,
  {
    ...agents,
  },
  { agentFilters },
);
await graph.run();
```


