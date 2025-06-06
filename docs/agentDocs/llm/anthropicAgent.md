# anthropicAgent

## Package
[@graphai/anthropic_agent](https://www.npmjs.com/package/@graphai/anthropic_agent)
## Source
[https://github.com/receptron/graphai/blob/main/llm_agents/anthropic_agent/src/anthropic_agent.ts](https://github.com/receptron/graphai/blob/main/llm_agents/anthropic_agent/src/anthropic_agent.ts)

## Description

Anthropic Agent

## Schema

#### inputs

```json

{
  "type": "object",
  "properties": {
    "model": {
      "type": "string"
    },
    "system": {
      "type": "string"
    },
    "max_tokens": {
      "type": "number"
    },
    "temperature": {
      "type": "number"
    },
    "prompt": {
      "type": "string",
      "description": "query string"
    },
    "messages": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        },
        {
          "type": "object"
        },
        {
          "type": "array"
        }
      ],
      "description": "chat messages"
    }
  }
}

```

#### output

```json

{
  "type": "object"
}

```

## Input example of the next node



## Samples



## Author

Receptron team

## Repository

https://github.com/receptron/graphai

## License

MIT

