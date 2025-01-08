# usdc-events-api

USDC contract events ingestion, storage and access.

## schema

```mermaid
flowchart TD
    mongodb[(mongoDB)]
    usdc-events-api
    user

    subgraph Blockchain
    USDC
    end

    USDC -->|wss| usdc-events-api
    usdc-events-api <-->|mongoose| mongodb
    user <-->|http| usdc-events-api
```

## endpoints

### chain

| type | description | url | return value |
|---|---|---|---|
| GET | chain identifier | `/chain/id`| `{ chainId: "<chainId>" }` | |
| GET | current block number | `/chain/blocknumber` | `{ blockNumber: "<blockNumber>" } ` |
