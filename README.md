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
| GET | chain identifier | `/chain/id` | `{ chainId: "<chainId>" }` | |
| GET | current block number | `/chain/blocknumber` | `{ blockNumber: "<blockNumber>" } ` |

### events/filter

| type | description | url | return value |
|---|---|---|---|
| GET | event by ObjectId | `/events/transfer/:id` | `[{<event>},{<event>}]` |
| GET | filter events | `/events/transfer/filter` | `[{<event>},{<event>}]` |

#### filter options

| field | description | example |
|---|---|---|
| from | transfer event from field | `<url>/events/transfer/filter?from=0x<address>` |
| to | transfer event to field | `<url>/events/transfer/filter?to=0x<address>` |

Filter options can be combined.
