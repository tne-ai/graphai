# GraphAI Prompt

This document provides a comprehensive guide for using GraphAI, an asynchronous data flow execution engine. It is intended for developers who want to build agentic applications using GraphAI.

## 1. Introduction

GraphAI is an asynchronous data flow execution engine, which allows developers to build *agentic applications* by describing *agent workflows* as declarative data flow graphs in YAML or JSON.

## 2. Installation

To use GraphAI, you need to install the GraphAI CLI.

```sh
npm i -g  @receptron/graphai_cli
```

## 3. Usage

The GraphAI CLI allows you to run GraphAI graphs from the command line.

```
graphai <yaml_or_json_file>
```

### Options

*   `--help`: Show help
*   `--version`: Show version number
*   `-l`, `--list`: agents list
*   `-s`, `--sample`: agent sample data
*   `-d`, `--detail`: agent detail
*   `-v`, `--verbose`: verbose log
*   `-m`, `--mermaid`: mermaid
*   `--yaml`: dump yaml
*   `--json`: dump json
*   `--log`: output log

## 4. Core Concepts

### Graphs

A GraphAI graph is a declarative data flow graph that defines an agent workflow. It consists of a set of nodes and the connections between them.

### Nodes

A node represents a single step in the workflow. Each node has an `agent` that performs a specific task. Nodes can have inputs and outputs, which are connected to other nodes in the graph.

### Agents

An agent is a function that performs a specific task, such as calling an API, processing data, or interacting with a user. GraphAI provides a set of built-in agents, and you can also create your own custom agents.

## 5. File Formats

GraphAI graphs are defined in YAML or JSON files. The file defines the nodes in the graph and their connections.

### Example

```yaml
version: 0.2
nodes:
  node1:
    agent: "echoAgent"
    inputs:
      message: "Hello, World!"
  node2:
    agent: "echoAgent"
    inputs:
      message: :node1.message
```

This example defines a simple graph with two nodes. The first node, `node1`, uses the `echoAgent` to output the message "Hello, World!". The second node, `node2`, also uses the `echoAgent`, but its message is taken from the output of `node1`.

## 6. Agents

Here is a list of the available agents and their sample usage:

