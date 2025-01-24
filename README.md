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

## env

| field | description | example |
|---|---|---|
| WEB3_PROVIDER | wss provider | wss://ethereum-rpc.publicnode.com |
| MONGOOSE_URL | mongoose connection url | mongodb://mongo:27017/<db> |

## endpoints

### chain

| type | description | url | return value |
|---|---|---|---|
| GET | chain identifier | `/chain/id` | `{ chainId: {name: "<chainName>", chainId: "<chainId>"}}` | |
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
| initDate | ISO8601 compatible initial time | `<url>/events/transfer/filter?initDate=YYYY-MM-DDT00:00:00.000Z` |
| endDate | ISO8601 compatible final time | `<url>/events/transfer/filter?endDate=YYYY-MM-DDT00:00:00.000Z` |
| minTokens | minimum amount of tokens | `<url>/events/transfer/filter?minTokens=<number>` |
| maxTokens | maximum amount of tokens | `<url>/events/transfer/filter?maxTokens=<number>` |

Filter options can be combined.

## development

1. Open project with vscode and [dev containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
2. Open terminal and type

```bash
npm run dev
```

## testing

1. Open project with vscode and [dev containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
2. Set env test file and choose your own values

```bash
cp .env.sample .env.test
```

3. Open terminal and type

```bash
npm run test
```
