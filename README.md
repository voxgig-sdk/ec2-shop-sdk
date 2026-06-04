# Ec2Shop SDK

Query Amazon EC2 instance pricing and specs from the command line, with filters and sorting

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About EC2 Shop API

[ec2.shop](https://ec2.shop) is a small, community-run service that turns AWS EC2 pricing into a quick command-line lookup. It is built and maintained by [yeo](https://github.com/yeo) and is designed to be hit with `curl` from a terminal, returning either a human-readable text table or JSON.

What you get from the API:
- Instance type, memory, vCPUs, storage, and network specs
- On-demand hourly cost and a derived monthly price
- Spot price (string field; may be `"NA"` when unavailable)
- Filtering by instance family, features (e.g. `ssd`, `gpu`), or comparison expressions like `mem>=32,cpu<=4`
- Sorting by any field with `+`/`-` prefix (for example `sort=-price`)
- Region selection across 40+ AWS regions

Operational notes: the default response is a text table; pass `Accept: json` or append `?json` for a JSON body. Spot prices are refreshed roughly every 2.5 minutes; on-demand pricing tracks AWS's published pricing pages. No authentication is required and no published rate limits are documented — please be considerate of the service.

## Try it

**TypeScript**
```bash
npm install ec2-shop
```

**Python**
```bash
pip install ec2-shop-sdk
```

**PHP**
```bash
composer require voxgig/ec2-shop-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ec2-shop-sdk/go
```

**Ruby**
```bash
gem install ec2-shop-sdk
```

**Lua**
```bash
luarocks install ec2-shop-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { Ec2ShopSDK } from 'ec2-shop'

const client = new Ec2ShopSDK({})

// List all getinstancepricings
const getinstancepricings = await client.GetInstancePricing().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ec2-shop-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ec2-shop": {
      "command": "/abs/path/to/ec2-shop-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GetInstancePricing** | Lookup of EC2 instance specs and pricing (on-demand hourly, derived monthly, and spot) for a chosen AWS region, served from the root path `/` with optional `filter`, `sort`, and `region` query parameters. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ec2shop_sdk import Ec2ShopSDK

client = Ec2ShopSDK({})

# List all getinstancepricings
getinstancepricings, err = client.GetInstancePricing(None).list(None, None)
```

### PHP

```php
<?php
require_once 'ec2shop_sdk.php';

$client = new Ec2ShopSDK([]);

// List all getinstancepricings
[$getinstancepricings, $err] = $client->GetInstancePricing(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ec2-shop-sdk/go"

client := sdk.NewEc2ShopSDK(map[string]any{})

// List all getinstancepricings
getinstancepricings, err := client.GetInstancePricing(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Ec2Shop_sdk"

client = Ec2ShopSDK.new({})

# List all getinstancepricings
getinstancepricings, err = client.GetInstancePricing(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("ec2-shop_sdk")

local client = sdk.new({})

-- List all getinstancepricings
local getinstancepricings, err = client:GetInstancePricing(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Ec2ShopSDK.test()
const result = await client.GetInstancePricing().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Ec2ShopSDK.test(None, None)
result, err = client.GetInstancePricing(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Ec2ShopSDK::test(null, null);
[$result, $err] = $client->GetInstancePricing(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetInstancePricing(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Ec2ShopSDK.test(nil, nil)
result, err = client.GetInstancePricing(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetInstancePricing(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the EC2 Shop API

- Upstream: [https://ec2.shop](https://ec2.shop)
- API docs: [https://github.com/yeo/ec2.shop](https://github.com/yeo/ec2.shop)

- The [ec2.shop source](https://github.com/yeo/ec2.shop) is released under the MIT licence.
- The service is community-run by [yeo](https://github.com/yeo) and is not affiliated with AWS.
- Underlying pricing data is sourced from AWS's published pricing; consult AWS for authoritative figures before billing decisions.

---

Generated from the EC2 Shop API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