```
* anthropicAgent - Anthropic Agent
[]
* arrayFlatAgent - Array Flat Agent
[
  {
    "inputs": {
      "array": [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ]
    },
    "params": {},
    "result": {
      "array": [
        1,
        2,
        3
      ]
    }
  },
  {
    "inputs": {
      "array": [
        [
          1
        ],
        [
          2
        ],
        [
          [
            3
          ]
        ]
      ]
    },
    "params": {},
    "result": {
      "array": [
        1,
        2,
        [
          3
        ]
      ]
    }
  },
  {
    "inputs": {
      "array": [
        [
          1
        ],
        [
          2
        ],
        [
          [
            3
          ]
        ]
      ]
    },
    "params": {
      "depth": 2
    },
    "result": {
      "array": [
        1,
        2,
        3
      ]
    }
  },
  {
    "inputs": {
      "array": [
        [
          "a"
        ],
        [
          "b"
        ],
        [
          "c"
        ]
      ]
    },
    "params": {},
    "result": {
      "array": [
        "a",
        "b",
        "c"
      ]
    }
  }
]
* arrayJoinAgent - Array Join Agent
[
  {
    "inputs": {
      "array": [
        "a",
        "b",
        "c"
      ]
    },
    "params": {
      "separator": "-"
    },
    "result": "a-b-c"
  },
  {
    "inputs": {
      "array": [
        "a",
        "b",
        "c"
      ]
    },
    "params": {},
    "result": "a,b,c"
  }
]
* compareAgent - compare
[
  {
    "inputs": {
      "query": "banana",
      "documents": [
        "apple",
        "banana",
        "orange"
      ]
    },
    "params": {
      "type": "equal"
    },
    "result": [
      false,
      true,
      false
    ]
  },
  {
    "inputs": {
      "query": "banana",
      "documents": [
        "apple",
        "banana",
        "orange"
      ]
    },
    "params": {
      "type": "similar"
    },
    "result": [
      0.3333333333333333,
      1,
      0.3333333333333333
    ]
  }
]
* copy2ArrayAgent - Copy2Array agent
[
  {
    "inputs": {
      "a": 1,
      "b": 2
    },
    "params": {
      "keys": [
        "a",
        "b"
      ]
    },
    "result": [
      1,
      2
    ]
  }
]
* copyAgent - Returns namedInputs
[
  {
    "inputs": {
      "a": 1,
      "b": 2
    },
    "params": {},
    "result": {
      "a": 1,
      "b": 2
    }
  }
]
* copyMessageAgent - CopyMessage agent
[
  {
    "inputs": {
      "message": "hello"
    },
    "params": {},
    "result": {
      "message": "hello"
    }
  }
]
* countingAgent - Counting agent
[
  {
    "inputs": {},
    "params": {
      "from": 1,
      "to": 5
    },
    "result": 5
  }
]
* dataObjectMergeTemplateAgent - Merge object
[
  {
    "inputs": [
      {
        "key": "a"
      },
      {
        "key": "b"
      }
    ],
    "params": {},
    "result": {
      "key": "b"
    }
  }
]
* dataSumTemplateAgent - Returns the sum of input values
[
  {
    "inputs": [
      1,
      2,
      3
    ],
    "params": {},
    "result": 6
  }
]
* dotProductAgent - dotProduct Agent
[
  {
    "inputs": {
      "vectors": [
        [
          1,
          2
        ],
        [
          3,
          4
        ]
      ]
    },
    "params": {},
    "result": 11
  }
]
* echoAgent - Echo agent
[
  {
    "inputs": {
      "message": "hello"
    },
    "params": {},
    "result": {
      "message": "hello"
    }
  }
]
* fetchAgent - Retrieves JSON data from the specified URL
[]
* fileReadAgent - Read data from file system and returns data
[]
* fileWriteAgent - Write data to file system
[]
* geminiAgent - Gemini Agent
[]
* groqAgent - Groq Agent
[]
* images2messageAgent - Returns the message data for llm include image
[]
* jsonParserAgent - Template agent
[
  {
    "inputs": {
      "content": "{\n  \"key\": \"value\"\n}"
    },
    "params": {},
    "result": {
      "key": "value"
    }
  }
]
* lookupDictionaryAgent - Select elements with params
[
  {
    "inputs": {
      "key": "k1"
    },
    "params": {
      "dictionary": {
        "k1": "v1",
        "k2": "v2"
      }
    },
    "result": "v1"
  },
  {
    "inputs": {
      "key": "k3"
    },
    "params": {
      "dictionary": {
        "k1": "v1",
        "k2": "v2"
      },
      "default": "v3"
    },
    "result": "v3"
  }
]
* mapAgent - Map Agent
[
  {
    "inputs": {
      "array": [
        1,
        2,
        3
      ]
    },
    "params": {
      "graph": {
        "nodes": {
          "add": {
            "agent": "totalAgent"
          }
        }
      }
    },
    "result": [
      1,
      2,
      3
    ]
  }
]
* mergeNodeIdAgent - merge node id agent
[
  {
    "inputs": {
      "node1": {
        "result": 1
      },
      "node2": {
        "result": 2
      }
    },
    "params": {},
    "result": {
      "node1": {
        "result": 1
      },
      "node2": {
        "result": 2
      }
    }
  }
]
* nestedAgent - nested Agent
[
  {
    "inputs": {
      "x": 1,
      "y": 2
    },
    "params": {
      "graph": {
        "nodes": {
          "add": {
            "agent": "totalAgent",
            "inputs": {
              "a": ":x",
              "b": ":y"
            }
          }
        }
      }
    },
    "result": 3
  }
]
* openAIAgent - OpenAI Agent
[]
* openAIImageAgent - OpenAI Image Agent
[]
* pathUtilsAgent - Path utils
[
  {
    "inputs": {
      "base": "/foo/bar",
      "path": "baz"
    },
    "params": {
      "method": "join"
    },
    "result": "/foo/bar/baz"
  }
]
* popAgent - Pop Agent
[
  {
    "inputs": {
      "array": [
        1,
        2,
        3
      ]
    },
    "params": {},
    "result": 3
  }
]
* propertyFilterAgent - Filter properties based on property name either with 'include', 'exclude', 'alter', 'swap', 'inject', 'inspect'
[
  {
    "inputs": {
      "a": 1,
      "b": 2
    },
    "params": {
      "include": [
        "a"
      ]
    },
    "result": {
      "a": 1
    }
  }
]
* pushAgent - push Agent
[
  {
    "inputs": {
      "array": [
        1,
        2
      ],
      "item": 3
    },
    "params": {},
    "result": [
      1,
      2,
      3
    ]
  }
]
* replicateAgent - Replicate Agent
[]
* shiftAgent - shift Agent
[
  {
    "inputs": {
      "array": [
        1,
        2,
        3
      ]
    },
    "params": {},
    "result": 1
  }
]
* sleepAndMergeAgent - sleeper and merge Agent
[
  {
    "inputs": {
      "duration": 100,
      "value": "hello"
    },
    "params": {},
    "result": {
      "duration": 100,
      "value": "hello"
    }
  }
]
* sleeperAgent - sleeper Agent
[
  {
    "inputs": {
      "duration": 100
    },
    "params": {},
    "result": {}
  }
]
* sleeperAgentDebug - sleeper debug Agent
[
  {
    "inputs": {
      "duration": 100
    },
    "params": {},
    "result": {}
  }
]
* sortByValuesAgent - sortByValues Agent
[
  {
    "inputs": {
      "keys": [
        "a",
        "b",
        "c"
      ],
      "values": [
        3,
        1,
        2
      ]
    },
    "params": {},
    "result": [
      "b",
      "c",
      "a"
    ]
  }
]
* streamMockAgent - Stream mock agent
[]
* stringCaseVariantsAgent - Format String Cases agent
[
  {
    "inputs": {
      "string": "hello world"
    },
    "params": {
      "format": "camel"
    },
    "result": "helloWorld"
  }
]
* stringEmbeddingsAgent - Embeddings Agent
[]
* stringSplitterAgent - This agent strip one long string into chunks using following parameters
[
  {
    "inputs": {
      "string": "a b c"
    },
    "params": {
      "separator": " "
    },
    "result": [
      "a",
      "b",
      "c"
    ]
  }
]
* stringTemplateAgent - Template agent
[
  {
    "inputs": {
      "name": "world"
    },
    "params": {
      "template": "hello, ${name}"
    },
    "result": "hello, world"
  }
]
* stringUpdateTextAgent - 
[]
* textInputAgent - Text Input Agent
[]
* tokenBoundStringsAgent - token bound Agent
[]
* totalAgent - Returns the sum of input values
[
  {
    "inputs": [
      1,
      2,
      3
    ],
    "params": {},
    "result": 6
  }
]
* vanillaFetchAgent - Retrieves JSON data from the specified URL
[]
* wikipediaAgent - Retrieves data from wikipedia
[]
```

## 7. Development

This repository includes the core of GraphAI and the tools provided as its basic functionality.

### Key principles:

1.  Keep the core (Node and GraphAI classes) small and simple.
2.  Enhance the platform by adding 'agents' (plugins).
3.  Simple but effective test scripts make it easy to maintain.

### Pull Request Guidelines

*   Base your PR on the main branch.
*   Keep PRs small and focused (one feature or fix per PR).
*   Add clear descriptions for changes.

### Code Style

*   Follow ESLint and Prettier rules.
*   Do not use `any`.
*   Avoid using `let`; prefer `const` whenever possible.
*   Minimize type casting as much as possible.

### Git Workflow

*   Do not use `--force`; progress with `merge`.
*   In a monorepo setup, add only necessary npm dependencies to each package. All other dependencies should be added to the root `package.json`.